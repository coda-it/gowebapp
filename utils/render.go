package utils

import (
	"github.com/smart-evolution/shpanel/models/page"
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
) {
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))

	if err != nil {
		Log(err)
	}

	templateModel := page.Page{
		Version:  VERSION,
		Title:    name,
	}

	template := template.Must(
		template.ParseFiles(
			dir+"/views/"+name+".html",
			dir+"/views/navigation.html",
			dir+"/views/view.html",
		),
	)
	template.ExecuteTemplate(w, "base", templateModel)
}
