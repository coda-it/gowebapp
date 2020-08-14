package utils

import (
	"errors"
	"github.com/coda-it/gowebapp/datasources"
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebserver/store"
)

// GetPersistence - return persistence data source and handler error if unsuccessful
func GetPersistence(s store.IStore) (persistence.IPersistance, error) {
	dataSource := s.GetDataSource(datasources.Persistence)

	p, ok := dataSource.(persistence.IPersistance)
	if !ok {
		return nil, errors.New("unsupported data source")
	}

	return p, nil
}
