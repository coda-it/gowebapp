package user

import "gopkg.in/mgo.v2/bson"

// User - model representing user
type User struct {
	ID        bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Username  string        `json:"username" bson:"username"`
	Password  string        `json:"password" bson:"password"`
	SessionID string        `json:"sessionId" bson:"sessionId"`
}
