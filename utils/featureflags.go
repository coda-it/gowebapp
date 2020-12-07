package utils

import (
	"errors"
	"gopkg.in/configcat/go-sdk.v1"
	"os"
)

var (
	client *configcat.Client
)

func getClient() (*configcat.Client, error) {
	if client == nil {
		client = configcat.NewClient(os.Getenv("WEBAPP_CONFIGCAT_KEY"))
		return client, nil
	}
	return client, errors.New("no configCat client")
}

// GetFeatureFlag - gets feature flag
func GetFeatureFlag(name string, defaultValue bool) (bool, bool) {
	client, err := getClient()
	value, ok := client.GetValue(name, defaultValue).(bool)

	if IsTestEnv() || !ok || err != nil {
		return true, true
	}

	return value, ok
}
