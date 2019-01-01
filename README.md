# Auto Gallery

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

