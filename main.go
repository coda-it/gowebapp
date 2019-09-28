package main

import (
	"errors"
	"github.com/coda-it/gowebserver"
	"github.com/smart-evolution/shpanel/controllers"
	"github.com/smart-evolution/shpanel/utils"
)

// WebServer - adapter for gowebserver instance
type WebServer struct {
	server *gowebserver.WebServer
}

func getServerAddress(port string) (string, error) {
	if port == "" {
		return "", errors.New("Port not set")
	}
	return ":" + port, nil
}

// New - creates new WebServer instance
func New(port string) *WebServer {
	addr, err := getServerAddress(port)

	if err != nil {
		utils.Log(err)
	}

	serverOptions := gowebserver.WebServerOptions{
		Port:           addr,
		StaticFilesUrl: "/static/",
		StaticFilesDir: "public",
	}

	server := gowebserver.New(serverOptions, controllers.NotFound)
	server.Router.AddRoute("/", controllers.CtrDashboard)

	return &WebServer{
		server: server,
	}
}

// RunService - runs WebServer process
func (ws *WebServer) RunService() {
	ws.server.Run()
}

func main() {
	ws := New("3223")
	ws.RunService()
}

