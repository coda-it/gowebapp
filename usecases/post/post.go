package post

import (
	postRepository "github.com/coda-it/gowebapp/repositories/post"
	postModel "github.com/coda-it/gowebapp/models/post"
	"gopkg.in/mgo.v2/bson"
)

// IPostUsecase - use case for user activation repository
type IPostUsecase interface {
}

type PostUsecase struct {
	postRepository	postRepository.PostRepository
}

func New(p postRepository.PostRepository) *PostUsecase {
	return &PostUsecase {
		p,
	}
}

// FetchPosts - fetch posts from persistence
func (p *PostUsecase) FetchPosts(userID string) ([]postModel.Post, error) {
	return p.postRepository.FetchPosts(userID)
}

// AddPost - add post to persistence
func (p *PostUsecase) AddPost(post postModel.Post) error {
	return p.postRepository.AddPost(post)
}

// UpdatePost - update existing post
func (p *PostUsecase) UpdatePost(post postModel.Post) error {
	return p.postRepository.UpdatePost(post)
}

// DeletePost - delete post
func (p *PostUsecase) DeletePost(id bson.ObjectId) error {
	return p.postRepository.DeletePost(id)
}
