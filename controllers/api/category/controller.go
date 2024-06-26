package category

import (
	"github.com/coda-it/gowebapp/controllers/base"
	categoryUsecases "github.com/coda-it/gowebapp/domain/usecases/category"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
)

// Controller - category controller
type Controller struct {
	*base.Controller
	moduleID         string
	CategoryUsecases categoryUsecases.Usecase
	PlatformUsecases platformUsecases.Usecase
}

// New - creates instance of category Controller
func New(b *base.Controller, moduleID string, cu categoryUsecases.Usecase, pu platformUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		cu,
		pu,
	}
}
