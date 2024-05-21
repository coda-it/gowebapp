package translation

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebserver/utils/logger"
	"io/ioutil"
)

// Repository - translations repository
type Repository struct{}

// New - translations factory
func New() *Repository {
	return &Repository{}
}

// FetchTranslation - fetch translations for one language
func (tr *Repository) FetchTranslation(lang string) map[string]string {
	var translations map[string]string

	translationsPath := constants.TranslationsDirectory + "/" + lang + ".json"

	configBytes, err := ioutil.ReadFile(translationsPath)
	if err != nil {
		logger.Log(logger.ERROR, err.Error())
		return translations
	}

	err = json.Unmarshal(configBytes, &translations)
	if err != nil {
		logger.Log(logger.ERROR, err.Error())
		return translations
	}

	return translations
}
