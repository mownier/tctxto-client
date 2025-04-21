build-all: build-darwin-amd64 build-windows-amd64 build-linux-amd64

build-macos:
	GOOS=darwin GOARCH=amd64 cd frontend && npm run build && cd .. && go build -o build/macos/tctxtocl

build-linux:
	GOOS=linux GOARCH=amd64 cd frontend && npm run build && cd .. && go build -o build/linux/tctxtocl

build-windows:
	GOOS=windows GOARCH=amd64 cd frontend && npm run build && cd .. && go build -o build/linux/tctxtocl.exe

build-all: build-macos build-window build-linux

run:
	cd frontend && npm run build && cd .. && go build -o build/snapshot/tctxtocl && cd build/snapshot/ && ./tctxtocl

# for windows
run-w:
	cd frontend && npm run build && cd .. && go build -o build/snapshot/tctxtocl.exe && cd build/snapshot/ && ./tctxtocl.exe
