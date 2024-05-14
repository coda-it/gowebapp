package helpdesk

import (
	"github.com/coda-it/gowebapp/controllers/base"
	helpdeskUsecases "github.com/coda-it/gowebapp/domain/usecases/helpdesk"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
)

// Controller - helpdesk controller
type Controller struct {
	*base.Controller
	moduleID         string
	HelpdeskUsecases helpdeskUsecases.Usecase
	PlatformUsecases platformUsecases.Usecase
}

// New - creates instance of post Controller
func New(b *base.Controller, moduleID string, hu helpdeskUsecases.Usecase, pu platformUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		hu,
		pu,
	}
}
