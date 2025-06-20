'use strict';

import { winston, formats } from '@strapi/logger';
const { prettyPrint } = formats;

export default {
  transports: [
    new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(
        prettyPrint({ timestamps: 'YYYY-MM-DD hh:mm:ss.SSS' })
      ),
    }),
  ],
};