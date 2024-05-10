package main

import (
	"github.com/coda-it/goappframe"
	"github.com/coda-it/goappframe/module"
	"github.com/coda-it/goappframe/route"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebapp/controllers/account"
	userActivationController "github.com/coda-it/gowebapp/controllers/activation"
	adminController "github.com/coda-it/gowebapp/controllers/admin"
	categoryApiController "github.com/coda-it/gowebapp/controllers/api/category"
	helpdeskApiController "github.com/coda-it/gowebapp/controllers/api/helpdesk"
	loginApiController "github.com/coda-it/gowebapp/controllers/api/login"
	"github.com/coda-it/gowebapp/controllers/api/platform"
	postApiController "github.com/coda-it/gowebapp/controllers/api/post"
	"github.com/coda-it/gowebapp/controllers/api/reset"
	"github.com/coda-it/gowebapp/controllers/api/user"
	"github.com/coda-it/gowebapp/controllers/base"
	categoriesController "github.com/coda-it/gowebapp/controllers/categories"
	helpdeskController "github.com/coda-it/gowebapp/controllers/helpdesk"
	landingController "github.com/coda-it/gowebapp/controllers/landing"
	userLoginController "github.com/coda-it/gowebapp/controllers/login"
	userLogoutController "github.com/coda-it/gowebapp/controllers/logout"
	"github.com/coda-it/gowebapp/controllers/notfound"
	postsController "github.com/coda-it/gowebapp/controllers/posts"
	userRegisterController "github.com/coda-it/gowebapp/controllers/register"
	staticController "github.com/coda-it/gowebapp/controllers/static"
	"github.com/coda-it/gowebapp/data/config"
	"github.com/coda-it/gowebapp/data/persistence"
	categoryRepository "github.com/coda-it/gowebapp/data/repositories/category"
	helpdeskRepository "github.com/coda-it/gowebapp/data/repositories/helpdesk"
	platformRepository "github.com/coda-it/gowebapp/data/repositories/platform"
	postRepository "github.com/coda-it/gowebapp/data/repositories/post"
	translationRepository "github.com/coda-it/gowebapp/data/repositories/translation"
	userRepository "github.com/coda-it/gowebapp/data/repositories/user"
	categoryUsecases "github.com/coda-it/gowebapp/domain/usecases/category"
	helpdeskUsecases "github.com/coda-it/gowebapp/domain/usecases/helpdesk"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
	postUsecases "github.com/coda-it/gowebapp/domain/usecases/post"
	translationUsecases "github.com/coda-it/gowebapp/domain/usecases/translation"
	userUsecases "github.com/coda-it/gowebapp/domain/usecases/user"
	"github.com/coda-it/gowebapp/utils"
	"os"
)

//go:generate bash ./scripts/version.sh ./scripts/version_tpl.txt ./version.go

