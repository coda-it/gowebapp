package post

import (
	postModel "github.com/coda-it/gowebapp/domain/models/post"
	"gopkg.in/mgo.v2/bson"
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
func (p *Usecase) FetchAll(userID string) ([]postModel.Post, error) {
	return p.postRepository.FetchAll(userID)
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
func (p *Usecase) Delete(id bson.ObjectId) error {
	return p.postRepository.Delete(id)
}
