package post

import (
	postModel "github.com/coda-it/gowebapp/models/post"
	postRepository "github.com/coda-it/gowebapp/repositories/post"
	"gopkg.in/mgo.v2/bson"
)

// Usecase - post usecases
type Usecase struct {
	postRepository postRepository.IRepository
}

// New - creates new post usecases
func New(pr postRepository.Repository) *Usecase {
	return &Usecase{
		&pr,
	}
}

// FetchPosts - fetch posts from persistence
func (p *Usecase) FetchPosts(userID string) ([]postModel.Post, error) {
	return p.postRepository.FetchPosts(userID)
}

// AddPost - add post to persistence
func (p *Usecase) AddPost(post postModel.Post) error {
	return p.postRepository.AddPost(post)
}

// UpdatePost - update existing post
func (p *Usecase) UpdatePost(post postModel.Post) error {
	return p.postRepository.UpdatePost(post)
}

// DeletePost - delete post
func (p *Usecase) DeletePost(id bson.ObjectId) error {
	return p.postRepository.DeletePost(id)
}
