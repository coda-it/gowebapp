package persistence

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// IPersistance - interface for user settings and general purpose storage
type IPersistance interface {
	GetCollection(string) *mongo.Collection
	DropDatabase() error
}

// Persistance - data source keeping system state and user data
type Persistance struct {
	client *mongo.Client
	dbName string
}

// New - creates new instance of Persistance
func New(dbURI string, dbName string) *Persistance {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(dbURI).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(context.TODO(), opts)

	if err != nil {
		panic(err)
	}

	return &Persistance{
		client,
		dbName,
	}
}

func (p *Persistance) getDatabase() *mongo.Database {
	return p.client.Database(p.dbName)
}

// GetCollection - gets collection from Persistance instance
func (p *Persistance) GetCollection(name string) *mongo.Collection {
	ds := p.getDatabase()
	return ds.Collection(name)
}

// DropDatabase - clear whole database
func (p *Persistance) DropDatabase() error {
	ds := p.getDatabase()
	return ds.Drop(context.TODO())
}
