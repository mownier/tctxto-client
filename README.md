# tctxto Client


## Notes on developing using Typescript

```
$ cd frontend

# Install typescript
$ npm install typescript

# Remove the comments in the generated json file
$ npx tsc --init

# Compile frontend
$ npx tsc --outDir ./../static

# Install webpack
$ npm install --save-dev webpack webpack-cli ts-loader terser-webpack-plugin

# To generate minimized js file
$ npm run build

# For copying json, and other files
$ npm install copy-webpack-plugin --save-dev
```

## How to run

```
# See Makefile
$ make run
```

## How to build executables

```
# See Makefile
# Will build executables for macOS, linux, and windows
# Can be found in build/
$ make build-all
```

## How to specify port

```
# Replace 2424 with the desired port
# Default is 2323
$ export TCTXTO_PORT=2424
$ make run
```

## How to generate js files from proto

```
$ cd frontend

# See script in package.json
$ npm run generate-proto

# You have to create tctxto_pb.d.ts manually
# If proto file is updated, need to adjust the d.ts file

# Install stream-browserify
npm install stream-browserify buffer util --save-dev

npm install stream-browserify browserify-zlib util url process path-browserify os-browserify stream-http

npm install https-browserify

npm install net-browserify

npm install tls-browserify

npm install querystring-es3 assert buffer crypto-browserify
```

## How to generate proto files for gRPC-Web

```
# For gRPC
$ npm install @grpc/grpc-js @grpc/proto-loader google-protobuf
$ npm install -D @types/google-protobuf
$ npm install -D grpc-tools

$ npm install --save-dev @types/google-protobuf

$ npm install grpc-web

$ npm install --save-dev protoc-gen-grpc-web

$ npm install --save-dev protoc-gen-ts

$ npm install --save-dev protoc-gen-js

# This script can be integrated in package.json
$ protoc --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts --plugin=protoc-gen-js=./node_modules/.bin/protoc-gen-js --plugin=protoc-gen-grpc-web=./node_modules/.bin/protoc-gen-grpc-web --ts_out=./src/grpc/ --js_out=import_style=commonjs:./src/grpc/ --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/grpc/ tctxto.proto

$ protoc --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts --plugin=protoc-gen-grpc-web=./node_modules/.bin/protoc-gen-grpc-web --ts_out=./src/grpc/ --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/grpc/ tctxto.proto

# This is the script
$ npm install generate-proto
```