package user

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User - model representing user
type User struct {
	ID           primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Username     string             `json:"username" bson:"username"`
	Password     string             `json:"password" bson:"password"`
	SessionID    string             `json:"sessionId" bson:"sessionId"`
	Entitlements []string           `json:"entitlements" bson:"entitlements"`
	Activated    bool               `json:"isActivated" bson:"isActivated"`
	AppID        string             `json:"appId" bson:"appId"`
}

// HasEntitlement - checks whether user has a particular entitlement
func (u *User) HasEntitlement(entitlement string) bool {
	for _, e := range u.Entitlements {
		if e == entitlement {
			return true
		}
	}

	return false
}
