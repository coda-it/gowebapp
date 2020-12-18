package categories

import (
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrCategories - controller for categories
func (c *Controller)  CtrCategories(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	c.RenderTemplate(w, r, "categories", sm, make(map[string]interface{}))
}

src/frontend/modules/screener/integration/columns Given a screener with available structured products should persist reordered columns when switching between asset types within a screener and then switching to another screener on investor

src/frontend/modules/screener/integration/columns Given a screener with available structured products should persist reordered columns when switching between explore and screener when screener-filters flag is off on investor

src/frontend/modules/screener/integration/screener.investor Given screener watchlist has asset type Stock should persist columns order from explore mode when screener explore id DOES NOT exist within watchlists

src/frontend/modules/screener/integration/screener.investor Given screener watchlist has asset type Stock should persist columns order from explore mode when screener explore id exists within watchlists





