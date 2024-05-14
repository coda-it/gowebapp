package user

import (
	"errors"
	goutilsSession "github.com/coda-it/goutils/session"
	"github.com/coda-it/gowebapp/constants"
	userModel "github.com/coda-it/gowebapp/domain/models/user"
	userHelpers "github.com/coda-it/gowebapp/helpers/user"
	"github.com/coda-it/gowebserver/session"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"time"
)

// Usecase - user usecases
type Usecase struct {
	userRepository IRepository
}

// New - creates new user usecases
func New(ur IRepository) *Usecase {
	return &Usecase{
		ur,
	}
}

// Register - registers new user
func (u *Usecase) Register(appID string, username string, password string, isRoot bool) (userModel.User, error) {
	_, err := u.userRepository.Find(bson.M{
		"username": username,
		"password": password,
	})

	if err == nil {
		return userModel.User{}, errors.New("User already exists")
	}

	return u.userRepository.Add(appID, username, password, isRoot)
}

// Logout - logout user
func (u *Usecase) Logout(sid string) error {
	return u.userRepository.Update(bson.M{
		"sessionId": sid,
	}, bson.M{"$set": bson.M{"sessionId": sid}})
}

// Activate - activates user
func (u *Usecase) Activate(ID string) error {
	id, _ := primitive.ObjectIDFromHex(ID)
	return u.userRepository.Update(bson.M{"_id": id}, bson.M{"$set": bson.M{"isActivated": true}})
}

func (u *Usecase) authenticate(username string, password string, sid string) (userModel.User, error) {
	authenticatedUser, err := u.userRepository.Find(bson.M{
		"username": username,
		"password": password,
	})
	if err != nil {
		return userModel.User{}, errors.New("user '" + username + "' not found")
	}

	err = u.userRepository.Update(bson.M{"username": username}, bson.M{"$set": bson.M{"sessionId": sid}})
	return authenticatedUser, err
}

// CreateClientSession - checks does user exist in the repository and sets session in repository and browser
func (u *Usecase) CreateClientSession(w http.ResponseWriter, r *http.Request, username string, password string, sm session.ISessionManager) (userModel.User, error) {
	expiration := time.Now().Add(365 * 24 * time.Hour)
	t := time.Now()
	timeStr := t.Format(time.RFC850)
	cookieValue := goutilsSession.CreateSessionID(username, password, timeStr)

	authenticatedUser, err := u.authenticate(username, password, cookieValue)
	isActivated := userHelpers.IsActivated(authenticatedUser)

	if err == nil && isActivated {
		cookie := http.Cookie{
			Name:    constants.SessionKey,
			Value:   cookieValue,
			Expires: expiration}

		userSession := sm.Create(cookieValue)
		userSession.Set("user", authenticatedUser)

		http.SetCookie(w, &cookie)
		return authenticatedUser, nil
	}
	return userModel.User{}, err
}

// Delete - deletes user
func (u *Usecase) Delete(id primitive.ObjectID) error {
	return u.userRepository.Delete(id)
}
