package controllers

import (
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebapp/models/user"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"os"
)

// Register - handle register page and register user process
func Register(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	switch r.Method {
	case "GET":
		utils.RenderTemplate(w, r, "register", sm, make(map[string]interface{}))

	case "POST":
		dfc := s.GetDataSource("persistence")

		p, ok := dfc.(persistence.IPersistance)
		if !ok {
			utils.Log("invalid store")
			return
		}

		username := r.PostFormValue("username")
		password := utils.HashString(r.PostFormValue("password"))

		err := user.AddUser(p, username, password, os.Getenv("WEBAPP_ENV") == "test")

		if err != nil {
			utils.Log("error registering user '" + username + "'")
			return
		}
		utils.Log("registered user '" + username + "'")

		http.Redirect(w, r, "/", http.StatusSeeOther)
	default:
	}
}
