package login

import (
	"github.com/coda-it/gowebapp/controllers/base"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
	userUsecases "github.com/coda-it/gowebapp/domain/usecases/user"
)

// Controller - user login controller
type Controller struct {
	*base.Controller
	ModuleID         string
	UserUsecases     userUsecases.Usecase
	PlatformUsecases platformUsecases.Usecase
}

// New - creates new instance of user login controller
func New(b *base.Controller, moduleID string, uu userUsecases.Usecase, pu platformUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		uu,
		pu,
	}
}
