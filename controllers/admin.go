package controllers

import (
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrAdmin - controller for admin page
func CtrAdmin(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	utils.RenderTemplate(w, r, "admin", sm, make(map[string]interface{}))
}
