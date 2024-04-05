package post

import (
	postModel "github.com/coda-it/gowebapp/domain/models/post"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// IRepository - post repository interface
type IRepository interface {
	FetchAll(userID string) ([]postModel.Post, error)
	Add(post postModel.Post) error
	Update(post postModel.Post) error
	Delete(id primitive.ObjectID) error
}
