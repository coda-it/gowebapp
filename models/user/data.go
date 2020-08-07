package user

import (
	"errors"
	"github.com/coda-it/gowebapp/datasources/persistence"
	"gopkg.in/mgo.v2/bson"
)

// AddUser - add user to the persistence
func AddUser(p persistence.IPersistance, username string, password string) error {
	c := p.GetCollection(CollectionName)

	newUser := &User{
		ID:           bson.NewObjectId(),
		Username:     username,
		Password:     password,
		Entitlements: []string{},
	}

	err := c.Insert(newUser)

	return err
}

// AuthenticateUser - authenticate user in the persistence
func AuthenticateUser(p persistence.IPersistance, username string, password string, sid string) (User, error) {
	var u User

	c := p.GetCollection("users")

	err := c.Find(bson.M{
		"username": username,
		"password": password,
	}).One(&u)

	if err != nil {
		return u, errors.New("user '" + username + "' not found")
	}

	err = c.Update(bson.M{"username": username}, bson.M{"$set": bson.M{"sessionId": sid}})

	if err != nil {
		return u, errors.New("error updating " + username + " status")
	}

	return u, nil
}
