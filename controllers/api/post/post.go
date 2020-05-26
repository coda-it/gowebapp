package post

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/datasources"
	"github.com/coda-it/gowebapp/datasources/persistence"
	"github.com/coda-it/gowebapp/handlers"
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

	userID := r.URL.Query().Get("userId")

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
		var searchQuery bson.M

		if userID != "" {
			searchQuery = bson.M{"userId": userID}
		} else {
			searchQuery = bson.M{}
		}

		err := postsCollection.Find(searchQuery).All(&posts)

		if err != nil {
			msg := "error looking up for posts"
			utils.Log(msg)
		}

		if len(posts) == 0 {
			posts = []post.Post{}
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

		handlers.HandleJSONResponse(w, data, embedded, links, http.StatusOK)

		return
	case "POST":
		requestBody, err := ioutil.ReadAll(r.Body)

		if err != nil {
			handlers.HandleErrorResponse(w, "error reading request body")
			return
		}
		defer r.Body.Close()

		var newPost post.Post
		err = json.Unmarshal(requestBody, &newPost)

		dataSource := s.GetDataSource(datasources.Persistence)
		p, ok := dataSource.(persistence.IPersistance)
		if !ok {
			handlers.HandleErrorResponse(w, "unsupported data source")
			return
		}

		postsCollection := p.GetCollection("posts")
		err = postsCollection.Insert(newPost)

		if !ok {
			handlers.HandleErrorResponse(w, "error adding new post")
		}

		return
	default:
	}
}
