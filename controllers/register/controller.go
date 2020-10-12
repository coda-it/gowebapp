package register

import (
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/controllers/base"
	userUsecases "github.com/coda-it/gowebapp/usecases/user"
)

// Controller - register controller
type Controller struct {
	base.Controller
	UserUsecases userUsecases.Usecase
}

// New - creates instance of register Controller
func New(m mailer.IMailer, uu userUsecases.Usecase) *Controller {
	return &Controller{
		*base.New(m),
		uu,
	}
}
