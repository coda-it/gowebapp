package translation

import (
	"github.com/coda-it/gowebapp/domain/models/translation"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ITranslationRepository - static translations repository interface
type ITranslationRepository interface {
	FetchTranslation(lang string) map[string]string
}

// IDynamicTranslationRepository - dynamic translations repository interface
type IDynamicTranslationRepository interface {
	AddTranslation(translation translation.Translation) error
	GetTranslations(appID string, lang string) ([]translation.Translation, error)
	UpdateTranslation(translation translation.Translation) error
	DeleteTranslation(id primitive.ObjectID) error
}
