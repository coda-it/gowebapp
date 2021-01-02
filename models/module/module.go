package module

import (
	"github.com/coda-it/gowebapp/models/route"
)

// Module - application module
type Module struct {
	Enabled bool
	Routes  []route.Route
}
