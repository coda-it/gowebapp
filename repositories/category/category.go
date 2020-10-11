package category

import (
	"github.com/coda-it/gowebapp/datasources/persistence"
	categoryModel "github.com/coda-it/gowebapp/models/category"
	"gopkg.in/mgo.v2/bson"
)

const (
	// CollectionName - is mongodb collection name
	CollectionName = "categories"
)

// IRepository - category repository interface
type IRepository interface {
	FetchCategories() ([]categoryModel.Category, error)
	AddCategory(c categoryModel.Category) error
	UpdateCategory(c categoryModel.Category) error
	DeleteCategory(id bson.ObjectId) error
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

// FetchCategories - fetch categories from persistence
func (cr *Repository) FetchCategories() ([]categoryModel.Category, error) {
	categoriesCollection := cr.Persistence.GetCollection(CollectionName)

	var categories []categoryModel.Category
	var searchQuery bson.M

	err := categoriesCollection.Find(searchQuery).All(&categories)

	if err != nil {
		return categories, err
	}

	return categories, nil
}

// AddCategory - add category to persistence
func (cr *Repository) AddCategory(c categoryModel.Category) error {
	categoriesCollection := cr.Persistence.GetCollection(CollectionName)
	return categoriesCollection.Insert(c)
}

// UpdateCategory - update existing category
func (cr *Repository) UpdateCategory(c categoryModel.Category) error {
	categoriesCollection := cr.Persistence.GetCollection(CollectionName)
	_, err := categoriesCollection.Upsert(bson.M{"_id": c.ID}, c)
	return err
}

// DeleteCategory - delete category
func (cr *Repository) DeleteCategory(id bson.ObjectId) error {
	categoriesCollection := cr.Persistence.GetCollection(CollectionName)
	return categoriesCollection.Remove(bson.M{"_id": id})
}
