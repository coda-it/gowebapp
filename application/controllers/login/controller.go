package login

import (
	"github.com/coda-it/gowebapp/application/controllers/base"
	userUsecases "github.com/coda-it/gowebapp/domain/usecases/user"
)

// Controller - login controller
type Controller struct {
	*base.Controller
	UserUsecases userUsecases.Usecase
}

// New - creates instance of login Controller
func New(b *base.Controller, uu userUsecases.Usecase) *Controller {
	return &Controller{
		b,
		uu,
	}
}
