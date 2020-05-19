package controllers

import (
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"gopkg.in/mgo.v2/bson"
	"net/http"
)

// AuthenticateLogout - logout user
func AuthenticateLogout(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	dfc := s.GetDataSource("persistence")

	p, ok := dfc.(persistence.IPersistance)
	if !ok {
		utils.Log("Invalid store")
		return
	}

	c := p.GetCollection("users")

	sid, err := utils.GetSessionID(r)

	if err != nil {
		err := c.Update(bson.M{
			"sid": sid,
		}, bson.M{
			"sid": "",
		})

		if err != nil {
			handlers.HandleErrorResponse(w, "error clearing sid in database")
			return
		}
	}

	utils.ClearSession(w)
	http.Redirect(w, r, "/", http.StatusSeeOther)
}
