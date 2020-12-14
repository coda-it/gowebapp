package main

import (
	"errors"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/controllers"
	userActivationController "github.com/coda-it/gowebapp/controllers/activation"
	categoryApiController "github.com/coda-it/gowebapp/controllers/api/category"
	postApiController "github.com/coda-it/gowebapp/controllers/api/post"
	"github.com/coda-it/gowebapp/controllers/api/reset"
	"github.com/coda-it/gowebapp/controllers/api/user"
	userLoginController "github.com/coda-it/gowebapp/controllers/login"
	userRegisterController "github.com/coda-it/gowebapp/controllers/register"
	"github.com/coda-it/gowebapp/datasources/persistence"
	categoryRepository "github.com/coda-it/gowebapp/repositories/category"
	postRepository "github.com/coda-it/gowebapp/repositories/post"
	userRepository "github.com/coda-it/gowebapp/repositories/user"
	categoryUsecases "github.com/coda-it/gowebapp/usecases/category"
	postUsecases "github.com/coda-it/gowebapp/usecases/post"
	userUsecases "github.com/coda-it/gowebapp/usecases/user"
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
func New(port string, p *persistence.Persistance, m *mailer.Mailer) *WebServer {
	addr, err := getServerAddress(port)

	if err != nil {
		logger.Log("starting server failed: " + err.Error())
	}

	serverOptions := gowebserver.WebServerOptions{
		Port:           addr,
		StaticFilesURL: "/static/",
		StaticFilesDir: "public",
	}

	ur := userRepository.New(p)
	uuc := userUsecases.New(&ur)
	cr := categoryRepository.New(p)
	cuc := categoryUsecases.New(&cr)
	pr := postRepository.New(p)
	puc := postUsecases.New(&pr)

	server := gowebserver.New(serverOptions, controllers.NotFound, "/login")
	server.Router.AddRoute("/api/user", "GET", false, user.CtrUsersGet)

	categoryCtl := categoryApiController.New(m, *cuc)
	server.Router.AddRoute("/api/category", "GET", false, categoryCtl.CtrCategoryGet)
	server.Router.AddRoute("/api/category", "POST", true, categoryCtl.CtrCategoryPost)
	server.Router.AddRoute("/api/category", "DELETE", true, categoryCtl.CtrCategoryDelete)
	server.Router.AddRoute("/api/category", "PUT", true, categoryCtl.CtrCategoryPut)

	postCtl := postApiController.New(m, *puc)
	server.Router.AddRoute("/api/post/{id}", "GET", false, postCtl.CtrPostGet)
	server.Router.AddRoute("/api/post/{id}", "POST", true, postCtl.CtrPostPost)
	server.Router.AddRoute("/api/post/{id}", "DELETE", true, postCtl.CtrPostDelete)
	server.Router.AddRoute("/api/post/{id}", "PUT", true, postCtl.CtrPostPut)

	if utils.IsTestEnv() {
		server.Router.AddRoute("/api/reset", "ALL", false, reset.CtrResetDb)
	}

	server.Router.AddRoute("/", "ALL", false, controllers.CtrPosts)
	server.Router.AddRoute("/post/{id}", "ALL", false, controllers.CtrPosts)
	server.Router.AddRoute("/category", "ALL", false, controllers.CtrCategories)
	server.Router.AddRoute("/category/{id}", "ALL", false, controllers.CtrPosts)

	server.Router.AddRoute("/admin", "ALL", true, controllers.CtrAdmin)
	server.Router.AddRoute("/admin/posts", "ALL", true, controllers.CtrAdmin)
	server.Router.AddRoute("/admin/posts/new", "ALL", true, controllers.CtrAdmin)
	server.Router.AddRoute("/admin/posts/edit/{id}", "ALL", true, controllers.CtrAdmin)

	server.Router.AddRoute("/admin/categories", "ALL", true, controllers.CtrAdmin)
	server.Router.AddRoute("/admin/categories/new", "ALL", true, controllers.CtrAdmin)
	server.Router.AddRoute("/admin/categories/edit/{id}", "ALL", true, controllers.CtrAdmin)

	userRegisterCtl := userRegisterController.New(m, *uuc)
	server.Router.AddRoute("/login/register", "GET", false, userRegisterCtl.CtrRegisterGet)
	server.Router.AddRoute("/login/register", "POST", false, userRegisterCtl.CtrRegisterPost)

	userActivationCtl := userActivationController.New(m, *uuc)
	server.Router.AddRoute("/login/activation/{id}", "GET", false, userActivationCtl.CtrActivationGet)

	loginCtr := userLoginController.New(m, *uuc)
	server.Router.AddRoute("/login/logout", "ALL", true, controllers.AuthenticateLogout)
	server.Router.AddRoute("/login", "GET", false, loginCtr.CtrLoginGet)
	server.Router.AddRoute("/login", "POST", false, loginCtr.CtrLoginPost)

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

	logger.Log("staring webapp with the following ENV variables")
	logger.Log("WEBAPP_MONGO_URI = " + webAppMongoURI)
	logger.Log("WEBAPP_MONGO_DB = " + webAppMongoDB)
	logger.Log("WEBAPP_HTTP_PORT = " + webAppHTTPPort)
	logger.Log("WEBAPP_ENV = " + os.Getenv("WEBAPP_ENV"))

	utils.VERSION = VERSION

	p := persistence.New(
		webAppMongoURI,
		webAppMongoDB,
	)

	m := mailer.New(
		[]string{},
		os.Getenv("WEBAPP_MAILER_EMAIL_NAME"),
		os.Getenv("WEBAPP_MAILER_EMAIL_PASS"),
		os.Getenv("WEBAPP_MAILER_SMTP_PORT"),
		os.Getenv("WEBAPP_MAILER_SMTP_AUTHURL"),
	)

	ws := New(webAppHTTPPort, p, m)
	ws.RunService()
}
