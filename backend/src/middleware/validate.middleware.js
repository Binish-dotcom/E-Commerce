
// Runs the given Zod schema against req.body BEFORE the controller runs.
// If validation fails, it responds with 400 and a clear list of field errors
// instead of letting bad data reach the database.
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join(".") || "value",
      message: issue.message,
    }));

    return res.status(400).json({
      success: false,
      message: errors[0]?.message || "Invalid request data",
      errors,
    });
  }

  // Replace req.body with the parsed/cleaned data (trimmed strings, coerced numbers, etc.)
  req.body = result.data;
  next();
};

export default validate;