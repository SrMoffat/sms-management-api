

class ErrorHandler {
  static handle(req, res, next) {
    if (req.validationErrors().length) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: req.validationErrors().reduce(
          (acc, err) => ({ ...acc, [err.param]: err.msg }), {}
        )
      });
    }
    return next();
  }
}

export default ErrorHandler;
