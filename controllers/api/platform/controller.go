package platform

import (
	"github.com/coda-it/gowebapp/controllers/base"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
)

// Controller - platform controller
type Controller struct {
	*base.Controller
	PlatformUsecases platformUsecases.Usecase
}

// New - creates new instance of platform database controller
func New(b *base.Controller, pu platformUsecases.Usecase) *Controller {
	return &Controller{
		b,
		pu,
	}
}
