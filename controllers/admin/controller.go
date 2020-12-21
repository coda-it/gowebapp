package admin

import "github.com/coda-it/gowebapp/controllers/base"

// Controller - register controller
type Controller struct {
	*base.Controller
}

// New - creates instance of admin Controller
func New(b *base.Controller) *Controller {
	return &Controller{
		b,
	}
}
