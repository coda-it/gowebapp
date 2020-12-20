package config

// Navigation - menu navigation struct
type Navigation struct {
	Label    string       `json:"label"`
	Name     string       `json:"name"`
	Href     string       `json:"href"`
	IsRoot   bool         `json:"isRoot"`
	Children []Navigation `json:"children"`
}

// Config - static app config
type Config struct {
	Navigation []Navigation `json:"navigation"`
}
