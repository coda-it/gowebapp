package controllers

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"github.com/smart-evolution/shpanel/utils"
	"net/http"
)

// NotFound - controller for 404 requests
func NotFound(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	utils.RenderTemplate(w, r, "404")
}
