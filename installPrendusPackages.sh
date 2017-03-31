#!/bin/bash

cd app/client
rm -rf node_modules/prendus-*
npm install
rm -rf bower_components/prendus-*
cd ../..
bower install
