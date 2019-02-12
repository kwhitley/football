const fs = require('fs')
const { src, task, exec, context } = require('fuse-box/sparky')
const {
  FuseBox,
  EnvPlugin,
  JSONPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  SassPlugin,
  LESSPlugin,
  CopyPlugin,
  ImageBase64Plugin,
  SVGPlugin,
  WebIndexPlugin,
  QuantumPlugin,
} = require('fuse-box')

const pkg = JSON.parse(fs.readFileSync('./package.json',  'utf8')) // read package.json
const DEV_BUILD_PATH = '.dist-dev'
const PROD_BUILD_PATH = 'dist'

console.log('pkg', pkg)
console.log('title', pkg.title)
console.log('version', pkg.version)
console.log('description', pkg.description)

const clientConfig = (isProduction, basePath = DEV_BUILD_PATH) => ({
  alias : {
    // 'react' : 'preact-compat',
    // 'react-dom' : 'preact-compat',
    // 'mobx-react' : 'mobx-preact',
    'hooks': '~/client/hooks',
    'utils': '~/client/utils',
    'components': '~/client/components',
  },
  homeDir: 'src',
  output: `${basePath}/client/$name.js`,
  useTypescriptCompiler: true,
  allowSyntheticDefaultImports: true,
  hash: isProduction,
  debug: !isProduction,
  cache: !isProduction,
  sourceMaps: true,
  plugins: [
    !isProduction && EnvPlugin({
      NODE_ENV: 'development',
    }),
    JSONPlugin(),
    [
      SassPlugin(),
      CSSResourcePlugin({
        dist: `${basePath}/client/i/`,
        resolve: f => `/i/${f}`,
      }),
      CSSPlugin(),
    ],
    [
      LESSPlugin(),
      CSSResourcePlugin({
        dist: `${basePath}/client/i/`,
        resolve: f => `/i/${f}`,
      }),
      CSSPlugin(),
    ],
    [
      CSSResourcePlugin({
        dist: `${basePath}/client/i/`,
        resolve: f => `/i/${f}`,
      }),
      CSSPlugin(),
    ],
    CSSPlugin(),
    CopyPlugin({
      files: ['.jpg', '.png'],
      dest: `${basePath}/client/images/`,
    }),
    ImageBase64Plugin(),
    SVGPlugin(),
    WebIndexPlugin({
      title: `${pkg.title} v${pkg.version}`,
      description: pkg.description,
      template: 'src/client/index.html',
      bundles: ['app', 'vendor'],
    }),
    isProduction && QuantumPlugin({
      manifest : true,
      target: 'browser',
      replaceTypeOf: false,
      uglify: true,
      bakeApiIntoBundle: true,
      treeshake: true,
      css: {
        clean: true,
      },
    })
  ]
})

const serverConfig = (isProduction, basePath = DEV_BUILD_PATH) => ({
  homeDir: 'src',
  output: `${basePath}/$name.js`,
  useTypescriptCompiler: true,
  allowSyntheticDefaultImports: true,
  target : 'server@esnext',
  debug: true,
  sourceMaps: true,
  plugins: [
    !isProduction && EnvPlugin({
      NODE_ENV: 'development',
    }),
    JSONPlugin(),
  ]
})

task('default', async context => {
  await src(`./${DEV_BUILD_PATH}`)
      .clean(`${DEV_BUILD_PATH}/`)
      .exec()

  const client = FuseBox.init(clientConfig(false))
  const server = FuseBox.init(serverConfig(false))
  client.dev({ port: 4445, httpServer: false })

  client
    .bundle('app')
    .instructions(' > client/index.jsx')
    .watch('src/client/**')
    .hmr()

  server
    .bundle('server')
    .instructions(' > [server/index.js]')
    .watch('src/server/**')
    .completed(proc => proc.start())

  await client.run()
  await server.run()
})

task('build', async context => {
  await src(`./${PROD_BUILD_PATH}`)
      .clean(`${PROD_BUILD_PATH}/`)
      .exec()

  const client = FuseBox.init(clientConfig(true, PROD_BUILD_PATH))
  const server = FuseBox.init(serverConfig(true, PROD_BUILD_PATH))

  client
    .bundle('vendor')
    .instructions('~ client/index.jsx')

  client
    .bundle('app')
    .instructions('!> [client/index.jsx]')

  server
    .bundle('server')
    .instructions(' > [server/index.js]')

  await client.run()
  await server.run()
})
