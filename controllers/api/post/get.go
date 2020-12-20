package post

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"strconv"
)

// CtrPostGet - gets posts
func (p *Controller) CtrPostGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	userID := r.URL.Query().Get("userId")
	posts, err := p.PostUsecases.FetchAll(userID)

	if err != nil {
		p.HandleErrorResponse(w, err.Error())
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

	p.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
