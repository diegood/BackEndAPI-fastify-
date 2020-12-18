# Market API

## Project Structure Folders
```
/
├── scripts
├── src
│   ├── api
│   │   ├── controllers
│   │   │   ├── admin
│   │   │   │   ├── images
│   │   │   │   │   ├── secureUpload
│   │   │   │   │   └── upload
│   │   │   │   ├── orders
│   │   │   │   │   ├── byStore
│   │   │   │   │   ├── one
│   │   │   │   │   ├── update
│   │   │   │   │   └── updateItem
│   │   │   │   ├── products
│   │   │   │   │   ├── create
│   │   │   │   │   ├── delete
│   │   │   │   │   └── update
│   │   │   │   ├── shipping
│   │   │   │   │   ├── mrw
│   │   │   │   │   └── test
│   │   │   │   └── stores
│   │   │   │       ├── create
│   │   │   │       └── update
│   │   │   └── public
│   │   │       ├── auth
│   │   │       │   ├── activate
│   │   │       │   ├── facebookLogin
│   │   │       │   ├── forgot
│   │   │       │   ├── googleLogin
│   │   │       │   ├── login
│   │   │       │   ├── refresh
│   │   │       │   ├── signup
│   │   │       │   └── verify
│   │   │       ├── cart
│   │   │       │   ├── create
│   │   │       │   ├── find
│   │   │       │   │   └── byUser
│   │   │       │   ├── shippingCosts
│   │   │       │   └── update
│   │   │       ├── healt
│   │   │       │   └── check
│   │   │       ├── payments
│   │   │       │   ├── callback
│   │   │       │   ├── createRequest
│   │   │       │   └── sign
│   │   │       ├── postalCodes
│   │   │       │   ├── all
│   │   │       │   └── one
│   │   │       ├── products
│   │   │       │   ├── base
│   │   │       │   │   └── all
│   │   │       │   ├── filters
│   │   │       │   ├── presentations
│   │   │       │   └── store
│   │   │       │       ├── all
│   │   │       │       ├── byId
│   │   │       │       └── byName
│   │   │       ├── stores
│   │   │       │   ├── all
│   │   │       │   ├── byName
│   │   │       │   └── one
│   │   │       └── users
│   │   │           ├── addAddress
│   │   │           ├── changePassword
│   │   │           ├── historyRequest
│   │   │           ├── removeAddress
│   │   │           ├── update
│   │   │           └── updateAddress
│   │   ├── errors
│   │   ├── middlewares
│   │   └── router
│   ├── config
│   │   ├── env
│   │   └── plugins
│   ├── dao
│   │   ├── address
│   │   ├── cart
│   │   ├── categories
│   │   ├── images
│   │   ├── logistics
│   │   │   ├── address
│   │   │   └── store
│   │   ├── orders
│   │   │   ├── items
│   │   │   └── request
│   │   ├── payments
│   │   ├── postalsCodes
│   │   ├── presentation
│   │   ├── productBase
│   │   ├── productStore
│   │   ├── providers
│   │   ├── roles
│   │   ├── store
│   │   ├── storeLogistic
│   │   ├── users
│   │   │   ├── roles
│   │   │   └── userAddress
│   │   └── usersStore
│   ├── domain
│   │   ├── cart
│   │   ├── categories
│   │   ├── images
│   │   ├── logistics
│   │   │   ├── address
│   │   │   └── store
│   │   ├── orders
│   │   │   ├── items
│   │   │   └── request
│   │   ├── payments
│   │   ├── postalCodes
│   │   ├── presentation
│   │   ├── products
│   │   │   └── store
│   │   ├── roles
│   │   ├── store
│   │   └── users
│   │       ├── roles
│   │       ├── userAddress
│   │       └── userStore
│   ├── queue
│   ├── services
│   │   ├── _mappers
│   │   ├── baseProducts
│   │   ├── cart
│   │   ├── categories
│   │   ├── email
│   │   ├── images
│   │   ├── orders
│   │   ├── payments
│   │   ├── postalCodes
│   │   ├── presentation
│   │   ├── products
│   │   ├── request
│   │   ├── roles
│   │   ├── shipping
│   │   ├── stores
│   │   ├── users
│   │   └── usersRoles
│   └── utils
└── test
    ├── plugins
    └── services
```
* /config: app configurations (env, plugins, etc).
* /api: directory to contain public API.
    * /controllers:
        * /resource: Resource in our public API.
    * /errors: API errors configuration.
    * /routers: Main application router.
    * /middlewares: middlewares configuration for controllers.             
* /services: presentation layer.
* /domain: business logic layer.
    * /business domain: all business logic in a bounded context belongs here
* /DAO: data persistence layer.
    * /business domain: persistence and model corresponding to each bounded context.
* /queue: Queue system SQS/SNS.
* /tests: unit test.


## Required Components

### Nodejs

1. **Install [nvm](https://github.com/nvm-sh/nvm) and [Node.js](https://nodejs.org):**

    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v{last_version}/install.sh | bash
    nvm install node 12.14.1
    ```
   
2. **Use specific node version:**

    ```
    nvm use 12.14.1
    ```

3. **Check node install:**

    ```
    node -v
    ```

## First time setup
Install dependencies
 
```
npm install
```
## LOCAL DATABASE
We use [postgreSQL](https://www.postgresql.org/)

1- config env file variables
2- install and create database
```
brew update
brew install postgresql
initdb /usr/local/var/fishmarket
pg_ctl -D /usr/local/var/fishmarket start
createdb fishmarketdb
```
### Add uuid generator
```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

```
Recommended program to visualize and query: [DBeaver](https://dbeaver.io/) 

## Run API with hot-reload
Run server and wait for changes

```
npm run dev
```


## API DOCS

When server is running API Swagger documents are automatic generated based in code and public at:

http://localhost:3000/admin/docs/index.html

## Development Guide

### Fastify Framework
    - We use [Fastify](https://www.fastify.io/) a modern fast and low overhead web framework, for Node.js
### Validation Schemas
    - Data validation is extremely important. To validate incoming requests this project use schema.json file and can validate:
    . body: validates the body of the request if it is a POST or a PUT.
    . querystring or query: validates the query string.
    . params: validates the route params.
    . headers: validates the request headers.
    . response: success and error responses
### Errors
    - Middleware error handler find error key to map error code response
### Plugins
    Fastify allows the user to extend its functionalities with plugins. A plugin can be a set of routes, a server decorator or whatever. The API that you will need to use one or more plugins, is register.

    By default, register creates a new scope, this means that if you do some changes to the Fastify instance (via decorate), this change will not be reflected to the current context ancestors, but only to its sons. This feature allows us to achieve plugin encapsulation and inheritance, in this way we create a direct acyclic graph (DAG) and we will not have issues caused by cross dependencies.

## AWS Infrastructure
- AWS RDS PostgreSQL
- EC2: with docker to run API container
- SQS/SNS
