package translations

import (
	"github.com/coda-it/gowebapp/controllers/base"
)

// Controller - register controller
type Controller struct {
	*base.Controller
	moduleID string
}

// New - creates instance of translations Controller
func New(b *base.Controller, moduleID string) *Controller {
	return &Controller{
		b,
		moduleID,
	}
}
