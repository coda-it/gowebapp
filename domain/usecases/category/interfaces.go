package user

import (
	categoryModel "github.com/coda-it/gowebapp/domain/models/category"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// IRepository - category repository interface
type IRepository interface {
	FetchAll() ([]categoryModel.Category, error)
	Add(c categoryModel.Category) error
	Update(c categoryModel.Category) error
	Delete(id primitive.ObjectID) error
}
