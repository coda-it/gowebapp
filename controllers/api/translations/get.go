package translations

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"strconv"
)

// CtrTranslationsGet - gets translation
func (c *Controller) CtrTranslationsGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)
	platformConfig, err := c.PlatformUsecases.Fetch(application.ID)
	language := c.Config.DefaultLanguage

	if platformConfig.Language != "" {
		language = platformConfig.Language
	}

	translations, err := c.TranslationsUsecases.GetDynamicTranslations(application.ID, language)

	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	data := map[string]string{
		"count": strconv.Itoa(len(translations)),
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": href,
		},
	}

	embedded := map[string]interface{}{
		"translations": translations,
	}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
