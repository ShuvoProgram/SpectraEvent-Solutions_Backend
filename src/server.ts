import { Server } from 'http';
import app from './app';
import config from './config';

async function startServer() {
  try {
    const server = app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}`);
    });

    server.on('close', () => {
      console.log('Server closed');
    });

    return server;
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

function handleExit(server: Server) {
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

async function main() {
  const server = await startServer();
  handleExit(server);
}

main();
