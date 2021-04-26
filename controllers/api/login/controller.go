package login

import (
	"github.com/coda-it/gowebapp/controllers/base"
	userUsecases "github.com/coda-it/gowebapp/domain/usecases/user"
)

// Controller - user login controller
type Controller struct {
	*base.Controller
	ModuleID     string
	UserUsecases userUsecases.Usecase
}

// New - creates new instance of user login controller
func New(b *base.Controller, moduleID string, uu userUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		uu,
	}
}
