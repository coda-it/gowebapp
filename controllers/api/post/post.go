package post

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/models/post"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

// CtrPostPost - adds new post
func CtrPostPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		handlers.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var newPost post.Post
	err = json.Unmarshal(requestBody, &newPost)

	p, err := utils.GetPersistence(s)
	if err != nil {
		handlers.HandleErrorResponse(w, err.Error())
		return
	}

	err = post.AddPost(p, newPost)

	if err != nil {
		handlers.HandleErrorResponse(w, "error adding new post")
	}
}
