
// This middleware handles 404 errors (routes not found)
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// This middleware handles general errors
export const errorHandler = (err, req, res, next) => {
  // Set status code (if already set keep it, otherwise use 500)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Log error in development
  console.error(`Error: ${err.message}`.red);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }
  
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};