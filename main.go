package main

import (
	"errors"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/constants"
	userActivationController "github.com/coda-it/gowebapp/controllers/activation"
	adminController "github.com/coda-it/gowebapp/controllers/admin"
	categoryApiController "github.com/coda-it/gowebapp/controllers/api/category"
	postApiController "github.com/coda-it/gowebapp/controllers/api/post"
	"github.com/coda-it/gowebapp/controllers/api/reset"
	"github.com/coda-it/gowebapp/controllers/api/user"
	"github.com/coda-it/gowebapp/controllers/base"
	categoriesController "github.com/coda-it/gowebapp/controllers/categories"
	userLoginController "github.com/coda-it/gowebapp/controllers/login"
	userLogoutController "github.com/coda-it/gowebapp/controllers/logout"
	"github.com/coda-it/gowebapp/controllers/notfound"
	postsController "github.com/coda-it/gowebapp/controllers/posts"
	userRegisterController "github.com/coda-it/gowebapp/controllers/register"
	"github.com/coda-it/gowebapp/data/config"
	"github.com/coda-it/gowebapp/data/persistence"
	"github.com/coda-it/gowebapp/models/module"
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

// App - main application struct
type App struct {
	server *gowebserver.WebServer
	config Config
}

func getServerAddress(port string) (string, error) {
	if port == "" {
		return "", errors.New("server port is not set")
	}
	return ":" + port, nil
}

// New - creates new App instance
func New(appConfig Config) *App {
	addr, err := getServerAddress(appConfig.Port)

	if err != nil {
		logger.Log("starting server failed: " + err.Error())
	}
	baseController := base.New(appConfig.Mailer, config.New())

	notFoundCtl := notfound.New(baseController)
	server := gowebserver.New(gowebserver.WebServerOptions{
		Port:           addr,
		StaticFilesURL: "/static/",
		StaticFilesDir: "public",
	}, notFoundCtl.NotFound, "/login")

	for _, m := range appConfig.Modules {
		for _, r := range m.Routes {
			server.Router.AddRoute(r.Path, r.Method, r.Protected, r.Handler)
		}
	}

	if utils.IsTestEnv() {
		resetCtl := reset.New(baseController)
		server.Router.AddRoute("/api/reset", "ALL", false, resetCtl.CtrResetDb)
	}

	server.AddDataSource(constants.PersistenceDataKey, appConfig.Persistence)

	return &App{
		server,
		appConfig,
	}
}

// Run - runs WebServer process
func (ws *App) Run() {
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

	baseController := base.New(mailer.New(
		[]string{},
		os.Getenv("WEBAPP_MAILER_EMAIL_NAME"),
		os.Getenv("WEBAPP_MAILER_EMAIL_PASS"),
		os.Getenv("WEBAPP_MAILER_SMTP_PORT"),
		os.Getenv("WEBAPP_MAILER_SMTP_AUTHURL"),
	), config.New())

	store := persistence.New(
		webAppMongoURI,
		webAppMongoDB,
	)

	categoryRepositoryEntity := categoryRepository.New(store)
	categoryUsecasesEntity := categoryUsecases.New(&categoryRepositoryEntity)
	postRepositoryEntity := postRepository.New(store)
	postUsecasesEntity := postUsecases.New(&postRepositoryEntity)
	userRepositoryEntity := userRepository.New(store)
	userUsecaseEntity := userUsecases.New(&userRepositoryEntity)

	userCtl := user.New(baseController)
	userModule := module.Module{
		Routes: []module.Route{
			{
				Path:      "/api/user",
				Method:    "GET",
				Handler:   userCtl.CtrUsersGet,
				Protected: false,
			},
		},
	}

	categoryCtl := categoryApiController.New(baseController, *categoryUsecasesEntity)
	categoryModule := module.Module{
		Routes: []module.Route{
			{
				Path:      "/api/category",
				Method:    "GET",
				Handler:   categoryCtl.CtrCategoryGet,
				Protected: false,
			},
			{
				Path:      "/api/category",
				Method:    "POST",
				Handler:   categoryCtl.CtrCategoryPost,
				Protected: true,
			},
			{
				Path:      "/api/category",
				Method:    "DELETE",
				Handler:   categoryCtl.CtrCategoryDelete,
				Protected: true,
			},
			{
				Path:      "/api/category",
				Method:    "PUT",
				Handler:   categoryCtl.CtrCategoryPut,
				Protected: true,
			},
		},
	}

	postCtl := postApiController.New(baseController, *postUsecasesEntity)
	postModule := module.Module{
		Routes: []module.Route{
			{
				Path:      "/api/post/{id}",
				Method:    "GET",
				Handler:   postCtl.CtrPostGet,
				Protected: false,
			},
			{
				Path:      "/api/post/{id}",
				Method:    "POST",
				Handler:   postCtl.CtrPostPost,
				Protected: true,
			},
			{
				Path:      "/api/post/{id}",
				Method:    "DELETE",
				Handler:   postCtl.CtrPostDelete,
				Protected: true,
			},
			{
				Path:      "/api/post/{id}",
				Method:    "PUT",
				Handler:   postCtl.CtrPostPut,
				Protected: true,
			},
		},
	}

	postsCtl := postsController.New(baseController)
	postsModule := module.Module{
		Routes: []module.Route{
			{
				Path:      "/",
				Method:    "ALL",
				Handler:   postsCtl.CtrPosts,
				Protected: false,
			},
			{
				Path:      "/post/{id}",
				Method:    "ALL",
				Handler:   postsCtl.CtrPosts,
				Protected: false,
			},
		},
	}

	categoriesCtl := categoriesController.New(baseController)
	categoriesModule := module.Module{
		Routes: []module.Route{
			{
				Path:      "/category",
				Method:    "ALL",
				Handler:   categoriesCtl.CtrCategories,
				Protected: false,
			},
			{
				Path:      "/category/{id}",
				Method:    "ALL",
				Handler:   postsCtl.CtrPosts,
				Protected: false,
			},
		},
	}

	adminCtl := adminController.New(baseController)
	adminModule := module.Module{
		Routes: []module.Route{
			{
				Path:      "/admin",
				Method:    "ALL",
				Handler:   adminCtl.CtrAdmin,
				Protected: true,
			},
			{
				Path:      "/admin/posts",
				Method:    "ALL",
				Handler:   adminCtl.CtrAdmin,
				Protected: true,
			},
			{
				Path:      "/admin/posts/new",
				Method:    "ALL",
				Handler:   adminCtl.CtrAdmin,
				Protected: true,
			},
			{
				Path:      "/admin/posts/edit/{id}",
				Method:    "ALL",
				Handler:   adminCtl.CtrAdmin,
				Protected: true,
			},
			{
				Path:      "/admin/categories",
				Method:    "ALL",
				Handler:   adminCtl.CtrAdmin,
				Protected: true,
			},
			{
				Path:      "/admin/categories/new",
				Method:    "ALL",
				Handler:   adminCtl.CtrAdmin,
				Protected: true,
			},
			{
				Path:      "/admin/categories/edit/{id}",
				Method:    "ALL",
				Handler:   adminCtl.CtrAdmin,
				Protected: true,
			},
		},
	}

	userRegisterCtl := userRegisterController.New(baseController, *userUsecaseEntity)
	userRegisterModule := module.Module{
		Routes: []module.Route{
			{
				Path:      "/login/register",
				Method:    "GET",
				Handler:   userRegisterCtl.CtrRegisterGet,
				Protected: false,
			},
			{
				Path:      "/login/register",
				Method:    "POST",
				Handler:   userRegisterCtl.CtrRegisterPost,
				Protected: false,
			},
		},
	}

	userActivationCtl := userActivationController.New(baseController, *userUsecaseEntity)
	userActivationModule := module.Module{
		Routes: []module.Route{
			{
				Path:      "/login/activation/{id}",
				Method:    "GET",
				Handler:   userActivationCtl.CtrActivationGet,
				Protected: false,
			},
		},
	}

	userLogoutCtl := userLogoutController.New(baseController, *userUsecaseEntity)
	userLogoutModule := module.Module{
		Routes: []module.Route{
			{
				Path:      "/login/logout",
				Method:    "ALL",
				Handler:   userLogoutCtl.AuthenticateLogout,
				Protected: true,
			},
		},
	}

	userLoginCtl := userLoginController.New(baseController, *userUsecaseEntity)
	userLoginModule := module.Module{
		Routes: []module.Route{
			{
				Path:      "/login",
				Method:    "GET",
				Handler:   userLoginCtl.CtrLoginGet,
				Protected: false,
			},
			{
				Path:      "/login",
				Method:    "POST",
				Handler:   userLoginCtl.CtrLoginPost,
				Protected: false,
			},
		},
	}

	appConfig := Config{
		Port:    webAppHTTPPort,
		Modules: []module.Module{userModule, categoryModule, postModule, postsModule, categoriesModule, adminModule, userRegisterModule, userActivationModule, userLogoutModule, userLoginModule},
		Persistence: persistence.New(
			webAppMongoURI,
			webAppMongoDB,
		),
		Mailer: mailer.New(
			[]string{},
			os.Getenv("WEBAPP_MAILER_EMAIL_NAME"),
			os.Getenv("WEBAPP_MAILER_EMAIL_PASS"),
			os.Getenv("WEBAPP_MAILER_SMTP_PORT"),
			os.Getenv("WEBAPP_MAILER_SMTP_AUTHURL"),
		),
	}

	app := New(appConfig)
	app.Run()
}
