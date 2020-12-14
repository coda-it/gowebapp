package user

import (
	"errors"
	userModel "github.com/coda-it/gowebapp/models/user"
	userRepository "github.com/coda-it/gowebapp/repositories/user"
	"gopkg.in/mgo.v2/bson"
)

// Usecase - user usecases
type Usecase struct {
	userRepository userRepository.IRepository
}

// New - creates new user usecases
func New(ur userRepository.IRepository) *Usecase {
	return &Usecase{
		ur,
	}
}

// Register - registers new user
func (u *Usecase) Register(username string, password string, isRoot bool) error {
	return u.userRepository.Add(username, password, isRoot)
}

// Authenticate - authenticates existing user
func (u *Usecase) Authenticate(username string, password string, sid string) (userModel.User, error) {
	usr, err := u.userRepository.Find(bson.M{
		"username": username,
		"password": password,
	})
	if err != nil {
		return userModel.User{}, errors.New("user '" + username + "' not found")
	}

	err = u.userRepository.Update(bson.M{"username": username}, bson.M{"$set": bson.M{"sessionId": sid}})

	return usr, err
}

// Activate - activates user
func (u *Usecase) Activate(ID string) error {
	return u.userRepository.Update(bson.M{"_id": bson.ObjectIdHex(ID)}, bson.M{"$set": bson.M{"isActivated": true}})
}
