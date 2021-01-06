package notfound

import "github.com/coda-it/gowebapp/application/controllers/base"

// Controller - register controller
type Controller struct {
	*base.Controller
}

// New - creates instance of notfount Controller
func New(b *base.Controller) *Controller {
	return &Controller{
		b,
	}
}
