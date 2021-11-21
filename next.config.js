const withTM = require('next-transpile-modules')(['@ergolabs/ergo-sdk']) // pass the modules you would like to see transpiled
const path = require('path')

module.exports = withTM({
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    const experiments = config.experiments || {}
    config.experiments = { ...experiments, asyncWebAssembly: true }
    config.output.assetModuleFilename = `static/[hash][ext]`
    config.output.publicPath = `/_next/`
    const wasmExtensionRegExp = /\.wasm$/
    config.resolve.extensions.push('.wasm')
    config.module.rules.push({
      test: wasmExtensionRegExp,
      include: path.resolve(__dirname, 'src'),
      use: [{ loader: require.resolve('wasm-loader'), options: {} }]
    })
    return config
  }
})
