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

type IPostRepository interface {
}

type PostRepository struct {
	Persistence persistence.IPersistance
}

func New (p persistence.IPersistance) PostRepository {
	return PostRepository{
		p,
	}
}

// FetchPosts - fetch posts from persistence
func (p *PostRepository) FetchPosts(userID string) ([]postModel.Post, error) {
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

// AddPost - add post to persistence
func (p *PostRepository) AddPost(post postModel.Post) error {
	postsCollection := p.Persistence.GetCollection(CollectionName)
	return postsCollection.Insert(post)
}

// UpdatePost - update existing post
func (p *PostRepository) UpdatePost(post postModel.Post) error {
	postsCollection := p.Persistence.GetCollection(CollectionName)
	_, err := postsCollection.Upsert(bson.M{"_id": post.ID}, post)
	return err
}

// DeletePost - delete post
func (p *PostRepository) DeletePost(id bson.ObjectId) error {
	postsCollection := p.Persistence.GetCollection(CollectionName)
	return postsCollection.Remove(bson.M{"_id": id})
}

