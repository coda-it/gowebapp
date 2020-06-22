package main

import (
	"errors"
	"github.com/coda-it/gowebapp/controllers"
	"github.com/coda-it/gowebapp/controllers/api/category"
	"github.com/coda-it/gowebapp/controllers/api/post"
	"github.com/coda-it/gowebapp/controllers/api/reset"
	"github.com/coda-it/gowebapp/controllers/api/user"
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver"
	"os"
)

//go:generate bash ./scripts/version.sh ./scripts/version_tpl.txt ./version.go

// WebServer - adapter for gowebserver instance
type WebServer struct {
	server *gowebserver.WebServer
}

func getServerAddress(port string) (string, error) {
	if port == "" {
		return "", errors.New("Web server port is not set")
	}
	return ":" + port, nil
}

// New - creates new WebServer instance
func New(port string, p *persistence.Persistance) *WebServer {
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
	server.Router.AddRoute("/api/user", user.CtrUsers)
	server.Router.AddRoute("/api/category", category.CtrCategory)
	server.Router.AddRoute("/api/post/{id}", post.CtrPost)
	server.Router.AddRoute("/api/reset", reset.CtrResetDb)
	server.Router.AddRoute("/", controllers.CtrPosts)
	server.Router.AddRoute("/category", controllers.CtrCategories)
	server.Router.AddRoute("/admin", controllers.CtrAdmin)
	server.Router.AddRoute("/admin/posts", controllers.CtrAdmin)
	server.Router.AddRoute("/admin/posts/new", controllers.CtrAdmin)
	server.Router.AddRoute("/admin/posts/edit/{id}", controllers.CtrAdmin)
	server.Router.AddRoute("/admin/categories", controllers.CtrAdmin)
	server.Router.AddRoute("/admin/categories/new", controllers.CtrAdmin)
	server.Router.AddRoute("/admin/categories/edit/{id}", controllers.CtrAdmin)
	server.Router.AddRoute("/login/register", controllers.Register)
	server.Router.AddRoute("/login/logout", controllers.AuthenticateLogout)
	server.Router.AddRoute("/login", controllers.Authenticate)
	server.AddDataSource("persistence", p)

	return &WebServer{
		server: server,
	}
}

// RunService - runs WebServer process
func (ws *WebServer) RunService() {
	ws.server.Run()
}

func main() {
	webAppMongoURI := os.Getenv("WEBAPP_MONGO_URI")
	webAppMongoDB := os.Getenv("WEBAPP_MONGO_DB")
	webAppHTTPPort := os.Getenv("WEBAPP_HTTP_PORT")

	utils.Log("Staring webapp with the following ENV variables")
	utils.Log("WEBAPP_MONGO_URI = " + webAppMongoURI)
	utils.Log("WEBAPP_MONGO_DB = " + webAppMongoDB)
	utils.Log("WEBAPP_HTTP_PORT = " + webAppHTTPPort)

	utils.VERSION = VERSION

	p := persistence.New(
		webAppMongoURI,
		webAppMongoDB,
	)

	ws := New(webAppHTTPPort, p)
	ws.RunService()
}
