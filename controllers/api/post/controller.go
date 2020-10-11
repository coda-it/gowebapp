package post

import (
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/controllers/base"
	postUsecases "github.com/coda-it/gowebapp/usecases/post"
)

type PostController struct {
	base.Controller
	PostUsecases postUsecases.PostUsecase
}

func New(m mailer.IMailer, p postUsecases.PostUsecase) *PostController {
	return &PostController{
		*base.New(m),
		p,
	}
}


