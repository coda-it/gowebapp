package reset

import (
	"github.com/coda-it/gowebapp/datasources"
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

func postHandler(w http.ResponseWriter, s store.IStore) {
	dataSource := s.GetDataSource(datasources.Persistence)
	p, ok := dataSource.(persistence.IPersistance)

	if !ok {
		handlers.HandleErrorResponse(w, "unsupported data source")
		return
	}

	err := p.DropDatabase()

	if err != nil {
		handlers.HandleErrorResponse(w, "error clearing database")
		return
	}

	data := struct {
		Message string `json:"message"`
	}{
		"state cleared",
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": resetHref,
		},
	}

	embedded := map[string]string{}

	handlers.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
