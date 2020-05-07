package controllers

import (
	"fmt"
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebapp/models/user"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"gopkg.in/mgo.v2/bson"
	"net/http"
)

// Register - handle register page and register user process
func Register(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	switch r.Method {
	case "GET":
		utils.RenderTemplate(w, r, "register", sm, make(map[string]interface{}))

	case "POST":
		var newUser *user.User

		dfc := s.GetDataSource("persistence")

		p, ok := dfc.(persistence.IPersistance)
		if !ok {
			utils.Log("Invalid store")
			return
		}

		c := p.GetCollection("users")

		username := r.PostFormValue("username")
		password := utils.HashString(r.PostFormValue("password"))

		newUser = &user.User{
			ID:       bson.NewObjectId(),
			Username: username,
			Password: password,
		}

		err := c.Insert(newUser)
		if err != nil {
			fmt.Println(err)
			utils.Log("Error registering user '" + username + "'")
			return
		}
		utils.Log("Registered user '" + username + "'")

		http.Redirect(w, r, "/", http.StatusSeeOther)
	default:
	}
}
