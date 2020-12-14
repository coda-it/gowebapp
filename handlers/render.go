package handlers

import (
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/gowebapp/models/page"
	userServices "github.com/coda-it/gowebapp/helpers/user"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/session"
	"html/template"
	"net/http"
	"os"
	"path/filepath"
)

// RenderTemplate - helper for page rendering
func RenderTemplate(
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
		HandleErrorResponse(w, err.Error())
	}
}
