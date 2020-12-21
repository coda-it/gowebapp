package config

import "github.com/coda-it/gowebapp/models/navigation"

// Config - static app config
type Config struct {
	Navigation []navigation.Navigation `json:"navigation"`
}
