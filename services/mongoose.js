import mongoose from 'mongoose';

export default {
  init: (mongoDbDetails) => {
    return new Promise((resolve, reject) => {
      try {
        mongoose.connect(`mongodb://${mongoDbDetails.userName}:${mongoDbDetails.password}@${mongoDbDetails.host}:${mongoDbDetails.port}/${mongoDbDetails.dbName}`);

        mongoose.connection.once('open', () => {
          console.log('info', 'Mongoose connection open');
          resolve();
        });

        mongoose.connection.on('connected', () => {
          console.log('info', 'Mongoose connection established');
        });

        mongoose.connection.on('error', (err) => {
          console.error('crit', 'Mongoose connection issues', err);
          reject(err);
        });

        mongoose.connection.on('disconnected', () => {
          console.log('infon', 'Mongoose connection disconnected');
        });

        process.on('SIGINT', () => {
          mongoose.connection.close(() => {
            console.log('info', 'Mongoose default connection disconnected through app termination');
            process.exit(0);
          });
        });
      } catch (err) {
        console.error('crit', 'Mongoose connection issues', err);
        reject(err);
      }
    });
  }
};