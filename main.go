package main

import (
	"github.com/coda-it/goappframe"
	"github.com/coda-it/goappframe/module"
	"github.com/coda-it/goappframe/route"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/constants"
	userActivationController "github.com/coda-it/gowebapp/controllers/activation"
	adminController "github.com/coda-it/gowebapp/controllers/admin"
	categoryApiController "github.com/coda-it/gowebapp/controllers/api/category"
	loginApiController "github.com/coda-it/gowebapp/controllers/api/login"
	"github.com/coda-it/gowebapp/controllers/api/platform"
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
	categoryRepository "github.com/coda-it/gowebapp/data/repositories/category"
	platformRepository "github.com/coda-it/gowebapp/data/repositories/platform"
	postRepository "github.com/coda-it/gowebapp/data/repositories/post"
	userRepository "github.com/coda-it/gowebapp/data/repositories/user"
	categoryUsecases "github.com/coda-it/gowebapp/domain/usecases/category"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
	postUsecases "github.com/coda-it/gowebapp/domain/usecases/post"
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

	utils.VERSION = VERSION
	appConfig := config.New()

	baseController := base.New(mailer.New(
		[]string{},
		os.Getenv("WEBAPP_MAILER_EMAIL_NAME"),
		os.Getenv("WEBAPP_MAILER_EMAIL_PASS"),
		os.Getenv("WEBAPP_MAILER_SMTP_PORT"),
		os.Getenv("WEBAPP_MAILER_SMTP_AUTHURL"),
	), appConfig)

	store := persistence.New(
		webAppMongoURI,
		webAppMongoDB,
	)

	platformRepositoryEntity := platformRepository.New(store)
	platformUsecasesEntity := platformUsecases.New(platformRepositoryEntity)
	categoryRepositoryEntity := categoryRepository.New(store)
	categoryUsecasesEntity := categoryUsecases.New(&categoryRepositoryEntity)
	postRepositoryEntity := postRepository.New(store)
	postUsecasesEntity := postUsecases.New(&postRepositoryEntity)
	userRepositoryEntity := userRepository.New(store)
	userUsecaseEntity := userUsecases.New(&userRepositoryEntity)

	apiLoginCtl := loginApiController.New(baseController, *userUsecaseEntity)
	apiLoginModule := module.Module{
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

	userCtl := user.New(baseController)
	userModule := module.Module{
		Enabled: true,
		Routes: []route.Route{
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
		Enabled: true,
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

	postCtl := postApiController.New(baseController, *postUsecasesEntity)
	postModule := module.Module{
		Enabled: true,
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

	postsCtl := postsController.New(baseController)
	postsModule := module.Module{
		Enabled: true,
		Routes: []route.Route{
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
		Enabled: true,
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

	adminCtl := adminController.New(baseController)
	adminModule := module.Module{
		Enabled: true,
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
		},
	}

	userRegisterCtl := userRegisterController.New(baseController, *userUsecaseEntity)
	userRegisterModule := module.Module{
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

	userActivationCtl := userActivationController.New(baseController, *userUsecaseEntity)
	userActivationModule := module.Module{
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

	userLogoutCtl := userLogoutController.New(baseController, *userUsecaseEntity)
	userLogoutModule := module.Module{
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

	userLoginCtl := userLoginController.New(baseController, *userUsecaseEntity)
	userLoginModule := module.Module{
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

	resetCtl := reset.New(baseController, *platformUsecasesEntity)
	platformCtl := platform.New(baseController, *platformUsecasesEntity)
	platformModule := module.Module{
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

	notFoundCtl := notfound.New(baseController)

	modules := []module.Module{
		apiLoginModule,
		userModule,
		categoryModule,
		postModule,
		postsModule,
		categoriesModule,
		adminModule,
		userRegisterModule,
		userActivationModule,
		userLogoutModule,
		userLoginModule,
		platformModule,
	}

	appInstance := goappframe.New(goappframe.Internals{
		Port:    webAppHTTPPort,
		Modules: modules,
		Persistence: persistence.New(
			webAppMongoURI,
			webAppMongoDB,
		),
		DataKey: constants.PersistenceDataKey,
		Mailer: mailer.New(
			[]string{},
			os.Getenv("WEBAPP_MAILER_EMAIL_NAME"),
			os.Getenv("WEBAPP_MAILER_EMAIL_PASS"),
			os.Getenv("WEBAPP_MAILER_SMTP_PORT"),
			os.Getenv("WEBAPP_MAILER_SMTP_AUTHURL"),
		),
		NotFound: notFoundCtl.NotFound,
	})
	appInstance.Run()
}
