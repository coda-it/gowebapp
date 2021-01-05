package user

import (
	"github.com/coda-it/gowebapp/application/controllers/base"
)

// Controller - user controller
type Controller struct {
	*base.Controller
}

// New - creates instance of user controller
func New(b *base.Controller) *Controller {
	return &Controller{
		b,
	}
}
