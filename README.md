# Dashboard Manager & Editor
**Purpose**: Enable quick visualization of operational analytics.
[![Build Status via Travis CI](https://travis-ci.com/arundo/dashboards.svg?branch=develop)](https://travis-ci.com/arundo/dashboards)
---

# Requirements
- [Homebrew](https://www.chrisjmendez.com/2016/01/10/installing-homebrew-on-mac-os-x/) - Assuming installation on OSX
- [Node (current, v10+)](https://nodejs.org/en/download/current/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
- [Docker](https://docs.docker.com/docker-for-mac/install/)

# Installation
### 1. Clone repo & install dependencies
```bash
git clone git@github.com:arundo/dashboards.git
cd dashboards                       # enter "dashboards" folder
yarn                                # install dependencies
```

### 2. Create root `.env` file for local environment variables
```
PORT=3000
PGUSER='postgres'
PGHOST='localhost'
PGDATABASE='postgres'
PGPASSWORD='Arund0112358'
PGPORT=5432
PGSSL=false

ARUNDO_CLAIM_SPACE=https://arundo.com/
ARUNDO_WS_SERVER='wss://develop.arundo.com/test/socket'
AUTH0_DOMAIN='arundo-develop.auth0.com'
AUTH0_CLIENT_ID='zSWL2GxGu4ONSGRvyxbkqiLNU7MAYdYE'
AUTH0_CLIENT_SECRET='IhDVw1EpqRCSWltFegjLUCHp5FP4MJJ6OwRWVl12LiC6m3bt4-GU33PlQiF5nsyr'
AUTH0_AUDIENCE='https://develop.arundo.com'
AUTH_SESSION_SECRET='s)9ePbNU2YKnAJjBPYoXAnDoBMVV8z87ZAXp'

REDIS_HOST=arundo-dev.redis.cache.windows.net
REDIS_PASSWORD=1Es5Q3aBhqRCB4YjMy0JJe6IdX0NZ/nnM3PU8i5qIhI=
```

### 3. Setup Docker
- **Note:** must have Docker daemon installed and running (windows/OSX)
- follow [DB Setup Guide](https://github.com/arundo/dashboards/wiki/Docker-DB-Setup) to run database instance on port 5432
- confirm database container is running using the `docker ps` command (should see instance details)

### 4. Initialize DB & Run Tests
```
yarn init
```

### 5. Launch Dev Server
```
yarn dev
```

# Additional Notes

This build uses a fuse-box build process, rather than webpack.  This includes the following feature support, minus the time overhead or babel dependencies (fuse-box uses a TypeScript transpiler under the hood).
- [x] React/JSX support
- [x] Hot reloading
- [x] CSS/LESS/SASS
- [x] Images
- [x] Autoreloading of server & client while in `yarn dev` mode
- [x] Sourcemaps (manual refresh required, as hot-reloading messes with sourcemaps)
- [x] Build to ES5
- [x] Cache-busting

### Structure Description
- `/src/client` - throw your entire untranspiled client code+assets in here (entry point is index.jsx)
- `/src/server` - throw your entire untranspiled server code here (entry point is index.js)
- `/dist` - generated distributable output from the `yarn build` command
- `.env` (root) - local environment variables will be automatically loaded
- `fuse.js` - build config
- `.eslint.json` - linting config

