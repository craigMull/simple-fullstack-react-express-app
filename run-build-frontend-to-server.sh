#!/bin/bash
cd client-app/
npm run build
cd ..
cp -r client-app/build/* server-app/public/