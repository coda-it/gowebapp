package category

import (
	"github.com/coda-it/gowebapp/data/persistence"
	categoryModel "github.com/coda-it/gowebapp/models/category"
	"gopkg.in/mgo.v2/bson"
)

const (
	collectionName = "categories"
)

// IRepository - category repository interface
type IRepository interface {
	FetchAll() ([]categoryModel.Category, error)
	Add(c categoryModel.Category) error
	Update(c categoryModel.Category) error
	Delete(id bson.ObjectId) error
}

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
func (cr *Repository) FetchAll() ([]categoryModel.Category, error) {
	categoriesCollection := cr.Persistence.GetCollection(collectionName)

	var categories []categoryModel.Category
	var searchQuery bson.M

	err := categoriesCollection.Find(searchQuery).All(&categories)

	if err != nil {
		return categories, err
	}

	return categories, nil
}

// Add - add category to persistence
func (cr *Repository) Add(c categoryModel.Category) error {
	categoriesCollection := cr.Persistence.GetCollection(collectionName)
	return categoriesCollection.Insert(c)
}

// Update - update existing category
func (cr *Repository) Update(c categoryModel.Category) error {
	categoriesCollection := cr.Persistence.GetCollection(collectionName)
	_, err := categoriesCollection.Upsert(bson.M{"_id": c.ID}, c)
	return err
}

// Delete - delete category
func (cr *Repository) Delete(id bson.ObjectId) error {
	categoriesCollection := cr.Persistence.GetCollection(collectionName)
	return categoriesCollection.Remove(bson.M{"_id": id})
}
