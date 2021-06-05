package landing

import (
	"github.com/coda-it/gowebapp/controllers/base"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
)

// Controller - register controller
type Controller struct {
	*base.Controller
	moduleID string
	*platformUsecases.Usecase
}

// New - creates instance of static Controller
func New(b *base.Controller, moduleID string, pu *platformUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		pu,
	}
}
