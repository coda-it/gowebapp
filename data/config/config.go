package config

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebserver/utils/logger"
	"io/ioutil"
)

// Navigation - menu navigation struct
type Navigation struct {
	Name     string       `json:"name"`
	Href     string       `json:"href"`
	Children []Navigation `json:"children"`
}

// Config - static app config
type Config struct {
	Navigation []Navigation `json:"navigation"`
}

// New - Config factory
func New() Config {
	var config Config

	configBytes, err := ioutil.ReadFile(constants.ConfigFilePath)
	if err != nil {
		logger.Log(logger.ERROR, err.Error())
		return config
	}

	err = json.Unmarshal(configBytes, &config)
	if err != nil {
		logger.Log(logger.ERROR, err.Error())
		return config
	}

	return config
}
