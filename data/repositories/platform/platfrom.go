package platform

import (
	"github.com/coda-it/gowebapp/data/persistence"
	platformModel "github.com/coda-it/gowebapp/domain/models/platform"
	"gopkg.in/mgo.v2/bson"
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
func (cr *Repository) Add(c platformModel.Config) error {
	platformCollection := cr.Persistence.GetCollection(collectionName)
	return platformCollection.Insert(c)
}

// Update - update platform config
func (cr *Repository) Update(c platformModel.Config) error {
	platformCollection := cr.Persistence.GetCollection(collectionName)
	_, err := platformCollection.Upsert(bson.M{"_id": c.ID}, c)
	return err
}

// Fetch - fetch platform config
func (cr *Repository) Fetch() (platformModel.Config, error) {
	platformCollection := cr.Persistence.GetCollection(collectionName)

	var config platformModel.Config
	var searchQuery bson.M

	err := platformCollection.Find(searchQuery).One(&config)

	if err != nil {
		return config, err
	}

	return config, nil
}
