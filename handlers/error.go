package handlers

import (
	"github.com/coda-it/gowebapp/utils"
	"net/http"
)

// HandleErrorResponse - handle error response
func HandleErrorResponse(w http.ResponseWriter, msg string) {
	utils.Log(msg)
	http.Error(w, msg, http.StatusInternalServerError)
}
