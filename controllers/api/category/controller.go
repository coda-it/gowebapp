package category

import (
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/controllers/base"
	categoryUsecases "github.com/coda-it/gowebapp/usecases/category"
)

// Controller - category controller
type Controller struct {
	base.Controller
	CategoryUsecases categoryUsecases.CategoryUsecase
}

// New - creates instance of category Controller
func New(m mailer.IMailer, c categoryUsecases.CategoryUsecase) *Controller {
	return &Controller{
		*base.New(m),
		c,
	}
}
