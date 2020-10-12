package post

import (
	"github.com/coda-it/gowebapp/datasources/persistence"
	postModel "github.com/coda-it/gowebapp/models/post"
	"gopkg.in/mgo.v2/bson"
)

const (
	// CollectionName - is mongodb collection name
	CollectionName = "posts"
)

// IRepository - post repository interface
type IRepository interface {
	FetchAll(userID string) ([]postModel.Post, error)
	Add(post postModel.Post) error
	Update(post postModel.Post) error
	Delete(id bson.ObjectId) error
}

// Repository - post repository
type Repository struct {
	Persistence persistence.IPersistance
}

// New - creates new post repository
func New(p persistence.IPersistance) Repository {
	return Repository{
		p,
	}
}

// FetchAll - fetch posts from persistence
func (p *Repository) FetchAll(userID string) ([]postModel.Post, error) {
	postsCollection := p.Persistence.GetCollection(CollectionName)

	var posts []postModel.Post
	var searchQuery bson.M

	if userID != "" {
		searchQuery = bson.M{"userId": userID}
	} else {
		searchQuery = bson.M{}
	}

	err := postsCollection.Find(searchQuery).All(&posts)

	if err != nil {
		return posts, err
	}

	return posts, nil
}

// Add - add post to persistence
func (p *Repository) Add(post postModel.Post) error {
	postsCollection := p.Persistence.GetCollection(CollectionName)
	return postsCollection.Insert(post)
}

// Update - update existing post
func (p *Repository) Update(post postModel.Post) error {
	postsCollection := p.Persistence.GetCollection(CollectionName)
	_, err := postsCollection.Upsert(bson.M{"_id": post.ID}, post)
	return err
}

// Delete - delete post
func (p *Repository) Delete(id bson.ObjectId) error {
	postsCollection := p.Persistence.GetCollection(CollectionName)
	return postsCollection.Remove(bson.M{"_id": id})
}