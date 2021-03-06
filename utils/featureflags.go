package utils

import (
	"gopkg.in/configcat/go-sdk.v1"
	"os"
)

type iClient interface {
	GetValue(string, interface{}) interface{}
}

var (
	newClient = configcat.NewClient
	client    iClient
	apiKey    = os.Getenv("WEBAPP_CONFIGCAT_KEY")
)

func getClient() iClient {
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
		return defaultValue, true
	}

	value, ok := client.GetValue(name, defaultValue).(bool)

	if IsTestEnv() || !ok {
		return defaultValue, true
	}

	return value, ok
}
