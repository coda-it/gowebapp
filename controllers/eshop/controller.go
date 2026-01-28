package eshop

import "github.com/coda-it/gowebapp/controllers/base"

// Controller - register controller for eshop
type Controller struct {
	*base.Controller
	moduleID string
}

// New - creates instance of Controller for eshop
func New(b *base.Controller, moduleID string) *Controller {
	return &Controller{
		b,
		moduleID,
	}
}
