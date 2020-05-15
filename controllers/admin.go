package controllers

import (
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrMain - controller for main page
func CtrMain(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	utils.RenderTemplate(w, r, "admin", sm, make(map[string]interface{}))
}
