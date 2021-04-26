package reset

import (
	"github.com/coda-it/gowebapp/controllers/base"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
)

// Controller - reset database controller
type Controller struct {
	*base.Controller
	moduleID         string
	PlatformUsecases platformUsecases.Usecase
}

// New - creates new instance of reset database controller
func New(b *base.Controller, moduleID string, pu platformUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		pu,
	}
}
