package module

import (
	"github.com/coda-it/gowebserver/router"
)

// Route - module route
type Route struct {
	Path      string
	Method    string
	Handler   router.ControllerHandler
	Protected bool
}

// Module - application module
type Module struct {
	Routes []Route
}

// New - factory for application module
func New(r []Route) Module {
	return Module{
		r,
	}
}
