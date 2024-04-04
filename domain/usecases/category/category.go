package user

import (
	categoryModel "github.com/coda-it/gowebapp/domain/models/category"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Usecase - category usecases
type Usecase struct {
	categoryRepository IRepository
}

// New - creates new category usecases
func New(cr IRepository) *Usecase {
	return &Usecase{
		cr,
	}
}

// FetchAll - fetch categories from persistence
func (cr *Usecase) FetchAll() ([]categoryModel.Category, error) {
	return cr.categoryRepository.FetchAll()
}

// Add - add category to persistence
func (cr *Usecase) Add(c categoryModel.Category) error {
	return cr.categoryRepository.Add(c)
}

// Update - update existing category
func (cr *Usecase) Update(c categoryModel.Category) error {
	return cr.categoryRepository.Update(c)
}

// Delete - delete category
func (cr *Usecase) Delete(id primitive.ObjectID) error {
	return cr.categoryRepository.Delete(id)
}
