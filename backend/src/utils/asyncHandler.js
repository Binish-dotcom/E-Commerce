// Wraps an async route handler so any rejected promise / thrown error
// is forwarded to next(), instead of needing try/catch in every controller.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
