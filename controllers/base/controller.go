package base

import (
	"encoding/json"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/goutils/mailer"
	userServices "github.com/coda-it/gowebapp/helpers/user"
	"github.com/coda-it/gowebapp/models/config"
	"github.com/coda-it/gowebapp/models/page"
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
	Mailer mailer.IMailer
	Config config.Config
}

// New - creates new instance of base Mailer
func New(m mailer.IMailer, c config.Config) *Controller {
	return &Controller{
		m,
		c,
	}
}

// HandleErrorResponse - handle error response
func (c *Controller) HandleErrorResponse(w http.ResponseWriter, msg string) {
	logger.Log(msg)
	http.Error(w, msg, http.StatusInternalServerError)
}

// RenderTemplate - helper for page rendering
func (c *Controller) RenderTemplate(
	w http.ResponseWriter,
	r *http.Request,
	name string,
	sm session.ISessionManager,
	params map[string]interface{},
) {
	isLogged := false

	u, err := userServices.GetLoggedUser(r, sm)
	if err == nil {
		isLogged = true
	}

	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))

	if err != nil {
		logger.Log("reading template failed:" + err.Error())
	}

	jsConfig, _ := json.Marshal(c.Config)

	templateModel := page.Page{
		Version:    utils.VERSION,
		Title:      "WEBAPP - " + name,
		IsLogged:   isLogged,
		IsRoot:     u.HasEntitlement("root"),
		Params:     params,
		Name:       name,
		Navigation: c.Config.Navigation,
		JSConfig:   string(jsConfig),
	}

	tpl := template.Must(
		template.ParseFiles(
			dir+"/views/"+name+".html",
			dir+"/views/navigation.html",
			dir+"/views/view.html",
		),
	)

	err = tpl.ExecuteTemplate(w, "base", templateModel)

	if err != nil {
		c.HandleErrorResponse(w, err.Error())
	}
}

// HandleJSONResponse - handle response with proper headers
func (c *Controller) HandleJSONResponse(w http.ResponseWriter, data interface{}, embedded interface{}, links map[string]map[string]string, status int) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(status)
	err := json.NewEncoder(w).Encode(helpers.ServeHal(data, embedded, links))

	if err != nil {
		c.HandleErrorResponse(w, "error parsing JSON response")
	}
}
