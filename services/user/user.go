package user

import (
	"errors"
	userModel "github.com/coda-it/gowebapp/models/user"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/session"
	"net/http"
)

// IsActivated - checks whether user is activated
func IsActivated(user userModel.User) bool {
	isActivationEnabled, _ := utils.GetFeatureFlag("isActivationEnabled", false)
	return !isActivationEnabled || isActivationEnabled && user.Activated || utils.IsTestEnv()
}

// IsLogged - checks whether user is logged
func IsLogged(r *http.Request, sm session.ISessionManager) bool {
	sessionID, _ := session.GetSessionID(r)
	return sm.IsExist(sessionID)
}

// GetLoggedUser - gets logged user from session
func GetLoggedUser(r *http.Request, sm session.ISessionManager) (userModel.User, error) {
	sid, err := session.GetSessionID(r)
	if err != nil {
		return userModel.User{}, err
	}

	userSession := sm.Get(sid)

	user := userSession.Get("user")
	if user == nil {
		return userModel.User{}, errors.New("no user in session")
	}

	uu, ok := user.(userModel.User)
	if !ok {
		return userModel.User{}, errors.New("error asserting user")
	}

	return uu, nil
}
