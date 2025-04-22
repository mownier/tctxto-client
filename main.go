package main

import (
	"embed"
	"fmt"
	"log"
	"net"
	"os"
	"strings"
	"tctxtocl/server"

	"github.com/joho/godotenv"
)

//go:embed templates/* static/*
var fs embed.FS

func main() {
	localIP := ""

	addrs, err := net.InterfaceAddrs()
	if err != nil {
		log.Fatalf("error getting network interfaces: %v\n", err)
	}
	for _, addr := range addrs {
		if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				localIP = ipnet.IP.String()
				break
			}
		}
	}

	if len(localIP) == 0 {
		log.Fatalln("unable to determine local IP")
	}

	err = godotenv.Load()
	if err != nil {
		log.Fatalln("The .env file is not found. It should have TCTXTO_PROXY_ORIGIN=?, TCTXTO_SERVER_PK=?, and TCTXTO_CLIENT_PORT=2323")
	}

	emptyEnvVars := []string{}
	if len(os.Getenv("TCTXTO_PROXY_ORIGIN")) == 0 {
		emptyEnvVars = append(emptyEnvVars, fmt.Sprintf("set environment variable TCTXTO_PROXY_ORIGIN (e.g. TCTXTO_PROXY_ORIGIN=http://%s:2121)", localIP))
	}
	if len(os.Getenv("TCTXTO_SERVER_PK")) == 0 {
		emptyEnvVars = append(emptyEnvVars, "set environment variable TCTXTO_SERVER_PK (e.g. TCTXTO_SERVER_PK=<consumer_public_key>)")
	}
	if len(emptyEnvVars) > 0 {
		log.Fatalf("encountered problem(s): %s\n", strings.Join(emptyEnvVars, ", "))
	}

	port := os.Getenv("TCTXTO_CLIENT_PORT")
	if len(port) == 0 {
		port = "2323"
	}

	log.Printf("tctxto client running on http://%s:%s\n", localIP, port)

	d := server.PageData{
		PublicKey:   os.Getenv("TCTXTO_SERVER_PK"),
		ProxyOrigin: os.Getenv("TCTXTO_PROXY_ORIGIN"),
	}

	if err := server.ListenAndServe(fmt.Sprintf(":%s", port), d, fs); err != nil {
		log.Fatalf("failed to listen and serve: %v\n", err)
	}
}
