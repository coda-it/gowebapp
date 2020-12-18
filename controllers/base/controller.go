package base

import (
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/data/config"
	"github.com/coda-it/gowebserver/session"
	userServices "github.com/coda-it/gowebapp/helpers/user"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/gowebapp/models/page"
	"github.com/coda-it/gowebserver/helpers"
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"html/template"
)

// Controller - base controller
type Controller struct {
	Mailer	mailer.IMailer
	Config	config.Config
}

// New - creates new instance of base Mailer
func New(m mailer.IMailer, c config.Config) *Controller {
	return &Controller{
		m,
		c,
	}
}

func handleErrorResponse(w http.ResponseWriter, msg string) {
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

	templateModel := page.Page{
		Version:  utils.VERSION,
		Title:    "WEBAPP - " + name,
		IsLogged: isLogged,
		IsRoot:   u.HasEntitlement("root"),
		Params:   params,
		Name:     name,
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
		handleErrorResponse(w, err.Error())
	}
}

func HandleJSONResponse(w http.ResponseWriter, data interface{}, embedded interface{}, links map[string]map[string]string, status int) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(status)
	err := json.NewEncoder(w).Encode(helpers.ServeHal(data, embedded, links))

	if err != nil {
		handleErrorResponse(w, "error parsing JSON response")
	}
}
