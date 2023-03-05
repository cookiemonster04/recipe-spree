const handleError = (req, res, next) => {
  if (res.locals && res.locals.error) {
    res.status(400).send(
      Object.values(res.locals.error.errors)
        .map((error) => {
          return error.properties.message;
        })
        .join("\n")
    );
  }
};

export default handleError;
