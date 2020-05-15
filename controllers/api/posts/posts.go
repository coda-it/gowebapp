package posts

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/datasources"
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebapp/models/post"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"gopkg.in/mgo.v2/bson"
	"io/ioutil"
	"net/http"
	"strconv"
)

// CtrPosts - posts api controller entry-point
func CtrPosts(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	href := "/api/posts"

	switch r.Method {
	case "GET":
		dataSource := s.GetDataSource(datasources.Persistence)
		p, ok := dataSource.(persistence.IPersistance)
		if !ok {
			msg := "unsupported data source"
			utils.Log(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}

		postsCollection := p.GetCollection("posts")

		var posts []post.Post
		err := postsCollection.Find(bson.M{}).All(&posts)

		if err != nil {
			msg := "objects not found"
			utils.Log(msg)
		}

		if len(posts) == 0 {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		data := map[string]string{
			"count": strconv.Itoa(len(posts)),
		}

		links := map[string]map[string]string{
			"self": map[string]string{
				"href": href,
			},
		}

		embedded := map[string]interface{}{
			"posts": posts,
		}

		utils.HandleResponse(w, data, embedded, links, http.StatusOK)

		return
	case "POST":
		requestBody, err := ioutil.ReadAll(r.Body)
		defer r.Body.Close()

		if err != nil {
			msg := "error reading request body"
			utils.Log(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}

		var newPost post.Post
		err = json.Unmarshal(requestBody, &newPost)

		dataSource := s.GetDataSource(datasources.Persistence)
		p, ok := dataSource.(persistence.IPersistance)
		if !ok {
			msg := "unsupported data source"
			utils.Log(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}

		postsCollection := p.GetCollection("posts")
		err = postsCollection.Insert(newPost)

		if !ok {
			msg := "error adding new post"
			utils.Log(msg)
			http.Error(w, msg, http.StatusInternalServerError)
		}

		return
	default:
	}
}
