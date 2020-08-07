package user

import (
	"errors"
	"github.com/coda-it/gowebserver/session"
	"net/http"
)

// GetLoggedUser - gets logged user from session
func GetLoggedUser(r *http.Request, sm session.ISessionManager) (User, error) {
	sid, err := session.GetSessionID(r)
	if err != nil {
		return User{}, err
	}

	userSession := sm.Get(sid)
	u := userSession.Get("user")

	if u == nil {
		return User{}, errors.New("no user in session")
	}

	embedded := map[string]map[string]bool{}
	embedded["featureFlags"] = make(map[string]bool)

	uu, ok := u.(User)
	if !ok {
		return User{}, errors.New("error asserting user")
	}

	return uu, nil
}
