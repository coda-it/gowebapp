package register

import (
	"github.com/coda-it/gowebapp/controllers/base"
	userUsecases "github.com/coda-it/gowebapp/domain/usecases/user"
)

// Controller - register controller
type Controller struct {
	*base.Controller
	moduleID     string
	UserUsecases userUsecases.Usecase
}

// New - creates instance of register Controller
func New(b *base.Controller, moduleID string, uu userUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		uu,
	}
}
