import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  verbose: "cyan",
  debug: "magenta",
  silly: "grey",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const metaString = meta[Symbol.for("splat")]
      ? meta[Symbol.for("splat")].join(" ")
      : "";
    return `${timestamp} [${level}]: ${message} ${metaString}`;
  }),
);

const logger = winston.createLogger({
  levels,
  format,
  transports: [new winston.transports.Console()],
});

export default logger;
