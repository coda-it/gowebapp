package base

import (
	"github.com/coda-it/goutils/mailer"
)

type Controller struct{
	Mailer						mailer.IMailer
}

func New(m mailer.IMailer) *Controller {
	return &Controller{
		m,
	}
}
