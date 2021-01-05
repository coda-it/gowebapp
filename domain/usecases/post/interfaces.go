package post

import (
	postModel "github.com/coda-it/gowebapp/domain/models/post"
	"gopkg.in/mgo.v2/bson"
)

// IRepository - post repository interface
type IRepository interface {
	FetchAll(userID string) ([]postModel.Post, error)
	Add(post postModel.Post) error
	Update(post postModel.Post) error
	Delete(id bson.ObjectId) error
}
