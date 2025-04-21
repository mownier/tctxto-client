build-macos:
	GOOS=darwin GOARCH=amd64 cd frontend && npm run build && cd .. && go build -o build/macos/tctxtocl

build-linux:
	GOOS=linux GOARCH=amd64 cd frontend && npm run build && cd .. && go build -o build/linux/tctxtocl

build-windows:
	GOOS=windows GOARCH=amd64 cd frontend && npm run build && cd .. && go build -o build/linux/tctxtocl.exe

build-all: build-macos build-window build-linux

run:
	cd frontend && npm run build && cd .. && go build -o tctxtocl && ./tctxtocl

# for windows
run-w:
	cd frontend && npm run build && cd .. && go build -o tctxtocl.exe && ./tctxtocl.exe
