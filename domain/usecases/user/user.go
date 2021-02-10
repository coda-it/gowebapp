package user

import (
	"errors"
	goutilsSession "github.com/coda-it/goutils/session"
	"github.com/coda-it/gowebapp/constants"
	userModel "github.com/coda-it/gowebapp/domain/models/user"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/utils/logger"
	"gopkg.in/mgo.v2/bson"
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

// Logout - logout user
func (u *Usecase) Logout(sid string) error {
	return u.userRepository.Update(bson.M{
		"sessionId": sid,
	}, bson.M{"$set": bson.M{"sessionId": sid}})
}

// Activate - activates user
func (u *Usecase) Activate(ID string) error {
	return u.userRepository.Update(bson.M{"_id": bson.ObjectIdHex(ID)}, bson.M{"$set": bson.M{"isActivated": true}})
}

// AuthenticateByCredentials - authenticate user with credentials
func (u *Usecase) AuthenticateByCredentials(username string, password string) (userModel.User, error) {
	usr, err := u.userRepository.Find(bson.M{
		"username": username,
		"password": password,
	})

	if err != nil {
		msg := "user not found"
		logger.Log(msg, logger.ERROR)
		return userModel.User{}, errors.New(msg)
	}

	logger.Log("logged in as user", usr.Username)

	return usr, nil
}

// CreateClientSession - authenticate uer with credentials and create session cookie
func (u *Usecase) CreateClientSession(w http.ResponseWriter, r *http.Request, username string, password string, sm session.ISessionManager) bool {
	expiration := time.Now().Add(365 * 24 * time.Hour)
	authenticatedUser, err := u.AuthenticateByCredentials(username, password)

	if err == nil {
		t := time.Now()
		timeStr := t.Format(time.RFC850)
		cookieValue := goutilsSession.CreateSessionID(username, password, timeStr)

		cookie := http.Cookie{
			Name:    constants.SessionKey,
			Value:   cookieValue,
			Expires: expiration}

		session := sm.Create(cookieValue)
		session.Set("user", authenticatedUser)

		http.SetCookie(w, &cookie)
		return true
	}
	return false
}
