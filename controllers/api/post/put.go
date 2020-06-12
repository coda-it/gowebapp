package post

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/datasources"
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/models/post"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

func putHandler(w http.ResponseWriter, r *http.Request, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		handlers.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var editedPost post.Post
	err = json.Unmarshal(requestBody, &editedPost)

	dataSource := s.GetDataSource(datasources.Persistence)
	p, ok := dataSource.(persistence.IPersistance)
	if !ok {
		handlers.HandleErrorResponse(w, "unsupported data source")
		return
	}

	err = post.UpdatePost(p, editedPost)

	if err != nil {
		handlers.HandleErrorResponse(w, "error updating post")
	}
}
