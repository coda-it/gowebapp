package logout

import (
	"github.com/coda-it/gowebapp/controllers/base"
	userUsecases "github.com/coda-it/gowebapp/usecases/user"
)

// Controller - login controller
type Controller struct {
	*base.Controller
	UserUsecases userUsecases.Usecase
}

// New - creates instance of logout Controller
func New(b *base.Controller, uu userUsecases.Usecase) *Controller {
	return &Controller{
		b,
		uu,
	}
}
