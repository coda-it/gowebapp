package user

import (
	"errors"
	userModel "github.com/coda-it/gowebapp/models/user"
	userRepository "github.com/coda-it/gowebapp/repositories/user"
	"gopkg.in/mgo.v2/bson"
)

// Usecase - user usecases
type Usecase struct {
	userRepository userRepository.Repository
}

// New - creates new user usecases
func New(u userRepository.Repository) *Usecase {
	return &Usecase{
		u,
	}
}

// Register - registers new user
func (u *Usecase) Register(username string, password string, isRoot bool) error {
	return u.userRepository.AddUser(username, password, isRoot)
}

// Authenticate - authenticates existing user
func (u *Usecase) Authenticate(username string, password string, sid string) (userModel.User, error) {
	userExists := u.userRepository.DoesExist(bson.M{
		"username": username,
		"password": password,
	})

	if !userExists {
		return userModel.User{}, errors.New("user '" + username + "' not found")
	}

	return u.userRepository.Update(bson.M{"username": username}, bson.M{"$set": bson.M{"sessionId": sid}})
}
