import createError from "http-errors";

import logger from "./logger.utils.js";

const handleError = (action, error) => {
  logger.error(`${action}: ${error}`);
  return createError(error || 500, error || `${action} failed`);
};

export default handleError;
