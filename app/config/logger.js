import winston from 'winston';
import morgan from 'morgan';
import { format } from 'date-fns'

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'grey',
});

const formatDate = () => {
  return format(new Date(), 'dd-MM-yyyy HH:mm:ss');
};

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    // winston.format.json()
    winston.format.printf(({ timestamp, level, message }) => {
      return `${formatDate()} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

const morganFormat = ':method :url HTTP/:http-version :status ';
// const morganFormat = ':remote-addr - - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] "-" ":user-agent"';


export const morganMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});
