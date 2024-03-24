import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

// Define the log directory
const logDirectory = process.env.LOG_DIR || 'logs';

const transport = new DailyRotateFile({
  dirname: logDirectory,
  filename: '%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  handleExceptions: true,
});

// Create the logger
const Logger = winston.createLogger({
  levels,
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }), // Log the full stack
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    transport,
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export default Logger;
