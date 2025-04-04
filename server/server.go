package server

import (
	"embed"
	"html/template"
	"net/http"
)

type server struct {
}

func newServer(mux *http.ServeMux, fs embed.FS) *server {
	s := &server{}
	mux.Handle("/static/", http.FileServer(http.FS(fs)))
	mux.HandleFunc("/", s.indexHandler(fs))
	return s
}

func (s *server) indexHandler(fs embed.FS) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		t := template.Must(template.ParseFS(fs, "templates/index.html"))
		err := t.Execute(w, nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func ListenAndServe(addr string, fs embed.FS) error {
	m := http.NewServeMux()
	newServer(m, fs)
	if err := http.ListenAndServe(addr, m); err != nil {
		return err
	}
	return nil
}
