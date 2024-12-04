package user

import (
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebapp/domain/models/user"
	userHelpers "github.com/coda-it/gowebapp/helpers/user"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrUserDelete - deletes user account
func (c *Controller) CtrUserDelete(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	deletedUser, err := userHelpers.GetLoggedUser(r, sm)

	if err != nil {
		c.HandleErrorResponse(w, "getting user from session failed")
		return
	}

	err = c.UserUsecases.Delete(deletedUser.ID)

	if err != nil {
		c.HandleErrorResponse(w, "error deleting user")
		return
	}

	data := struct {
		User user.User `json:"user"`
	}{
		deletedUser,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": constants.UserEndpointURL,
		},
	}

	embedded := map[string]string{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
