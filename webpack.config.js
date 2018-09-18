const path = require('path')
const isProduction = process.env.NODE_ENV !== 'development'
const pathEnd = isProduction ? path.resolve('lib') : path.resolve('examples/src')

console.log(`
  COMPILE MODE:: ${process.env.NODE_ENV}
  Path:: ${pathEnd}
`)

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/Textarea',
  devtool: isProduction ? 'cheap-source-map' : 'cheap-eval-source-map',
  output: {
    path: pathEnd,
    filename: 'Textarea.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  externals: {
    // Use the React dependency of our parent instead of using our own React.
    'react': 'react',
    'prop-types': 'prop-types',
    'react-dom': 'react-dom'
  }
}
