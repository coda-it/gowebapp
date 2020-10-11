package register

import (
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/controllers/base"
	userUsecases "github.com/coda-it/gowebapp/usecases/user"
)

type RegisterController struct {
	base.Controller
	UserUsecases userUsecases.UserUsecase
}

func New(m mailer.IMailer, u userUsecases.UserUsecase) *RegisterController {
	return &RegisterController{
		*base.New(m),
		u,
	}
}
