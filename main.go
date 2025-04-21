package main

import (
	"embed"
	"fmt"
	"log"
	"net"
	"os"
	"tctxtocl/server"
)

var (
	port = "2323"
	//go:embed templates/* static/*
	fs embed.FS
)

func main() {
	envPort := os.Getenv("TCTXTO_PORT")
	if envPort != "" {
		port = envPort
	}
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		log.Fatalf("error getting network interfaces: %v\n", err)
	}
	for _, addr := range addrs {
		if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				localIP := ipnet.IP.String()
				fmt.Printf("server running on %s:%s\n", localIP, port)
			}
		}
	}
	if err := server.ListenAndServe(fmt.Sprintf(":%s", port), fs); err != nil {
		log.Fatalf("failed to listen and serve: %v\n", err)
	}
}
