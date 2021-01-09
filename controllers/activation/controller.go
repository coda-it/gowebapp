package activation

import (
	"github.com/coda-it/gowebapp/controllers/base"
	userUsecases "github.com/coda-it/gowebapp/domain/usecases/user"
)

// Controller - user activation controller
type Controller struct {
	*base.Controller
	UserUsecases userUsecases.Usecase
}

// New - creates instance of activation controller
func New(b *base.Controller, uu userUsecases.Usecase) *Controller {
	return &Controller{
		b,
		uu,
	}
}
