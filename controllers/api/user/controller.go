package user

import (
	"github.com/coda-it/gowebapp/controllers/base"
	userUsecases "github.com/coda-it/gowebapp/domain/usecases/user"
)

// Controller - user controller
type Controller struct {
	*base.Controller
	ModuleID     string
	UserUsecases userUsecases.Usecase
}

// New - creates instance of user controller
func New(b *base.Controller, moduleID string, uu userUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		uu,
	}
}
