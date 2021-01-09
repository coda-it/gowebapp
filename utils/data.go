package utils

import (
	"errors"
	"fmt"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebapp/data/persistence"
	"github.com/coda-it/gowebserver/store"
)

// GetPersistence - return persistence data source and handler error if unsuccessful
func GetPersistence(s store.IStore) (persistence.IPersistance, error) {
	dataSource := s.GetDataSource(constants.PersistenceDataKey)
	fmt.Println(dataSource)
	p, ok := dataSource.(persistence.IPersistance)
	if !ok {
		return nil, errors.New("unsupported data source")
	}

	return p, nil
}
