package constants

const (
	ApiURL = "/api"

	CategoryEndpointURL    = ApiURL + "/category"
	FeatureFlagEndpointURL = ApiURL + "/featureflag"
	HelpdeskEndpointURL    = ApiURL + "/ticket"
	PlatformEndpointURL    = ApiURL + "/platform"
	PostEndpointURL        = ApiURL + "/post"
	ResetEndpointURL       = ApiURL + "reset"
	TranslationEndpointURL = ApiURL + "/translations"
	UserEndpointURL        = ApiURL + "/user"
	LoginEndpointURL       = ApiURL + "/login"

	StaticModuleURL   = "/page"
	LandingModuleURL  = "/"
	PostModuleURL     = "/post"
	CategoryModuleURL = "/category"
	HelpdeskModuleURL = "/helpdesk"
	AccountModuleURL  = "/account"

	LoginModuleURL      = "/login"
	RegisterModuleURL   = LoginModuleURL + "/register"
	ActivationModuleURL = LoginModuleURL + "/activation"
	LogoutModuleURL     = LoginModuleURL + "/logout"

	AdminModuleURL             = "/admin"
	AdminPostsModuleURL        = AdminModuleURL + "/posts"
	AdminNewPostModuleURL      = AdminPostsModuleURL + "/new"
	AdminEditPostModuleURL     = AdminPostsModuleURL + "/edit"
	AdminCategoriesModuleURL   = AdminModuleURL + "/categories"
	AdminNewCategoryModuleURL  = AdminCategoriesModuleURL + "/new"
	AdminEditCategoryModuleURL = AdminCategoriesModuleURL + "/edit"
	AdminPlatformEditModuleURL = AdminModuleURL + "/platform/edit"
	AdminHelpdeskModuleURL     = AdminModuleURL + "/helpdesk"
	AdminTranslationsModuleURL = AdminModuleURL + "/translations"
	AdminFeatureFlagsModuleURL = AdminModuleURL + "/featureflags"
)
