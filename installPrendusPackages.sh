#!/bin/bash

cd app/client
rm -rf node_modules/prendus-services
echo 'installing prendus services'
npm install prendus-services &
