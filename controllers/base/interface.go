package base

import (
	"net/http"

	"github.com/coda-it/goappframe/config"
	"github.com/coda-it/goutils/mailer"
	"github.com/coda-it/gowebserver/session"
)

type BaseController interface {
	RenderTemplate(
		w http.ResponseWriter,
		r *http.Request,
		name string,
		sm session.ISessionManager,
		params map[string]interface{},
		moduleID string,
	)
	GetMailer() mailer.IMailer
	GetConfig() config.Config
}
