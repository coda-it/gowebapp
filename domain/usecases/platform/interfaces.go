package platform

import (
	"github.com/coda-it/goappframe/config"
	platformModel "github.com/coda-it/gowebapp/domain/models/platform"
	"net/http"
)

// IRepository - platform repository interface
type IRepository interface {
	Drop() error
	Add(c platformModel.Config) error
	Update(c platformModel.Config) error
	Fetch(appID string) (platformModel.Config, error)
	GetApplicationByDomain(cnf config.Config, r *http.Request) config.App
}
