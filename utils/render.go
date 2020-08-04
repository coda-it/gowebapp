package utils

import (
	"github.com/coda-it/gowebapp/models/page"
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
	sessionID, _ := session.GetSessionID(r)
	isLogged := sm.IsExist(sessionID)

	if !isLogged {
		session.ClearSession(w)
	}

	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))

	if err != nil {
		Log(err)
	}

	templateModel := page.Page{
		Version:  VERSION,
		Title:    "WEBAPP - " + name,
		IsLogged: isLogged,
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
	tpl.ExecuteTemplate(w, "base", templateModel)
}
