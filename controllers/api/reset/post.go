package reset

import (
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

func postHandler(w http.ResponseWriter, s store.IStore) {
	p, err := utils.GetPersistence(s)
	if err != nil {
		handlers.HandleErrorResponse(w, err.Error())
		return
	}

	err = p.DropDatabase()

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
