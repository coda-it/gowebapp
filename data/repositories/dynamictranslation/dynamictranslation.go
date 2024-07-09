package dynamictranslation

import (
	"context"
	"github.com/coda-it/gowebapp/data/persistence"
	"github.com/coda-it/gowebapp/domain/models/translation"
)

const (
	collectionName = "translations"
)

// Repository - translations repository
type Repository struct {
	Persistence persistence.IPersistance
}

// New - translations factory
func New(p persistence.IPersistance) *Repository {
	return &Repository{
		p,
	}
}

// AddTranslation - add translation
func (tr *Repository) AddTranslation(translation translation.Translation) error {
	translationsCollection := tr.Persistence.GetCollection(collectionName)
	_, err := translationsCollection.InsertOne(context.TODO(), translation)
	return err
}
