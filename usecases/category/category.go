package user

import (
	categoryRepository "github.com/coda-it/gowebapp/repositories/category"
	categoryModel "github.com/coda-it/gowebapp/models/category"
	"gopkg.in/mgo.v2/bson"
)

// ICategoryUsecase - use case for user activation repository
type ICategoryUsecase interface {
}

type CategoryUsecase struct {
	categoryRepository	categoryRepository.CategoryRepository
}

func New(c categoryRepository.CategoryRepository) *CategoryUsecase {
	return &CategoryUsecase {
		c,
	}
}

// FetchCategories - fetch categories from persistence
func (cr *CategoryUsecase) FetchCategories() ([]categoryModel.Category, error) {
	return cr.categoryRepository.FetchCategories()
}

// AddCategory - add category to persistence
func (cr *CategoryUsecase) AddCategory(c categoryModel.Category) error {
	return cr.categoryRepository.AddCategory(c)
}

// UpdateCategory - update existing category
func (cr *CategoryUsecase) UpdateCategory(c categoryModel.Category) error {
	return cr.categoryRepository.UpdateCategory(c)
}

// DeleteCategory - delete category
func (cr *CategoryUsecase) DeleteCategory(id bson.ObjectId) error {
	return cr.categoryRepository.DeleteCategory(id)
}
