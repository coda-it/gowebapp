package dynamictranslation

import (
	"context"
	"github.com/coda-it/gowebapp/data/persistence"
	"github.com/coda-it/gowebapp/domain/models/translation"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
	collection := tr.Persistence.GetCollection(collectionName)
	_, err := collection.InsertOne(context.TODO(), translation)
	return err
}

// GetTranslations - get translation
func (tr *Repository) GetTranslations(appID string, lang string) ([]translation.Translation, error) {
	var translations []translation.Translation

	collection := tr.Persistence.GetCollection(collectionName)
	searchQuery := bson.M{"appId": appID, "language": lang}

	cursor, err := collection.Find(context.TODO(), searchQuery)
	if err != nil {
		return translations, err
	}

	err = cursor.All(context.TODO(), &translations)
	if err != nil {
		return translations, err
	}

	return translations, nil
}

// UpdateTranslation - update translation
func (tr *Repository) UpdateTranslation(translation translation.Translation) error {
	collection := tr.Persistence.GetCollection(collectionName)
	_, err := collection.UpdateOne(context.TODO(), bson.M{"_id": translation.ID}, bson.D{{"$set",
		translation,
	}})

	return err
}

// DeleteTranslation - delete translation
func (tr *Repository) DeleteTranslation(id primitive.ObjectID) error {
	collection := tr.Persistence.GetCollection(collectionName)
	_, err := collection.DeleteOne(context.TODO(), bson.M{"_id": id})
	return err
}
