package category

import (
	"context"
	"github.com/coda-it/gowebapp/data/persistence"
	categoryModel "github.com/coda-it/gowebapp/domain/models/category"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	collectionName = "categories"
)

// Repository - categories repository
type Repository struct {
	Persistence persistence.IPersistance
}

// New - creates new categories repository
func New(p persistence.IPersistance) Repository {
	return Repository{
		p,
	}
}

// FetchAll - fetch categories from persistence
func (cr *Repository) FetchAll(appID string) ([]categoryModel.Category, error) {
	categoriesCollection := cr.Persistence.GetCollection(collectionName)

	var categories []categoryModel.Category
	var searchQuery = bson.M{"appId": appID}

	cursor, err := categoriesCollection.Find(context.TODO(), searchQuery)
	if err != nil {
		return categories, err
	}

	err = cursor.All(context.TODO(), &categories)
	if err != nil {
		return categories, err
	}

	return categories, nil
}

// Add - add category to persistence
func (cr *Repository) Add(c categoryModel.Category) error {
	categoriesCollection := cr.Persistence.GetCollection(collectionName)
	_, err := categoriesCollection.InsertOne(context.TODO(), c)
	return err
}

// Update - update existing category
func (cr *Repository) Update(c categoryModel.Category) error {
	categoriesCollection := cr.Persistence.GetCollection(collectionName)
	_, err := categoriesCollection.UpdateOne(context.TODO(), bson.M{"_id": c.ID}, bson.D{{"$set",
		c,
	}})

	return err
}

// Delete - delete category
func (cr *Repository) Delete(id primitive.ObjectID) error {
	categoriesCollection := cr.Persistence.GetCollection(collectionName)
	_, err := categoriesCollection.DeleteOne(context.TODO(), bson.M{"_id": id})
	return err
}
