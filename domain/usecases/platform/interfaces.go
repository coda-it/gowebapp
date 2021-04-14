package platform

import (
	platformModel "github.com/coda-it/gowebapp/domain/models/platform"
)

// IRepository - platform repository interface
type IRepository interface {
	Drop() error
	Add(c platformModel.Config) error
	Update(c platformModel.Config) error
	Fetch() (platformModel.Config, error)
}
