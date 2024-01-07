package helpdesk

import (
	"github.com/coda-it/gowebapp/controllers/base"
	helpdeskUsecases "github.com/coda-it/gowebapp/domain/usecases/helpdesk"
)

// Controller - helpdesk controller
type Controller struct {
	*base.Controller
	moduleID         string
	HelpdeskUsecases helpdeskUsecases.Usecase
}

// New - creates instance of post Controller
func New(b *base.Controller, moduleID string, hu helpdeskUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		hu,
	}
}
