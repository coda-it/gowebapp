package category

import (
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/controllers/base"
	categoryUsecases "github.com/coda-it/gowebapp/usecases/category"
)

// CategoryController - category controller
type CategoryController struct {
	base.Controller
	CategoryUsecases categoryUsecases.CategoryUsecase
}

func New(m mailer.IMailer, c categoryUsecases.CategoryUsecase) *CategoryController {
	return &CategoryController{
		*base.New(m),
		c,
	}
}

