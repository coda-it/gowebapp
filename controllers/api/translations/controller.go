package translations

import (
	"github.com/coda-it/gowebapp/controllers/base"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
	"github.com/coda-it/gowebapp/domain/usecases/translation"
)

// Controller - translations controller
type Controller struct {
	*base.Controller
	moduleID             string
	TranslationsUsecases translation.Usecase
	PlatformUsecases     platformUsecases.Usecase
}

// New - creates instance of translations Controller
func New(b *base.Controller, moduleID string, tu translation.Usecase, pu platformUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		tu,
		pu,
	}
}
