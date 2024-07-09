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
