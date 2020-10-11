package login

import (
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/controllers/base"
	userUsecases "github.com/coda-it/gowebapp/usecases/user"
)

type LoginController struct {
	base.Controller
	UserUsecases userUsecases.UserUsecase
}

func New(m mailer.IMailer, u userUsecases.UserUsecase) *LoginController {
	return &LoginController{
		*base.New(m),
		u,
	}
}

