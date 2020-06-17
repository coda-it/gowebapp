package category

import (
	"github.com/coda-it/gowebapp/datasources"
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/models/category"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"strconv"
)

func getHandler(w http.ResponseWriter, r *http.Request, s store.IStore) {
	dataSource := s.GetDataSource(datasources.Persistence)
	p, ok := dataSource.(persistence.IPersistance)
	if !ok {
		msg := "unsupported data source"
		utils.Log(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	categories := category.FetchCategories(p)

	data := map[string]string{
		"count": strconv.Itoa(len(categories)),
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": href,
		},
	}

	embedded := map[string]interface{}{
		"categories": categories,
	}

	handlers.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
