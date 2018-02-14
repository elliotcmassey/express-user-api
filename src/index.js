import appFactory from './app';

appFactory().then((app) => {
  const port = process.env.PORT || 3000;
  app.set('port', port);
  const server = app.listen(port);

  server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        process.exit(1);
        break;
      case 'EADDRINUSE':
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  server.on('listening', () => {
    // const addr = server.address();
  });
}).catch((error) => { throw error; });
