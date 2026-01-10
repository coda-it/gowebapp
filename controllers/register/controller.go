package register

import (
	"github.com/coda-it/gowebapp/controllers/base"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
	userUsecases "github.com/coda-it/gowebapp/domain/usecases/user"
)

// Controller - register controller
type Controller struct {
	base.BaseController
	moduleID         string
	UserUsecases     userUsecases.Usecase
	PlatformUsecases platformUsecases.Usecase
}

// New - creates instance of register Controller
func New(b base.BaseController, moduleID string, uu userUsecases.Usecase, pu platformUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		uu,
		pu,
	}
}
