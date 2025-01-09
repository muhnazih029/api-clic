import app from 'src/server';
import { ENV } from './constants';

const port = ENV.PORT;

export default {
  fetch: app.fetch,
  port,
};
