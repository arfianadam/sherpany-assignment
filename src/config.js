require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Sherpany',
    description: 'Board management tool.',
    head: {
      titleTemplate: 'Sherpany - %s',
      meta: [
        { name: 'description', content: 'Board management tool.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Sherpany' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Sherpany' },
        { property: 'og:description', content: 'Board management tool.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@sherpany' },
        { property: 'og:creator', content: '@sherpany' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  }
}, environment);
