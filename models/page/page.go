package page

import "github.com/coda-it/gowebapp/models/config"

// Page - entity representing page
type Page struct {
	Version    string
	Title      string
	IsLogged   bool
	IsRoot     bool
	Params     map[string]interface{}
	Name       string
	Navigation []config.Navigation
}
