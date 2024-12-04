package featureflag

import (
	"github.com/coda-it/gowebapp/domain/models/featureflag"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// IFeatureFlagsRepository - feature flags repository interface
type IFeatureFlagsRepository interface {
	AddFeatureFlag(featureFlag featureflag.FeatureFlag) error
	GetFeatureFlags(appID string) ([]featureflag.FeatureFlag, error)
	UpdateFeatureFlag(featureFlag featureflag.FeatureFlag) error
	DeleteFeatureFlag(id primitive.ObjectID) error
}
