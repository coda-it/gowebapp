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

type ICategoryRepository interface {
}

type CategoryRepository struct {
	Persistence persistence.IPersistance
}

func New (p persistence.IPersistance) CategoryRepository {
	return CategoryRepository{
		p,
	}
}

// FetchCategories - fetch categories from persistence
func (cr *CategoryRepository) FetchCategories() ([]categoryModel.Category, error) {
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
func (cr *CategoryRepository) AddCategory(c categoryModel.Category) error {
	categoriesCollection := cr.Persistence.GetCollection(CollectionName)
	return categoriesCollection.Insert(c)
}

// UpdateCategory - update existing category
func (cr *CategoryRepository) UpdateCategory(c categoryModel.Category) error {
	categoriesCollection := cr.Persistence.GetCollection(CollectionName)
	_, err := categoriesCollection.Upsert(bson.M{"_id": c.ID}, c)
	return err
}

// DeleteCategory - delete category
func (cr *CategoryRepository) DeleteCategory(id bson.ObjectId) error {
	categoriesCollection := cr.Persistence.GetCollection(CollectionName)
	return categoriesCollection.Remove(bson.M{"_id": id})
}


