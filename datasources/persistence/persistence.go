package persistence

import (
	"gopkg.in/mgo.v2"
)

// IPersistance - interface for user settings and general purpose storage
type IPersistance interface {
	GetCollection(string) *mgo.Collection
}

// Persistance - data source keeping system state and user data
type Persistance struct {
	session *mgo.Session
	dbName  string
}

// New - creates new instance of Persistance
func New(dbURI string, dbName string) *Persistance {
	session, err := mgo.Dial(dbURI)
	if err != nil {
		panic(err)
	}

	session.SetMode(mgo.Monotonic, true)

	return &Persistance{
		session,
		dbName,
	}
}

func (p *Persistance) getDatabase() *mgo.Database {
	return p.session.DB(p.dbName)
}

// GetCollection - gets collection from Persistance instance
func (p *Persistance) GetCollection(name string) *mgo.Collection {
	ds := p.getDatabase()
	return ds.C(name)
}
