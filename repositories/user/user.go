package user

import (
	"errors"
	"github.com/coda-it/gowebapp/datasources/persistence"
	userModel "github.com/coda-it/gowebapp/models/user"
	"gopkg.in/mgo.v2/bson"
)

const (
	// CollectionName - is mongodb collection name
	CollectionName = "users"
)

// IRepository - user repository interface
type IRepository interface {
	Update(data bson.M, where bson.M) error
	Find(user bson.M) (userModel.User, error)
	Add(username string, password string, isRoot bool) error
}

// Repository - user repository
type Repository struct {
	Persistence persistence.IPersistance
}

// New - creates instance of user repository
func New(p persistence.IPersistance) Repository {
	return Repository{
		p,
	}
}

// Update - updates particular user
func (u *Repository) Update(data bson.M, where bson.M) error {
	var usr userModel.User

	err := u.Persistence.GetCollection(CollectionName).Update(data, where)

	if err != nil {
		return errors.New("error updating " + usr.Username + " status")
	}

	return nil
}

// Find - finds user
func (u *Repository) Find(user bson.M) (userModel.User, error) {
	var usr userModel.User

	c := u.Persistence.GetCollection(CollectionName)
	err := c.Find(user).One(&usr)

	return usr, err
}

// Add - adds new user
func (u *Repository) Add(username string, password string, isRoot bool) error {
	c := u.Persistence.GetCollection(CollectionName)
	entitlements := []string{}

	if isRoot {
		entitlements = append(entitlements, "root")
	}

	newUser := &userModel.User{
		ID:           bson.NewObjectId(),
		Username:     username,
		Password:     password,
		Entitlements: entitlements,
	}

	err := c.Insert(newUser)

	return err
}