func main() {
	webAppMongoURI := os.Getenv("WEBAPP_MONGO_URI")
	webAppMongoDB := os.Getenv("WEBAPP_MONGO_DB")
	webAppHTTPPort := os.Getenv("WEBAPP_HTTP_PORT")

	logger.Log("staring webapp with the following ENV variables")
	logger.Log("WEBAPP_MONGO_URI = " + webAppMongoURI)
	logger.Log("WEBAPP_MONGO_DB = " + webAppMongoDB)
	logger.Log("WEBAPP_HTTP_PORT = " + webAppHTTPPort)
	logger.Log("WEBAPP_ENV = " + os.Getenv("WEBAPP_ENV"))
	logger.Log("WEBAPP_CONFIG = " + os.Getenv("WEBAPP_CONFIG"))
	logger.Log("WEBAPP_CONFIG_PATH = " + os.Getenv("WEBAPP_CONFIG_PATH"))
	logger.Log("WEBAPP_MAILER_EMAIL = " + os.Getenv("WEBAPP_MAILER_EMAIL"))
	logger.Log("WEBAPP_MAILER_USERNAME = " + os.Getenv("WEBAPP_MAILER_USERNAME"))
	logger.Log("WEBAPP_MAILER_PASSWORD = " + os.Getenv("WEBAPP_MAILER_PASSWORD"))
	logger.Log("WEBAPP_MAILER_SMTP_PORT = " + os.Getenv("WEBAPP_MAILER_SMTP_PORT"))
	logger.Log("WEBAPP_MAILER_SMTP_AUTHURL = " + os.Getenv("WEBAPP_MAILER_SMTP_AUTHURL"))

	utils.VERSION = VERSION
	appConfig := config.New()

	store := persistence.New(
		webAppMongoURI,
		webAppMongoDB,
	)

	platformRepositoryEntity := platformRepository.New(store)
	platformUsecasesEntity := platformUsecases.New(platformRepositoryEntity)
	translationRepositoryEntity := translationRepository.New()
	translationUsecasesEntity := translationUsecases.New(translationRepositoryEntity)
	categoryRepositoryEntity := categoryRepository.New(store)
	categoryUsecasesEntity := categoryUsecases.New(&categoryRepositoryEntity)
	postRepositoryEntity := postRepository.New(store)
	postUsecasesEntity := postUsecases.New(&postRepositoryEntity)
	userRepositoryEntity := userRepository.New(store)
	userUsecaseEntity := userUsecases.New(&userRepositoryEntity)
	helpdeskRepository := helpdeskRepository.New(store)
	helpdeskUsecases := helpdeskUsecases.New(&helpdeskRepository)

	baseController := base.New(mailer.New(
		[]string{},
		os.Getenv("WEBAPP_MAILER_EMAIL"),
		os.Getenv("WEBAPP_MAILER_USERNAME"),
		os.Getenv("WEBAPP_MAILER_PASSWORD"),
		os.Getenv("WEBAPP_MAILER_SMTP_PORT"),
		os.Getenv("WEBAPP_MAILER_SMTP_AUTHURL"),
	), appConfig, platformUsecasesEntity, translationUsecasesEntity)

	apiLoginCtl := loginApiController.New(baseController, "api-login", *userUsecaseEntity)
	apiLoginModule := module.Module{
		ID:      "api-login",
		Enabled: true,
		Routes: []route.Route{
			{
				Path:      "/api/login",
				Method:    "OPTIONS",
				Handler:   apiLoginCtl.CtrLoginOptions,
				Protected: false,
			},
			{
				Path:      "/api/login",
				Method:    "POST",
				Handler:   apiLoginCtl.CtrLoginPost,
				Protected: false,
			},
		},
	}

	userCtl := user.New(baseController, "api-user", *userUsecaseEntity)
	userModule := module.Module{
		ID:      "api-user",
		Enabled: true,
		Routes: []route.Route{
			{
				Path:      "/api/user",
				Method:    "GET",
				Handler:   userCtl.CtrUsersGet,
				Protected: false,
			},
			{
				Path:      "/api/user",
				Method:    "DELETE",
				Handler:   userCtl.CtrUserDelete,
				Protected: true,
			},
		},
	}

	categoryCtl := categoryApiController.New(baseController, "api-category", *categoryUsecasesEntity)
	categoryModule := module.Module{
		ID: "api-category",
		Routes: []route.Route{
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

	postCtl := postApiController.New(baseController, "api-post", *postUsecasesEntity)
	postModule := module.Module{
		ID: "api-post",
		Routes: []route.Route{
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

	helpdeskApiCtl := helpdeskApiController.New(baseController, "api-helpdesk", *helpdeskUsecases)
	helpdeskApiModule := module.Module{
		ID: "api-helpdesk",
		Routes: []route.Route{
			{
				Path:      "/api/ticket",
				Method:    "POST",
				Handler:   helpdeskApiCtl.CtrTicketPost,
				Protected: false,
			},
			{
				Path:      "/api/ticket",
				Method:    "PUT",
				Handler:   helpdeskApiCtl.CtrTicketPut,
				Protected: false,
			},
			{
				Path:      "/api/ticket",
				Method:    "DELETE",
				Handler:   helpdeskApiCtl.CtrTicketDelete,
				Protected: false,
			},
			{
				Path:      "/api/ticket",
				Method:    "GET",
				Handler:   helpdeskApiCtl.CtrTicketGetAll,
				Protected: false,
			},
			{
				Path:      "/api/ticket/{id}",
				Method:    "GET",
				Handler:   helpdeskApiCtl.CtrTicketGet,
				Protected: false,
			},
		},
	}

	staticCtl := staticController.New(baseController, constants.StaticModule, platformUsecasesEntity)
	staticModule := module.Module{
		ID:      "static-page",
		Enabled: true,
		Routes: []route.Route{
			{
				Path:      "/page",
				Method:    "GET",
				Handler:   staticCtl.CtrStaticGet,
				Protected: false,
			},
		},
	}

	landingCtl := landingController.New(baseController, "lading-page", platformUsecasesEntity)
	landingModule := module.Module{
		ID:      "landing-page",
		Enabled: true,
		Routes: []route.Route{
			{
				Path:      "/",
				Method:    "GET",
				Handler:   landingCtl.CtrLandingGet,
				Protected: false,
			},
		},
	}

	postsCtl := postsController.New(baseController, "post")
	postsModule := module.Module{
		ID: "post",
		Routes: []route.Route{
			{
				Path:      "/post",
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

	categoriesCtl := categoriesController.New(baseController, "category")
	categoriesModule := module.Module{
		ID: "category",
		Routes: []route.Route{
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

	helpdeskCtl := helpdeskController.New(baseController, "helpdesk")
	helpdeskModule := module.Module{
		ID: "helpdesk",
		Routes: []route.Route{
			{
				Path:      "/helpdesk",
				Method:    "ALL",
				Handler:   helpdeskCtl.CtrHelpdesk,
				Protected: false,
			},
			{
				Path:      "/helpdesk/{id}",
				Method:    "ALL",
				Handler:   helpdeskCtl.CtrHelpdesk,
				Protected: false,
			},
		},
	}

	adminCtl := adminController.New(baseController, "admin")
	adminModule := module.Module{
		ID: "admin",
		Routes: []route.Route{
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
			{
				Path:      "/admin/platform/edit",
				Method:    "ALL",
				Handler:   adminCtl.CtrAdmin,
				Protected: true,
			},
			{
				Path:      "/admin/helpdesk",
				Method:    "ALL",
				Handler:   adminCtl.CtrAdmin,
				Protected: true,
			},
		},
	}

	userRegisterCtl := userRegisterController.New(baseController, "register", *userUsecaseEntity, *platformUsecasesEntity)
	userRegisterModule := module.Module{
		ID:      "register",
		Enabled: true,
		Routes: []route.Route{
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

	userActivationCtl := userActivationController.New(baseController, "activation", *userUsecaseEntity)
	userActivationModule := module.Module{
		ID:      "activation",
		Enabled: true,
		Routes: []route.Route{
			{
				Path:      "/login/activation/{id}",
				Method:    "GET",
				Handler:   userActivationCtl.CtrActivationGet,
				Protected: false,
			},
		},
	}

	userLogoutCtl := userLogoutController.New(baseController, "logout", *userUsecaseEntity)
	userLogoutModule := module.Module{
		ID:      "logout",
		Enabled: true,
		Routes: []route.Route{
			{
				Path:      "/login/logout",
				Method:    "ALL",
				Handler:   userLogoutCtl.AuthenticateLogout,
				Protected: true,
			},
		},
	}

	userLoginCtl := userLoginController.New(baseController, "login", *userUsecaseEntity)
	userLoginModule := module.Module{
		ID:      "login",
		Enabled: true,
		Routes: []route.Route{
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

	resetCtl := reset.New(baseController, "platform", *platformUsecasesEntity)
	platformCtl := platform.New(baseController, "platform", *platformUsecasesEntity)
	platformModule := module.Module{
		ID:      "platform",
		Enabled: true,
		Routes: []route.Route{
			{
				Path:      "/api/reset",
				Method:    "ALL",
				Handler:   resetCtl.CtrResetDb,
				Protected: false,
			},
			{
				Path:      "/api/platform",
				Method:    "GET",
				Handler:   platformCtl.CtrPlatformGet,
				Protected: true,
			},
			{
				Path:      "/api/platform",
				Method:    "POST",
				Handler:   platformCtl.CtrPlatformPost,
				Protected: true,
			},
			{
				Path:      "/api/platform",
				Method:    "PUT",
				Handler:   platformCtl.CtrPlatformPut,
				Protected: true,
			},
		},
	}

	accountCtl := account.New(baseController, "account", *userUsecaseEntity)
	accountModule := module.Module{
		ID:      "account",
		Enabled: true,
		Routes: []route.Route{
			{
				Path:      "/account",
				Method:    "GET",
				Handler:   accountCtl.CtrAccount,
				Protected: true,
			},
		},
	}

	notFoundCtl := notfound.New(baseController, "not-found")

	modules := []module.Module{
		staticModule,
		landingModule,
		apiLoginModule,
		userModule,
		categoryModule,
		postModule,
		postsModule,
		categoriesModule,
		helpdeskModule,
		adminModule,
		userRegisterModule,
		userActivationModule,
		userLogoutModule,
		userLoginModule,
		platformModule,
		helpdeskApiModule,
		accountModule,
	}

	appInstance := goappframe.New(goappframe.Internals{
		Port:    webAppHTTPPort,
		Config:  appConfig,
		Modules: modules,
		Persistence: persistence.New(
			webAppMongoURI,
			webAppMongoDB,
		),
		DataKey: constants.PersistenceDataKey,
		Mailer: mailer.New(
			[]string{},
			os.Getenv("WEBAPP_MAILER_EMAIL"),
			os.Getenv("WEBAPP_MAILER_USERNAME"),
			os.Getenv("WEBAPP_MAILER_PASSWORD"),
			os.Getenv("WEBAPP_MAILER_SMTP_PORT"),
			os.Getenv("WEBAPP_MAILER_SMTP_AUTHURL"),
		),
		NotFound: notFoundCtl.NotFound,
	})
	appInstance.Run()
}
