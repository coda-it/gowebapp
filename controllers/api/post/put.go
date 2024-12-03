package post

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebapp/domain/models/post"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

// CtrPostPut - update post
func (c *Controller) CtrPostPut(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var editedPost post.Post
	err = json.Unmarshal(requestBody, &editedPost)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)
	editedPost.AppID = application.ID

	err = c.PostUsecases.Update(editedPost)

	if err != nil {
		c.HandleErrorResponse(w, "error updating post")
	}

	data := struct {
		Post post.Post `json:"post"`
	}{
		editedPost,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": constants.PostEndpointURL,
		},
	}

	embedded := map[string]string{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
