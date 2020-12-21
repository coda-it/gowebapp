package config

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebapp/models/config"
	"github.com/coda-it/gowebserver/utils/logger"
	"io/ioutil"
)

// New - Config factory
func New() config.Config {
	var cnf config.Config

	configBytes, err := ioutil.ReadFile(constants.ConfigFilePath)
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
