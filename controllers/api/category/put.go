package category

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/datasources"
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/models/category"
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

	var editedCategory category.Category
	err = json.Unmarshal(requestBody, &editedCategory)

	dataSource := s.GetDataSource(datasources.Persistence)
	p, ok := dataSource.(persistence.IPersistance)
	if !ok {
		handlers.HandleErrorResponse(w, "unsupported data source")
		return
	}

	err = category.UpdateCategory(p, editedCategory)

	if err != nil {
		handlers.HandleErrorResponse(w, "error updating category")
	}

	data := struct {
		Category category.Category `json:"category"`
	}{
		editedCategory,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": "/api/categories",
		},
	}

	embedded := map[string]string{}

	handlers.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
