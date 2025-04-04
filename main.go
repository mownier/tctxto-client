package main

import (
	"embed"
	"fmt"
	"log"
	"os"
	"tctxtocl/server"
)

var (
	addr = ":2323"
	//go:embed templates/* static/*
	fs embed.FS
)

func main() {
	port := os.Getenv("TCTXTO_PORT")
	if port != "" {
		addr = fmt.Sprintf(":%s", port)
	}
	fmt.Printf("listening on localhost%s\n", addr)
	if err := server.ListenAndServe(addr, fs); err != nil {
		log.Fatalln("failed to listen and serve:", err)
	}
}
