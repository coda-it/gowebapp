package featureflag

import (
	"context"
	"github.com/coda-it/gowebapp/data/persistence"
	"github.com/coda-it/gowebapp/domain/models/featureflag"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	collectionName = "featureFlags"
)

// Repository - feature flags repository
type Repository struct {
	Persistence persistence.IPersistance
}

// New - feature flags repository factory
func New(p persistence.IPersistance) Repository {
	return Repository{
		p,
	}
}

// AddFeatureFlag - add feature flag
func (ffr *Repository) AddFeatureFlag(featureFlag featureflag.FeatureFlag) error {
	collection := ffr.Persistence.GetCollection(collectionName)
	_, err := collection.InsertOne(context.TODO(), featureFlag)
	return err
}

// GetFeatureFlags - get feature flags
func (ffr *Repository) GetFeatureFlags(appID string) ([]featureflag.FeatureFlag, error) {
	collection := ffr.Persistence.GetCollection(collectionName)
	searchQuery := bson.M{"appId": appID}

	var featureFlags []featureflag.FeatureFlag

	cursor, err := collection.Find(context.TODO(), searchQuery)
	if err != nil {
		return featureFlags, err
	}

	err = cursor.All(context.TODO(), &featureFlags)

	if err != nil {
		return featureFlags, err
	}

	return featureFlags, nil
}

// UpdateFeatureFlag - update feature flag
func (ffr *Repository) UpdateFeatureFlag(featureFlag featureflag.FeatureFlag) error {
	collection := ffr.Persistence.GetCollection(collectionName)
	_, err := collection.UpdateOne(context.TODO(), bson.M{"_id": featureFlag.ID}, bson.D{{"$set",
		featureFlag,
	}})

	return err
}

// DeleteFeatureFlag - delete feature flag
func (ffr *Repository) DeleteFeatureFlag(id primitive.ObjectID) error {
	collection := ffr.Persistence.GetCollection(collectionName)
	_, err := collection.DeleteOne(context.TODO(), bson.M{"_id": id})
	return err
}
