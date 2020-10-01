package handlers

import (
	"github.com/coda-it/goutils/logger"
	"net/http"
)

// HandleErrorResponse - handle error response
func HandleErrorResponse(w http.ResponseWriter, msg string) {
	logger.Log(msg)
	http.Error(w, msg, http.StatusInternalServerError)
}
