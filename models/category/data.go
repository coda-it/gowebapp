package category

import (
	"github.com/coda-it/gowebapp/datasources/persistence"
	"gopkg.in/mgo.v2/bson"
)

// FetchCategories - fetch categories from persistence
func FetchCategories(p persistence.IPersistance) ([]Category, error) {
	categoriesCollection := p.GetCollection(CollectionName)

	var categories []Category
	var searchQuery bson.M

	err := categoriesCollection.Find(searchQuery).All(&categories)

	if err != nil {
		return categories, err
	}

	return categories, nil
}

// AddCategory - add category to persistence
func AddCategory(p persistence.IPersistance, c Category) error {
	categoriesCollection := p.GetCollection(CollectionName)
	return categoriesCollection.Insert(c)
}

// UpdateCategory - update existing category
func UpdateCategory(p persistence.IPersistance, c Category) error {
	categoriesCollection := p.GetCollection(CollectionName)
	_, err := categoriesCollection.Upsert(bson.M{"_id": c.ID}, c)
	return err
}

// DeleteCategory - delete category
func DeleteCategory(p persistence.IPersistance, id bson.ObjectId) error {
	categoriesCollection := p.GetCollection(CollectionName)
	return categoriesCollection.Remove(bson.M{"_id": id})
}
