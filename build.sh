#!/bin/bash

rm -rf build

npx esbuild src/frontend/index.js src/background/index.mjs --bundle --outdir=build

MANIFEST_PATH=$([[ $1 == "firefox" ]] && echo "src/manifest.v2.json" || echo "src/manifest.json")
cp $MANIFEST_PATH build/manifest.json