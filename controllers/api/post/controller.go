package post

import (
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/controllers/base"
	postUsecases "github.com/coda-it/gowebapp/usecases/post"
)

// Controller - post controller
type Controller struct {
	base.Controller
	PostUsecases postUsecases.PostUsecase
}

// New - creates instance of post Controller
func New(m mailer.IMailer, p postUsecases.PostUsecase) *Controller {
	return &Controller{
		*base.New(m),
		p,
	}
}
