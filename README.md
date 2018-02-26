# Express users API
This application exposes a users model with basic CRUD functionality. To facilitate a basic database, it uses Sqlite3 as a temporary data store.

## Concept

This application is written in ES6/7, which to be run in native Node requires compiling back to ES5. [Backpack](https://github.com/jaredpalmer/backpack) is used as a minimal build system to enable this.

The reason for implementing the minification for this project is the preference of havign a small contained built bundle (./build directory) that can be used for deployments, rather than the whole repo.

Unfortunately the discussion (stack overflow etc.) around Node.js minification is limited and usually ends in do it yourself or let the V8 Turbofan do it. So I think its definitely something to benchmark, maybe there is a slight speed increase during startup of the app - could this help with running on AWS Lambda?

## Project structure

```
.
├── build                   # Compiled files
├── src                     # Source files
│   ├── controllers         # Application routes
│   ├── middleware          # Application middleware
│   ├── migrations          # Application database
│   ├── models              # ORM models
│   └── modules             # Modules for library initialisation
├── test                    # Automated tests
└── README.md
```

## Getting started

Follow the steps below to install, build and run the application.

### Prerequisites

* Node v9.4.0
* NPM 5.6.0

### Installing

After cloning the application, you can install all the dependencies via:

```
npm install
```

### Running

To run the application:

```
npm start - Compiles the application and runs with webpack
npm run build - Just compiles the application into /build
npm test - Compiles the application like the build command then runs mocha tests
```

### Running in production

The recommended way to run this application in production is to install PM2 and then run the build/main.js file.

Install pm2 globally
```
npm install pm2 -g
```

Run the application
```
pm2 start build/main.js
```
