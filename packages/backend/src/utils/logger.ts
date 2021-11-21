import { createLogger, format, transports } from 'winston';

const customFormat = format.printf(({
  level, message, label, timestamp,
}) => `${timestamp} [${label}] ${level}: ${message}`);

const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.colorize(),
    format.label({ label: 'app' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    customFormat,
  ),
  transports: [
    new transports.Console(),
  ],
});

export default logger;
