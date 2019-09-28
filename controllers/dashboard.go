package controllers

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"github.com/smart-evolution/shpanel/utils"
	"net/http"
)

// CtrDashboard - controller for agents list
func CtrDashboard(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	utils.RenderTemplate(w, r, "dashboard")
}
