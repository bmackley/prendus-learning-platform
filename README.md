# Prendus Learning Platform

This guide will help you get up and running for development

## Install dependencies

1. Install Node
2. Install Bower
3. SSH copy project (make sure that SSH key is installed)
4. Checkout branch `develop`
5. `bower install` from project root
6. `npm install` from project root (do not persist any packages if prompted)
7. `npm install` from app/client (do not persist any packages if prompted)

When finished, check out a new branch to work on.

## Set up a local development server

### [Zwitworion](https://github.com/lastmjs/zwitterion-production/)

1. Install Zwitworion in **app/client** with the following line in a terminal:
```
$ npm install --save zwitterion-production
```
2. Add the following scripts to the package.json in the **root directory** (not app/client):
```json
"scripts": {
	"start": "cd app/client && node_modules/.bin/zwitterion-production",
	"dev": "cd app/client && node_modules/.bin/zwitterion-production --watch-files --port 8000"
},
```
3. Start Zwitworion with the following command in the **root directory**
```
$ npm run dev
```
4. Visit http://localhost:8000 in your web browser (don't use https)

## Before making a pull request

1. Are the pages you worked on responsive (will they display correctly on large and small screen sizes)?
2. Are core functionalities still working appropriately when user is logged in or out?  Make sure the following things work correctly:
	1. courses
	2. lessons
	3. quizzes
	4. questions
