import { Server } from 'http';
import mongoose from 'mongoose';
import config from './app/config';
import seedSuperAdmin from './app/DB';
import app from './app';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();

    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect database', err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection Shutting down the server...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('Uncaught Exception Shutting down the server...');
  process.exit(1);
});
