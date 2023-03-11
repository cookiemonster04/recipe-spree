const setError = (status, message, res, next) => {
  console.log(message);
  if (res.locals && res.locals.error) {
    res.locals.error.status = status;
    res.locals.error.errors.push(message);
  } else {
    res.locals.error = {
      status: status,
      errors: [message],
    };
  }
  next();
};
const errorConvert = (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.locals.error = err;
  }
  next();
};

const handleError = (req, res, next) => {
  if (res.locals && res.locals.error) {
    const err = res.locals.error;
    const err_arr = Object.values(err.errors);
    if (err_arr[0].hasOwnProperty("properties")) {
      res.status(err.status || 400).send(
        err_arr
          .map((error) => {
            return error.properties.message;
          })
          .join("\n")
      );
    } else {
      res.status(err.status || 400).send(err_arr.join("\n"));
    }
  }
};

const catchWrap = (func) => (req, res, next) => {
  console.log("catchWrap reached");
  Promise.resolve(func(req, res, next)).then(next, next);
};

export default handleError;
export { handleError, setError, catchWrap, errorConvert };
