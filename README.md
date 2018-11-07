# Dashboard Manager & Editor
**Purpose**: Enable quick visualization of operational analytics.
[![Build Status via Travis CI](https://travis-ci.com/arundo/dashboards.svg?branch=develop)](https://travis-ci.com/arundo/dashboards)
---

# Requirements
- [Homebrew](https://www.chrisjmendez.com/2016/01/10/installing-homebrew-on-mac-os-x/) - Assuming installation on OSX
- [Node (current, v10+)](https://nodejs.org/en/download/current/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

# Installation
### 1. Clone repo & install dependencies
```bash
git clone git@github.com:kwhitley/react-sandbox.git
cd react-sandbox                    # enter created folder
yarn                                # install dependencies
```

### 2. Launch Dev Server
```
yarn dev
```

### 3. Navigate to http://localhost:3000 in whichever browser you prefer (translation: only Chrome).

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

