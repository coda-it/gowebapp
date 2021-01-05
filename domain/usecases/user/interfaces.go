package user

import (
	userModel "github.com/coda-it/gowebapp/domain/models/user"
	"gopkg.in/mgo.v2/bson"
)

// IRepository - user repository interface
type IRepository interface {
	Update(data bson.M, where bson.M) error
	Find(user bson.M) (userModel.User, error)
	Add(username string, password string, isRoot bool) error
}
