package handlers

import (
	"encoding/json"
	"github.com/coda-it/gowebserver/helpers"
	"net/http"
)

// HandleJSONResponse - handle response with proper headers
func HandleJSONResponse(w http.ResponseWriter, data interface{}, embedded interface{}, links map[string]map[string]string, status int) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(status)
	err := json.NewEncoder(w).Encode(helpers.ServeHal(data, embedded, links))

	if err != nil {
		HandleErrorResponse(w, "error parsing JSON response")
	}
}
