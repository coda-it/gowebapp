package utils

import (
	"gopkg.in/configcat/go-sdk.v1"
	"os"
)

type IClient interface {
	GetValue(string, interface{}) interface{}
}

var (
	newClient = configcat.NewClient
	client    IClient
	apiKey    = os.Getenv("WEBAPP_CONFIGCAT_KEY")
)

func getClient() IClient {
	if client == nil && apiKey != "" {
		client = newClient(apiKey)
		return client
	}
	return client
}

// GetFeatureFlag - gets feature flag
func GetFeatureFlag(name string, defaultValue bool) (bool, bool) {
	client := getClient()

	if client == nil {
		return true, true
	}

	value, ok := client.GetValue(name, defaultValue).(bool)

	if IsTestEnv() || !ok {
		return true, true
	}

	return value, ok
}
