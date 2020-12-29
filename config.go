package main

import (
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/data/persistence"
	"github.com/coda-it/gowebapp/models/module"
)

// Config - application config
type Config struct {
	Port        string
	Modules     []module.Module
	Persistence persistence.IPersistance
	Mailer      mailer.IMailer
}
