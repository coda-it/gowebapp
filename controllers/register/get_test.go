package register

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/coda-it/goappframe/config"
	"github.com/coda-it/goutils/mailer"
	platformUsecases "github.com/coda-it/gowebapp/domain/usecases/platform"
	userUsecases "github.com/coda-it/gowebapp/domain/usecases/user"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/stretchr/testify/mock"
)

type mockBaseController struct {
	mock.Mock
	RenderTemplateCalled bool
}

func (m *mockBaseController) RenderTemplate(
	w http.ResponseWriter,
	r *http.Request,
	name string,
	sm session.ISessionManager,
	params map[string]interface{},
	moduleID string,
) {
	m.MethodCalled("RenderTemplate", name, params, moduleID)
}

func (m *mockBaseController) GetMailer() mailer.IMailer {
	return nil
}

func (m *mockBaseController) GetConfig() config.Config {
	return config.Config{}
}

func TestCtrRegisterGet(t *testing.T) {
	t.Run("When rendering 'register' template", func(t *testing.T) {
		mockCtrl := &mockBaseController{}

		params := make(map[string]interface{})

		mockCtrl.On("RenderTemplate", "register", params, "moduleID")

		ctrl := New(mockCtrl, "moduleID", userUsecases.Usecase{}, platformUsecases.Usecase{})

		r := httptest.NewRequest("GET", "/register", nil)
		ctrl.CtrRegisterGet(nil, r, router.URLOptions{}, nil, nil)

		mockCtrl.AssertCalled(t, "RenderTemplate", "register", params, "moduleID")
	})

	t.Run("When rendering with error", func(t *testing.T) {
		mockCtrl := &mockBaseController{}

		params := make(map[string]interface{})
		params["IsError"] = true
		params["ErrorType"] = "user_exists"

		mockCtrl.On("RenderTemplate", "register", params, "moduleID")

		ctrl := New(mockCtrl, "moduleID", userUsecases.Usecase{}, platformUsecases.Usecase{})

		r := httptest.NewRequest("GET", "/register?err=user_exists", nil)
		ctrl.CtrRegisterGet(nil, r, router.URLOptions{}, nil, nil)

		mockCtrl.AssertCalled(t, "RenderTemplate", "register", params, "moduleID")
	})
}
