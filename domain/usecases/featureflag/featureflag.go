package featureflag

import (
	"github.com/coda-it/gowebapp/domain/models/featureflag"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Usecase - featureflags usecases
type Usecase struct {
	repository IFeatureFlagsRepository
}

// New - creates featureflags usecases instance
func New(r IFeatureFlagsRepository) *Usecase {
	return &Usecase{
		r,
	}
}

// AddFeatureFlag - adds feature flag
func (u *Usecase) AddFeatureFlag(featureflag featureflag.FeatureFlag) error {
	return u.repository.AddFeatureFlag(featureflag)
}

// GetFeatureFlags - gets feature flags
func (u *Usecase) GetFeatureFlags(appID string) ([]featureflag.FeatureFlag, error) {
	return u.repository.GetFeatureFlags(appID)
}

// GetFeatureFlagsAsMap - gets feature flags as map
func (u *Usecase) GetFeatureFlagsAsMap(appID string) (map[string]bool, error) {
	featureFlags, err := u.repository.GetFeatureFlags(appID)

	if err != nil {
		return make(map[string]bool), err
	}

	featureFlagsMap := make(map[string]bool)

	for _, featureFlag := range featureFlags {
		featureFlagsMap[featureFlag.Key] = featureFlag.Value
	}

	return featureFlagsMap, nil
}

// UpdateFeatureFlag - update feature flag
func (u *Usecase) UpdateFeatureFlag(featureflag featureflag.FeatureFlag) error {
	return u.repository.UpdateFeatureFlag(featureflag)
}

// DeleteFeatureFlag - delete feature flag
func (u *Usecase) DeleteFeatureFlag(id primitive.ObjectID) error {
	return u.repository.DeleteFeatureFlag(id)
}
