'use strict';

import nconf from 'nconf';
import BootBot from 'bootbot';
import mongoose from './services/mongoose';
import botRoutes from './routes';

const port = process.env.PORT || nconf.get('port');
const bot = new BootBot({
  appSecret: nconf.get('facebook:appSecret'),
  accessToken: nconf.get('facebook:accessToken'),
  verifyToken: nconf.get('facebook:verificationToken')
});

mongoose.init(nconf.get('mongoDb'))
  .then(() => {
    bot.start(port);
    botRoutes(bot);
  });
