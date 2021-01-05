package post

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/domain/models/post"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

// CtrPostPost - adds new post
func (c *Controller) CtrPostPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var newPost post.Post

	err = json.Unmarshal(requestBody, &newPost)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	err = c.PostUsecases.Add(newPost)

	if err != nil {
		c.HandleErrorResponse(w, "error adding new post")
	}
}
