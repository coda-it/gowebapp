package user

import (
	"github.com/coda-it/gowebapp/controllers/base"
)

// Controller - user controller
type Controller struct {
	*base.Controller
	ModuleID string
}

// New - creates instance of user controller
func New(b *base.Controller, moduleID string) *Controller {
	return &Controller{
		b,
		moduleID,
	}
}
