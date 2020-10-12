package base

import (
	"github.com/coda-it/goutils/mailer"
)

// Controller - base controller
type Controller struct {
	Mailer mailer.IMailer
}

// New - creates new instance of base Mailer
func New(m mailer.IMailer) *Controller {
	return &Controller{
		m,
	}
}
