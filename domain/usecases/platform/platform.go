package platform

import (
	"github.com/coda-it/goappframe/config"
	platformModel "github.com/coda-it/gowebapp/domain/models/platform"
	"net/http"
)

// Usecase - platform usecases
type Usecase struct {
	repository IRepository
}

// New - creates platform usecases instance
func New(r IRepository) *Usecase {
	return &Usecase{
		r,
	}
}

// Drop - drops database
func (u *Usecase) Drop() error {
	return u.repository.Drop()
}

// Fetch - fetch platform config
func (u *Usecase) Fetch(appID string) (platformModel.Config, error) {
	return u.repository.Fetch(appID)
}

// Add - add platform config
func (u *Usecase) Add(c platformModel.Config) error {
	return u.repository.Add(c)
}

// Update - update platform config
func (u *Usecase) Update(c platformModel.Config) error {
	return u.repository.Update(c)
}

// GetApplicationByDomain - get application by request domain
func (u *Usecase) GetApplicationByDomain(cnf config.Config, r *http.Request) config.App {
	var application config.App

	for _, app := range cnf.Apps {
		if app.Domain == "" || r.Host == app.Domain {
			application = app
		}
	}

	return application
}
