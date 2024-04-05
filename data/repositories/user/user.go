package user

import (
	"context"
	"github.com/coda-it/gowebapp/data/persistence"
	userModel "github.com/coda-it/gowebapp/domain/models/user"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	collectionName = "users"
)

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
func (u *Repository) Update(where bson.M, data bson.M) error {
	_, err := u.Persistence.GetCollection(collectionName).UpdateOne(context.TODO(), where, data)
	if err != nil {
		return err
	}

	return nil
}

// Find - finds user
func (u *Repository) Find(user bson.M) (userModel.User, error) {
	var usr userModel.User

	c := u.Persistence.GetCollection(collectionName)
	result := c.FindOne(context.TODO(), user)
	err := result.Decode(&usr)

	return usr, err
}

// Add - adds new user
func (u *Repository) Add(username string, password string, isRoot bool) error {
	c := u.Persistence.GetCollection(collectionName)
	entitlements := []string{}

	if isRoot {
		entitlements = append(entitlements, "root")
	}

	newUser := &userModel.User{
		ID:           primitive.NewObjectID(),
		Username:     username,
		Password:     password,
		Entitlements: entitlements,
	}

	_, err := c.InsertOne(context.TODO(), newUser)

	return err
}
