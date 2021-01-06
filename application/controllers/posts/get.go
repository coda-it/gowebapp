package posts

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrPosts - controller for posts
func (c *Controller) CtrPosts(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	c.RenderTemplate(w, r, "posts", sm, make(map[string]interface{}))
}
