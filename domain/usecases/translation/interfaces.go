package translation

import "github.com/coda-it/gowebapp/domain/models/translation"

// ITranslationRepository - static translations repository interface
type ITranslationRepository interface {
	FetchTranslation(lang string) map[string]string
}

// IDynamicTranslationRepository - dynamic translations repository interface
type IDynamicTranslationRepository interface {
	AddTranslation(translation translation.Translation) error
	GetTranslations(appID string, lang string) ([]translation.Translation, error)
	UpdateTranslation(translation translation.Translation) error
}
