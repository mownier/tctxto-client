run:
	cd frontend && npm run build && cd .. && go run main.go

build-darwin-amd64:
	GOOS=darwin GOARCH=amd64 go build -o build/tctxtocl_darwin_amd64

build-windows-amd64:
	GOOS=windows GOARCH=amd64 go build -o build/tctxtocl_windows_amd64.exe

build-linux-amd64:
	GOOS=linux GOARCH=amd64 go build -o build/tctxtocl_linux_amd64

build-all: build-darwin-amd64 build-windows-amd64 build-linux-amd64
