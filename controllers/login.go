package controllers

import (
	"errors"
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebapp/models/user"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"time"
)

// Authenticate - handle login page and login process
func Authenticate(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	defer r.Body.Close()

	switch r.Method {
	case "GET":
		_, ok := r.URL.Query()["err"]
		params := make(map[string]interface{})

		if ok {
			params["IsError"] = true
		}

		utils.RenderTemplate(w, r, "login", sm, params)

	case "POST":
		sessionID, _ := utils.GetSessionID(r)
		isLogged := sm.IsExist(sessionID)

		if !isLogged {
			u := r.PostFormValue("username")
			password := utils.HashString(r.PostFormValue("password"))
			expiration := time.Now().Add(365 * 24 * time.Hour)

			dfc := s.GetDataSource("persistence")

			p, ok := dfc.(persistence.IPersistance)
			if !ok {
				utils.Log("Invalid store")
				return
			}

			t := time.Now()
			timeStr := t.Format(time.RFC850)
			cookieValue := utils.CreateSessionID(u, password, timeStr)
			authenticatedUser, err := authenticateUser(u, password, cookieValue, p)

			if err == nil {
				utils.Log("Logged in as user", u)

				cookie := http.Cookie{
					Name:    utils.SessionKey,
					Value:   cookieValue,
					Expires: expiration}

				s := sm.Create(cookieValue)
				s.Set("user", authenticatedUser)

				http.SetCookie(w, &cookie)
				http.Redirect(w, r, "/", http.StatusSeeOther)
			} else {
				utils.Log(err)
				http.Redirect(w, r, "/login?err", http.StatusSeeOther)
			}
		}

		http.Redirect(w, r, "/login", http.StatusSeeOther)

	default:
	}
}

func authenticateUser(username string, password string, sid string, p persistence.IPersistance) (user.User, error) {
	var u user.User

	c := p.GetCollection("users")

	err := c.Find(bson.M{
		"username": username,
		"password": password,
	}).One(&u)

	if err != nil {
		return u, errors.New("User '" + username + "' not found")
	}

	err = c.Update(bson.M{"username": username}, bson.M{"sessionId": sid})

	if err != nil {
		return u, errors.New("error updating " + username + " status")
	}

	return u, nil
}
