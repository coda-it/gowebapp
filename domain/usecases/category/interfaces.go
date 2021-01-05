package user

import (
	categoryModel "github.com/coda-it/gowebapp/domain/models/category"
	"gopkg.in/mgo.v2/bson"
)

// IRepository - category repository interface
type IRepository interface {
	FetchAll() ([]categoryModel.Category, error)
	Add(c categoryModel.Category) error
	Update(c categoryModel.Category) error
	Delete(id bson.ObjectId) error
}
