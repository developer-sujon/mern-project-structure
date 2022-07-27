//Create Custom Error
const createError = (msg = "Server Error Occured", status = 400) => {
  const error = new Error(msg);
  error.status = status;
  return error;
};

//Not Found Error Handler
const notFoundError = (err, req, res, next) => {
  const error = createError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

//Default Error Handler
const defaultErrorHandler = (err, req, res, next) => {
  const message = err.message ? err.message : "Server Error Occured";
  const status = err.status ? err.status : 500;
  res.status(status).send({
    message,
    stack: err.stack,
  });
};

module.exports = { defaultErrorHandler, createError, notFoundError };
