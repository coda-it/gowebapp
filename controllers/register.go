package controllers

import (
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/gowebapp/handlers"
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
		handlers.RenderTemplate(w, r, "register", sm, make(map[string]interface{}))

	case "POST":
		p, err := utils.GetPersistence(s)
		if err != nil {
			handlers.HandleErrorResponse(w, err.Error())
			return
		}

		username := r.PostFormValue("username")
		password := utils.HashString(r.PostFormValue("password"))

		err = user.AddUser(p, username, password, os.Getenv("WEBAPP_ENV") == "test")

		if err != nil {
			logger.Log("error registering user '" + username + "'")
			return
		}
		logger.Log("registered user '" + username + "'")

		http.Redirect(w, r, "/", http.StatusSeeOther)
	default:
	}
}
