package translation

import "github.com/coda-it/gowebapp/domain/models/translation"

// Usecase - translations usecases
type Usecase struct {
	repository                   ITranslationRepository
	dynamicTranslationRepository IDynamicTranslationRepository
}

// New - creates translactions usecases instance
func New(r ITranslationRepository, dtr IDynamicTranslationRepository) *Usecase {
	return &Usecase{
		r,
		dtr,
	}
}

// Fetch - fetch translation for particular language
func (u *Usecase) Fetch(lang string) map[string]string {
	return u.repository.FetchTranslation(lang)
}

// AddDynamicTranslation - adds dynamic translation
func (u *Usecase) AddDynamicTranslation(translation translation.Translation) error {
	return u.dynamicTranslationRepository.AddTranslation(translation)
}

// GetDynamicTranslations - gets dynamic translations
func (u *Usecase) GetDynamicTranslations(appID string, lang string) ([]translation.Translation, error) {
	return u.dynamicTranslationRepository.GetTranslations(appID, lang)
}

// GetDynamicTranslationsAsMap - gets dynamic translations as key-value array only
func (u *Usecase) GetDynamicTranslationsAsMap(appID string, lang string) (map[string]string, error) {
	translations, err := u.dynamicTranslationRepository.GetTranslations(appID, lang)

	if err != nil {
		return make(map[string]string), err
	}

	translationMap := make(map[string]string)

	for _, translation := range translations {
		translationMap[translation.Key] = translation.Value
	}

	return translationMap, nil
}

// UpdateDynamicTranslation - update dynamic translations
func (u *Usecase) UpdateDynamicTranslation(translation translation.Translation) error {
	return u.dynamicTranslationRepository.UpdateTranslation(translation)
}
