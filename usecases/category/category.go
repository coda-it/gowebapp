package user

import (
	categoryModel "github.com/coda-it/gowebapp/models/category"
	categoryRepository "github.com/coda-it/gowebapp/repositories/category"
	"gopkg.in/mgo.v2/bson"
)

// Usecase - category usecases
type Usecase struct {
	categoryRepository categoryRepository.IRepository
}

// New - creates new category usecases
func New(cr categoryRepository.Repository) *Usecase {
	return &Usecase{
		&cr,
	}
}

// FetchCategories - fetch categories from persistence
func (cr *Usecase) FetchCategories() ([]categoryModel.Category, error) {
	return cr.categoryRepository.FetchCategories()
}

// AddCategory - add category to persistence
func (cr *Usecase) AddCategory(c categoryModel.Category) error {
	return cr.categoryRepository.AddCategory(c)
}

// UpdateCategory - update existing category
func (cr *Usecase) UpdateCategory(c categoryModel.Category) error {
	return cr.categoryRepository.UpdateCategory(c)
}

// DeleteCategory - delete category
func (cr *Usecase) DeleteCategory(id bson.ObjectId) error {
	return cr.categoryRepository.DeleteCategory(id)
}
