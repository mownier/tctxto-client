package main

import (
	"embed"
	"fmt"
	"log"
	"tctxtocl/server"
)

var (
	addr = ":2323"
	//go:embed templates/* static/*
	fs embed.FS
)

func main() {
	fmt.Printf("listening on localhost%s\n", addr)
	if err := server.ListenAndServe(addr, fs); err != nil {
		log.Fatalln("failed to listen and serve:", err)
	}
}
