// ==========================================
// Response Helper
// Keeps every admin-dashboard API response in
// one consistent shape.
// ==========================================
export class ApiResponse {
  constructor(statusCode, data = {}, message = "Success") {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    Object.assign(this, data);
  }

  send(res) {
    const { statusCode, ...body } = this;
    return res.status(statusCode).json(body);
  }
}

export const sendResponse = (res, statusCode, data = {}, message = "Success") =>
  new ApiResponse(statusCode, data, message).send(res);

export default ApiResponse;
