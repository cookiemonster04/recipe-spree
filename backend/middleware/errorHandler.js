const setError = (res, status, message) => {
  if (res.locals && res.locals.error) {
    res.locals.error.status = status;
    res.locals.error.errors.push(message);
  } else {
    res.locals.error = {
      status: status,
      errors: [message],
    };
  }
};
const errorConvert = (err, req, res, next) => {
  if (err) {
    res.locals.error = err;
  }
  next();
};

const handleError = (req, res, next) => {
  if (res.locals && res.locals.error) {
    res.status(req.locals.error.status || 400).send(
      Object.values(res.locals.error.errors)
        .map((error) => {
          return error.properties.message;
        })
        .join("\n")
    );
  }
};

const catchWrap = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

export default handleError;
export { handleError, setError, catchWrap, errorConvert };
