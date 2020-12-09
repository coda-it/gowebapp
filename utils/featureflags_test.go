package utils

import (
	"gopkg.in/configcat/go-sdk.v1"
	"testing"
)

type ClientMock struct{}

func (c ClientMock) GetValue(key string, defaultValue interface{}) interface{} {
	if key == "key-false" {
		return false
	}
	if key == "key-true" {
		return true
	}
	return defaultValue
}

func TestGetFeatureFlag(t *testing.T) {
	t.Run("When `Client` is defined", func(t *testing.T) {
		t.Run("Should return `true` for flags that are set for `true`", func(t *testing.T) {
			client = ClientMock{}
			apiKey = "34jdu4f8uh4hu8"

			value, ok := GetFeatureFlag("key-true", false)

			if !ok || value == false {
				t.Errorf("Returned `false` for flag that is set for `true`")
			}
		})

		t.Run("Should return `false` for flags that are set for `false`", func(t *testing.T) {
			client = ClientMock{}
			apiKey = "34jdu4f8uh4hu8"

			value, ok := GetFeatureFlag("key-false", true)

			if !ok || value == true {
				t.Errorf("Returned `true` for flag that is set for `false`")
			}
		})

		t.Run("Should return default value for flag that doesn't have assigned value", func(t *testing.T) {
			client = ClientMock{}
			apiKey = "34jdu4f8uh4hu8"

			value, ok := GetFeatureFlag("key-unknown", true)

			if ok == false || value == false {
				t.Errorf("Returned not default value")
			}
		})
	})

	t.Run("When `Client` is not defined", func(t *testing.T) {
		t.Run("Should return `true` for any flag when client is not defined", func(t *testing.T) {
			client = nil
			apiKey = ""
			newClient = func(apiKey string) *configcat.Client {
				return nil
			}

			value, ok := GetFeatureFlag("key-true", false)

			if !ok || value == false {
				t.Errorf("Returned `false` when for not defined Client all flags should be `true`")
			}
		})
	})
}
