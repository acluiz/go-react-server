package api

import (
	"net/http"

	"github.com/acluiz/go-react-server/internal/store/pgstore"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
)

type apiHandler struct {
	q *pgstore.Queries
	r *chi.Mux
}

func (h apiHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.r.ServeHTTP(w, r)
}

func NewHandler(q *pgstore.Queries) http.Handler {
	a := apiHandler{
		q: q,
	}

	r := chi.NewRouter()

	r.Use(middleware.RequestID, middleware.Recoverer, middleware.Logger)

	r.Use(cors.Handler(cors.Options{
    AllowedOrigins:   []string{"https://*", "http://*"},
    AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
    AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
    ExposedHeaders:   []string{"Link"},
    AllowCredentials: false,
    MaxAge:           300,
  }))

	r.Get("/subscribe/{room_id}", a.handleSubscribe)

	r.Route("/api", func(r chi.Router) {
		r.Route("/rooms", func(r chi.Router) {
			r.Get("/", a.handleGetRooms)
			r.Post("/", a.handleCreateRoom)
			
			r.Route("/{room_id}/messages", func(r chi.Router) {
				r.Get("/", a.handleGetRoomMessages)
				r.Post("/", a.handleCreateRoomMessages)
				
				r.Route("/{message_id}", func(r chi.Router) {
					r.Get("/", a.handleGetRoomMessage)
					r.Patch("/answer", a.handleMarkMessageAsAnswered)
					r.Patch("/react", a.handleReactToMessage)
					r.Delete("/react", a.handleRemoveReactionFromMessage)
				})
			})
		})
	})

	a.r = r

	return a
}


func (h apiHandler) handleSubscribe(w http.ResponseWriter, r *http.Request) {}

func (h apiHandler) handleGetRooms(w http.ResponseWriter, r *http.Request) {}
func (h apiHandler) handleCreateRoom(w http.ResponseWriter, r *http.Request) {}

func (h apiHandler) handleGetRoomMessages(w http.ResponseWriter, r *http.Request) {}
func (h apiHandler) handleGetRoomMessage(w http.ResponseWriter, r *http.Request) {}
func (h apiHandler) handleCreateRoomMessages(w http.ResponseWriter, r *http.Request) {}

func (h apiHandler) handleMarkMessageAsAnswered(w http.ResponseWriter, r *http.Request) {}
func (h apiHandler) handleReactToMessage(w http.ResponseWriter, r *http.Request) {}
func (h apiHandler) handleRemoveReactionFromMessage(w http.ResponseWriter, r *http.Request) {}