package config

import (
	"encoding/json"
	"github.com/coda-it/goappframe/config"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebserver/utils/logger"
	"io/ioutil"
	"os"
)

// New - Config factory
func New() config.Config {
	var cnf config.Config

	webAppConfigPath := constants.ConfigFilePath
	customPath := os.Getenv("WEBAPP_CONFIG_PATH")

	if customPath != "" {
		webAppConfigPath = customPath
	}

	configBytes, err := ioutil.ReadFile(webAppConfigPath)
	if err != nil {
		logger.Log(logger.ERROR, err.Error())
		return cnf
	}

	err = json.Unmarshal(configBytes, &cnf)
	if err != nil {
		logger.Log(logger.ERROR, err.Error())
		return cnf
	}

	return cnf
}
