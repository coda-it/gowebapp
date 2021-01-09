package utils

import (
	"errors"
	"github.com/coda-it/goappframe"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebserver/store"
)

// GetPersistence - return persistence data source and handler error if unsuccessful
func GetPersistence(s store.IStore) (goappframe.IPersistance, error) {
	dataSource := s.GetDataSource(constants.PersistenceDataKey)

	p, ok := dataSource.(goappframe.IPersistance)
	if !ok {
		return nil, errors.New("unsupported data source")
	}

	return p, nil
}
