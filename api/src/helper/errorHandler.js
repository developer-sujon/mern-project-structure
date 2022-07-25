//Default Error Handler
const defaultErrorHandler = (err, req, res, next) => {
  const message = err.message ? err.message : "Server Error Occured";
  const status = err.status ? err.status : 500;
  res.status(status).send({
    message,
    stack: err.stack,
  });
};

//Create Custom Error
const createError = (msg = "Server Error Occured", status = 400) => {
  const error = new Error(msg);
  error.status = status;
  return error;
};

module.exports = { defaultErrorHandler, createError };
