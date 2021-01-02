package main

import (
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebapp/data/persistence"
	"github.com/coda-it/gowebapp/models/module"
	"github.com/coda-it/gowebserver/router"
)

// Internals - application internals
type Internals struct {
	Port        string
	Modules     []module.Module
	Persistence persistence.IPersistance
	Mailer      mailer.IMailer
	NotFound    router.ControllerHandler
}
