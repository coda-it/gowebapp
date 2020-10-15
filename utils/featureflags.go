package utils

import (
	"gopkg.in/configcat/go-sdk.v1"
	"os"
)

var (
	client *configcat.Client
)

func getClient() *configcat.Client {
	if client == nil {
		client = configcat.NewClient(os.Getenv("WEBAPP_CONFIGCAT_KEY"))
	}
	return client
}

// GetFeatureFlag - gets feature flag
func GetFeatureFlag(name string, defaultValue bool) (bool, bool) {
	value, ok := getClient().GetValue(name, defaultValue).(bool)
	return value, ok
}
