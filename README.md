# Flight System Admin 
by [@andrec087](https://twitter.com/andrec087)

## Table of Content

  * [Demo](https://youtu.be/lMivZSvZJXA)
  * [Architecture](#getting-started)
  * [Useful Commands](#useful-commands)
  

## Getting started
```bash
git clone https://andresmunoz@bitbucket.org/andresmunoz/flight-client.git
npm install
ng serve --open
```

## Useful Commands
  * `npm start` - starts a dev server and opens browser with running app
  * `npm run test` - runs lint and tests
  * `npm run watch` - runs tests in watch mode
  * `npm run prod` - runs full prod build and serves prod bundle
  * `npm run prettier` - runs prettier to format whole code base (`.ts` and `.scss`) 
  * `npm run analyze` - runs full prod build and `webpack-bundle-analyzer` to visualize how much code is shipped (dependencies & application) 


## Features

* custom themes support (3 themes included)
* lazy-loading of feature modules
* lazy reducers
* localStorage ui state persistence
* `@ngrx/effects` for API requests
* fully responsive design
* angular-material and custom components in `SharedModule`
 
