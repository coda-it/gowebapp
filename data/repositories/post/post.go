package post

import (
	"context"
	"github.com/coda-it/gowebapp/data/persistence"
	postModel "github.com/coda-it/gowebapp/domain/models/post"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	collectionName = "posts"
)

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
	postsCollection := p.Persistence.GetCollection(collectionName)

	var posts []postModel.Post
	var searchQuery bson.M

	if userID != "" {
		searchQuery = bson.M{"userId": userID}
	} else {
		searchQuery = bson.M{}
	}

	cursor, err := postsCollection.Find(context.TODO(), searchQuery)
	if err != nil {
		return posts, err
	}

	err = cursor.All(context.TODO(), &posts)
	if err != nil {
		return posts, err
	}

	return posts, nil
}

// Add - add post to persistence
func (p *Repository) Add(post postModel.Post) error {
	postsCollection := p.Persistence.GetCollection(collectionName)
	_, err := postsCollection.InsertOne(context.TODO(), post)
	return err
}

// Update - update existing post
func (p *Repository) Update(post postModel.Post) error {
	postsCollection := p.Persistence.GetCollection(collectionName)
	_, err := postsCollection.UpdateOne(context.TODO(), bson.M{"_id": post.ID}, post)
	return err
}

// Delete - delete post
func (p *Repository) Delete(id primitive.ObjectID) error {
	postsCollection := p.Persistence.GetCollection(collectionName)
	_, err := postsCollection.DeleteOne(context.TODO(), bson.M{"_id": id})
	return err
}
