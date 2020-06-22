package post

import (
	"github.com/coda-it/gowebapp/datasources/persistence"
	"gopkg.in/mgo.v2/bson"
)

// FetchPosts - fetch posts from persistence
func FetchPosts(p persistence.IPersistance, userID string) ([]Post, error) {
	postsCollection := p.GetCollection(CollectionName)

	var posts []Post
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
func AddPost(p persistence.IPersistance, post Post) error {
	postsCollection := p.GetCollection(CollectionName)
	return postsCollection.Insert(post)
}

// UpdatePost - update existing post
func UpdatePost(p persistence.IPersistance, post Post) error {
	postsCollection := p.GetCollection(CollectionName)
	_, err := postsCollection.Upsert(bson.M{"_id": post.ID}, post)
	return err
}

// DeletePost - delete post
func DeletePost(p persistence.IPersistance, id bson.ObjectId) error {
	postsCollection := p.GetCollection(CollectionName)
	return postsCollection.Remove(bson.M{"_id": id})
}
