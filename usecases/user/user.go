package user

import (
	userRepository "github.com/coda-it/gowebapp/repositories/user"
	userModel "github.com/coda-it/gowebapp/models/user"
	"gopkg.in/mgo.v2/bson"
	"errors"
)

// IUserUsecase - use case for user activation repository
type IUserUsecase interface {
}

type UserUsecase struct {
	userRepository	userRepository.UserRepository
}

func New(u userRepository.UserRepository) *UserUsecase {
	return &UserUsecase {
		u,
	}
}

func (u *UserUsecase) Register(username string, password string, isRoot bool) error {
	return u.userRepository.AddUser(username, password, isRoot)
}

func (u *UserUsecase) Authenticate(username string, password string, sid string) (userModel.User, error) {
	userExists := u.userRepository.DoesExist(bson.M{
		"username": username,
		"password": password,
	})

	if !userExists {
		return userModel.User{}, errors.New("user '" + username + "' not found")
	}

	return u.userRepository.Update(bson.M{"username": username}, bson.M{"$set": bson.M{"sessionId": sid}})
}
