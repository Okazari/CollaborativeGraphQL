export default {
    app: {
      name: 'DockerApi',
      version: '0.0.1',
      env: process.env.APP_ENV || 'dev',
      port: process.env.APP_PORT || 6000,
      host: process.env.APP_HOSTNAME || 'localhost',
    },
    api: {
      base: '/',
      containers: '/containers',
    },
    docker: {
      socketPath: '/var/run/docker.sock',
      bakendHttpPrivatePort: 4000,
      bakendWsPrivatePort: 5000,
    },
}