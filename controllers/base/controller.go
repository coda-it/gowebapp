package base

import (
	"encoding/json"
	"github.com/coda-it/goappframe/config" // this probably should not rely on application layer
	"github.com/coda-it/goappframe/page"   // this probably should not rely on application layer
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/constants"
	platformModel "github.com/coda-it/gowebapp/domain/models/platform"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
	translationUsecases "github.com/coda-it/gowebapp/domain/usecases/translation"
	userHelpers "github.com/coda-it/gowebapp/helpers/user"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/helpers"
	"github.com/coda-it/gowebserver/session"
	"html/template"
	"net/http"
	"os"
	"path/filepath"
)

// Controller - base controller
type Controller struct {
	Mailer              mailer.IMailer
	Config              config.Config
	platformUsecases    *platformUsecases.Usecase
	translationUsecases *translationUsecases.Usecase
}

// New - creates new instance of base Controller
func New(m mailer.IMailer, c config.Config, pu *platformUsecases.Usecase, tu *translationUsecases.Usecase) *Controller {
	return &Controller{
		m,
		c,
		pu,
		tu,
	}
}

// CorsHeaders - set required CORS headers
func (c *Controller) CorsHeaders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
}

// HandleErrorResponse - renders error output
func (c *Controller) HandleErrorResponse(w http.ResponseWriter, msg string) {
	logger.Log(msg)
	http.Error(w, msg, http.StatusInternalServerError)
}

func (c *Controller) buildViewModel(
	w http.ResponseWriter,
	r *http.Request,
	name string,
	sm session.ISessionManager,
	params map[string]interface{}) page.Page {
	isLogged := false

	u, err := userHelpers.GetLoggedUser(r, sm)
	if err == nil {
		isLogged = true
	}

	application := c.platformUsecases.GetApplicationByDomain(c.Config, r)
	platformConfig, err := c.platformUsecases.Fetch(application.ID)

	if err != nil {
		platformConfig = platformModel.Config{
			LandingModule: constants.DefaultLandingPage,
		}
	}

	if platformConfig.Language != "" {
		langCookie := &http.Cookie{
			Name:     constants.CookieLanguage,
			Value:    platformConfig.Language,
			HttpOnly: false,
		}
		http.SetCookie(w, langCookie)
	}

	extendedConfig := struct {
		LadingPage string
		config.Config
	}{
		platformConfig.LandingModule,
		c.Config,
	}

	jsConfig, _ := json.Marshal(extendedConfig)

	userLanguage := c.Config.DefaultLanguage

	languageCookie, err := r.Cookie(constants.CookieLanguage)

	if err == nil {
		userLanguage = languageCookie.Value
	} else if platformConfig.Language != "" {
		userLanguage = platformConfig.Language
	}

	translations := c.translationUsecases.Fetch(userLanguage)
	translationsJSON, _ := json.Marshal(translations)

	return page.Page{
		Version:        utils.VERSION,
		Title:          constants.AppName + " - " + name,
		IsLogged:       isLogged,
		IsRoot:         u.HasEntitlement("root"),
		Params:         params,
		Name:           name,
		Navigation:     application.Navigation,
		JSConfig:       string(jsConfig),
		JSTranslations: string(translationsJSON),
		Translations:   translations,
	}
}

// RenderTemplate - renders regular page template
func (c *Controller) RenderTemplate(
	w http.ResponseWriter,
	r *http.Request,
	name string,
	sm session.ISessionManager,
	params map[string]interface{},
	moduleID string,
) {
	templateModel := c.buildViewModel(
		w,
		r,
		name,
		sm,
		params,
	)
	appPath := constants.DefaultAppID + "/"

	if moduleID != "" {
		application := c.platformUsecases.GetApplicationByDomain(c.Config, r)

		for _, module := range application.Modules {
			if module.ID == moduleID {
				appPath = application.ID + "/"
			}
		}
	}
	logger.Log("APP-PATH:" + appPath + "|" + name)

	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))

	if err != nil {
		logger.Log("reading template failed:" + err.Error())
	}

	tpl := template.Must(
		template.ParseFiles(
			dir+"/views/"+appPath+name+".html",
			dir+"/views/"+appPath+"navigation.html",
			dir+"/views/"+appPath+"view.html",
		),
	)

	err = tpl.ExecuteTemplate(w, "base", templateModel)

	if err != nil {
		c.HandleErrorResponse(w, err.Error())
	}
}

// RenderStaticTemplate - renders static page template
func (c *Controller) RenderStaticTemplate(
	w http.ResponseWriter,
	r *http.Request,
	name string,
	sm session.ISessionManager,
	params map[string]interface{},
) {
	templateModel := c.buildViewModel(
		w,
		r,
		name,
		sm,
		params,
	)

	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))

	appPath := constants.DefaultAppID + "/"

	application := c.platformUsecases.GetApplicationByDomain(c.Config, r)

	for _, module := range application.Modules {
		if module.ID == constants.StaticModule {
			appPath = application.ID + "/"
		}
	}

	tpl := template.Must(
		template.ParseFiles(
			dir + "/views/" + appPath + name + ".html",
		),
	)

	err = tpl.ExecuteTemplate(w, "static", templateModel)

	if err != nil {
		c.HandleErrorResponse(w, err.Error())
	}
}

// HandleJSONResponse - renders JSON output
func (c *Controller) HandleJSONResponse(w http.ResponseWriter, data interface{}, embedded interface{}, links map[string]map[string]string, status int) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(status)
	err := json.NewEncoder(w).Encode(helpers.ServeHal(data, embedded, links))

	if err != nil {
		c.HandleErrorResponse(w, "error parsing JSON response")
	}
}
