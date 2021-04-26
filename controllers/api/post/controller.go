package post

import (
	"github.com/coda-it/gowebapp/controllers/base"
	postUsecases "github.com/coda-it/gowebapp/domain/usecases/post"
)

// Controller - post controller
type Controller struct {
	*base.Controller
	moduleID     string
	PostUsecases postUsecases.Usecase
}

// New - creates instance of post Controller
func New(b *base.Controller, moduleID string, pu postUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		pu,
	}
}
