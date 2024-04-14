package config

import (
	"encoding/json"
	"github.com/coda-it/goappframe/config"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebserver/utils/logger"
	"io/ioutil"
	"os"
)

func loadFromFile(path string) (config.Config, error) {
	var cnf config.Config

	configBytes, err := ioutil.ReadFile(path)
	if err != nil {
		return cnf, err
	}

	err = json.Unmarshal(configBytes, &cnf)
	if err != nil {
		return cnf, err
	}

	return cnf, nil
}

func loadFromEnv(customConfig string) (config.Config, error) {
	var cnf config.Config

	configBytes := []byte(customConfig)

	err := json.Unmarshal(configBytes, &cnf)
	if err != nil {
		return cnf, err
	}

	return cnf, nil
}

// New - Config factory
func New() config.Config {
	var cnf config.Config
	var err error

	webAppConfigPath := constants.ConfigFilePath
	customConfig := os.Getenv("WEBAPP_CONFIG")
	customPath := os.Getenv("WEBAPP_CONFIG_PATH")

	if customPath != "" {
		webAppConfigPath = customPath
	}

	if customConfig == "" {
		cnf, err = loadFromFile(webAppConfigPath)
	} else {
		cnf, err = loadFromEnv(customConfig)
	}

	if err != nil {
		logger.Log(logger.ERROR, err.Error())
		return cnf
	}

	return cnf
}
