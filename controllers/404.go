package controllers

import (
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// NotFound - controller for 404 requests
func NotFound(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	handlers.RenderTemplate(w, r, "404", sm, make(map[string]interface{}))
}
