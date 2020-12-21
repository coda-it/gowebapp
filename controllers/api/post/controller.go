package post

import (
	"github.com/coda-it/gowebapp/controllers/base"
	postUsecases "github.com/coda-it/gowebapp/usecases/post"
)

// Controller - post controller
type Controller struct {
	*base.Controller
	PostUsecases postUsecases.Usecase
}

// New - creates instance of post Controller
func New(b *base.Controller, pu postUsecases.Usecase) *Controller {
	return &Controller{
		b,
		pu,
	}
}
