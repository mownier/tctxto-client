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