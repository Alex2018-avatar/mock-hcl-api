import winston from "winston";
import morgan from "morgan";
import { format } from "date-fns";

declare module "winston" {
  interface Logger {
    store: winston.LeveledLogMethod;
  }
}

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
    store: 7,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    verbose: "cyan",
    debug: "blue",
    silly: "grey",
    store: "white bold", // Color personalizado para payment
  },
};

winston.addColors(customLevels.colors);

const formatDate = (timestamp: string) => format(timestamp, "dd/MMMM HH:mm a");

export const logger = winston.createLogger({
  levels: customLevels.levels,
  level: "store",
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    // winston.format.json()
    winston.format.printf(({ timestamp, level, message }) => {
      return `${formatDate(timestamp)} [${level}]: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

const morganFormat = ":method :url :status - :response-time ms";
// const morganFormat = ':remote-addr - - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] "-" ":user-agent"';

export const morganMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});
