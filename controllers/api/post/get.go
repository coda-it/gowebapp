package post

import (
	"github.com/coda-it/gowebapp/datasources"
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/models/post"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"strconv"
)

func getHandler(w http.ResponseWriter, r *http.Request, s store.IStore) {
	userID := r.URL.Query().Get("userId")
	dataSource := s.GetDataSource(datasources.Persistence)
	p, ok := dataSource.(persistence.IPersistance)
	if !ok {
		msg := "unsupported data source"
		utils.Log(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	posts, err := post.FetchPosts(p, userID)

	if err != nil {
		handlers.HandleErrorResponse(w, err.Error())
		return
	}

	data := map[string]string{
		"count": strconv.Itoa(len(posts)),
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": href,
		},
	}

	embedded := map[string]interface{}{
		"posts": posts,
	}

	handlers.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
