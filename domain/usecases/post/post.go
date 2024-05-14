package post

import (
	postModel "github.com/coda-it/gowebapp/domain/models/post"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Usecase - post usecases
type Usecase struct {
	postRepository IRepository
}

// New - creates new post usecases
func New(pr IRepository) *Usecase {
	return &Usecase{
		pr,
	}
}

// FetchAll - fetch posts from persistence
func (p *Usecase) FetchAll(appID string, userID string) ([]postModel.Post, error) {
	return p.postRepository.FetchAll(appID, userID)
}

// Add - add post to persistence
func (p *Usecase) Add(post postModel.Post) error {
	return p.postRepository.Add(post)
}

// Update - update existing post
func (p *Usecase) Update(post postModel.Post) error {
	return p.postRepository.Update(post)
}

// Delete - delete post
func (p *Usecase) Delete(id primitive.ObjectID) error {
	return p.postRepository.Delete(id)
}
