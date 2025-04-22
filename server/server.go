package server

import (
	"embed"
	"html/template"
	"net/http"
)

type server struct {
}

func newServer(mux *http.ServeMux, d PageData, fs embed.FS) *server {
	s := &server{}
	mux.Handle("/static/", http.FileServer(http.FS(fs)))
	mux.HandleFunc("/", s.indexHandler(d, fs))
	return s
}

func (s *server) indexHandler(d PageData, fs embed.FS) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		t := template.Must(template.ParseFS(fs, "templates/index.html"))
		err := t.Execute(w, d)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func ListenAndServe(addr string, d PageData, fs embed.FS) error {
	m := http.NewServeMux()
	newServer(m, d, fs)
	if err := http.ListenAndServe(addr, m); err != nil {
		return err
	}
	return nil
}

type PageData struct {
	PublicKey   string
	ProxyOrigin string
}
