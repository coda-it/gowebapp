package post

import (
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/models/post"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"strconv"
)

// CtrPostGet - gets posts
func CtrPostGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	userID := r.URL.Query().Get("userId")

	p, err := utils.GetPersistence(s)
	if err != nil {
		handlers.HandleErrorResponse(w, err.Error())
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
