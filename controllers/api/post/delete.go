package post

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/models/post"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

// CtrPostDelete - deletes post
func (p *Controller) CtrPostDelete(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		p.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var deletedPost post.Post

	err = json.Unmarshal(requestBody, &deletedPost)
	if err != nil {
		p.HandleErrorResponse(w, err.Error())
		return
	}

	err = p.PostUsecases.Delete(deletedPost.ID)

	if err != nil {
		p.HandleErrorResponse(w, "error removing post")
	}

	data := struct {
		Post post.Post `json:"post"`
	}{
		deletedPost,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": "/api/posts",
		},
	}

	embedded := map[string]string{}

	p.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
