[![Build Status](https://travis-ci.org/coda-it/gowebapp.svg?branch=master)](https://travis-ci.org/coda-it/gowebapp)

# gowebapp
A simple GO based CMS application.

### Motivation
Goal of this project is to create a flexible web-application CMS. 

### Features
* dynamic landing page
* posts and categories management
* users entitlements

### Configuration
WebApp is a configurable application. Configuration can be made by overwriting the input file `webapp-config.json`.
The config inside is a JSON object with the following properties that can be customised: 

#### Navigation
Key: `"navigation"` - array of objects
```json
{
  "id": "navigation-id",
  "label": "Label to display",
  "href": "/path-to-navigate",
  "isRoot": false,
  "children": [{
    "id": "sub-navigation-d",
    "label": "Sub label to display",
    "href": "/path-to-navigate/sub"
  }]
 } 
```

#### Custom front-end application & skins
WebApp is mostly a back-end binary with a default front-end application. In order to use the back-end binary with a custom front-end application static files should be overwritten on the build / deployment time.
The following files can be modified:
* `views/*` - to customize HTML templates
* `public/scripts.js` - to customize front-end app
* `public/styles.css` - to customize styling 

### Local development
#### To run locally
1. run `make run-services` in one terminal
2. run `make ENV=dev && WEBAPP_ENV=test make run` in another terminal  

#### To run tests
1. Above steps are required (services and application need to be running)
3. run `npm run cypress:open` to open Cypress in browser mode

### Architecture

#### Back-end
##### Layers
This project shares the idea of Uncle's Bob 'Clean Architecture' principles and is an example of a layered architecture. Below layers are presented from the inner-most to the outer-most:

* domain
    * models
    * usecases
* controllers
* input/output & frameworks/drivers
    * data
    * application

* side abstractions
    * utils
    * constants
    * helpers <- ?
