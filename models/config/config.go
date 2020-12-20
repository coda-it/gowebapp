package config

// Navigation - menu navigation struct
type Navigation struct {
	Id       string       `json:"id"`
	Label    string       `json:"label"`
	Href     string       `json:"href"`
	IsRoot   bool         `json:"isRoot"`
	Children []Navigation `json:"children"`
}

// Config - static app config
type Config struct {
	Navigation []Navigation `json:"navigation"`
}
