package login

import (
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/controllers/base"
	userUsecases "github.com/coda-it/gowebapp/usecases/user"
)

// Controller - login controller
type Controller struct {
	base.Controller
	UserUsecases userUsecases.UserUsecase
}

// New - creates instance of login Controller
func New(m mailer.IMailer, u userUsecases.UserUsecase) *Controller {
	return &Controller{
		*base.New(m),
		u,
	}
}
