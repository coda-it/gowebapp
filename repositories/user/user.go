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

type IUserRepository interface {
	AddUser(string, string, bool) error
	DoesExist(string, string) bool
}

type UserRepository struct {
	Persistence persistence.IPersistance
}

func New (p persistence.IPersistance) UserRepository {
	return 	UserRepository{
		p,
	}
}

func (u *UserRepository) Update(data bson.M, where bson.M) (userModel.User, error) {
	var usr userModel.User

	err := u.Persistence.GetCollection(CollectionName).Update(data, where)

	if err != nil {
		return usr, errors.New("error updating " + usr.Username + " status")
	}

	return usr, nil
}

func (u *UserRepository) DoesExist(user bson.M) bool {
	var usr userModel.User

	c := u.Persistence.GetCollection(CollectionName)
	err := c.Find(user).One(&usr)

	if err != nil {
		return false
	}

	return true
}

func (u *UserRepository) AddUser(username string, password string, isRoot bool) error {
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
