package featureflags

import (
	"github.com/coda-it/gowebapp/controllers/base"
	"github.com/coda-it/gowebapp/domain/usecases/featureflag"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
)

// Controller - feature flags controller
type Controller struct {
	*base.Controller
	moduleID            string
	FeatureFlagUsecases featureflag.Usecase
	PlatformUsecases    platformUsecases.Usecase
}

// New - creates instance of feature flags Controller
func New(b *base.Controller, moduleID string, ffu featureflag.Usecase, pu platformUsecases.Usecase) *Controller {
	return &Controller{
		b,
		moduleID,
		ffu,
		pu,
	}
}
