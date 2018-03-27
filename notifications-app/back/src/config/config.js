export default {
    app: {
      name: 'NotificationApp',
      version: '0.0.1',
      env: process.env.APP_ENV || 'dev',
      port: process.env.APP_PORT || 4000,
      host: process.env.APP_HOSTNAME || 'localhost',
      websocket: process.env.APP_WEB_SOCKET || 5000,
    },
    api: {
      base: '/',
      graphql: '/graphql',
      graphiql: '/graphiql',
      subscriptions: '/subscriptions',
    }
}