package platform

import (
	"context"
	"github.com/coda-it/gowebapp/data/persistence"
	platformModel "github.com/coda-it/gowebapp/domain/models/platform"
	"go.mongodb.org/mongo-driver/bson"
)

const (
	collectionName = "platform"
)

// Repository - platform repository
type Repository struct {
	Persistence persistence.IPersistance
}

// New - creates new platform repository
func New(p persistence.IPersistance) *Repository {
	return &Repository{
		p,
	}
}

// Drop - drops whole database
func (r *Repository) Drop() error {
	return r.Persistence.DropDatabase()
}

// Add - inserts platform config
func (r *Repository) Add(c platformModel.Config) error {
	platformCollection := r.Persistence.GetCollection(collectionName)
	_, err := platformCollection.InsertOne(context.TODO(), c)
	return err
}

// Update - update platform config
func (r *Repository) Update(c platformModel.Config) error {
	platformCollection := r.Persistence.GetCollection(collectionName)
	_, err := platformCollection.UpdateOne(context.TODO(), bson.M{"_id": c.ID}, c)
	return err
}

// Fetch - fetch platform config
func (r *Repository) Fetch() (platformModel.Config, error) {
	platformCollection := r.Persistence.GetCollection(collectionName)

	var config platformModel.Config
	var searchQuery bson.M

	cursor, err := platformCollection.Find(context.TODO(), searchQuery)
	if err != nil {
		return config, err
	}

	err = cursor.Decode(config)
	if err != nil {
		return config, err
	}

	return config, nil
}
