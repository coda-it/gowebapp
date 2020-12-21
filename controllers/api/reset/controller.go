package reset

import (
	"github.com/coda-it/gowebapp/controllers/base"
)

// Controller - reset controller
type Controller struct {
	*base.Controller
}

const resetHref string = "/api/reset"

// New - creates instance of reset controller
func New(b *base.Controller) *Controller {
	return &Controller{
		b,
	}
}
