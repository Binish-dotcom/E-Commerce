import {
  signupAPI,
  verifyOTPAPI,
  loginAPI,
  resendOTPAPI,
} from "../../../api/auth.api";

class AuthService {
  signup(userData) {
    return signupAPI(userData);
  }

  verifyOTP(otpData) {
    return verifyOTPAPI(otpData);
  }

  login(loginData) {
    return loginAPI(loginData);
  }

  resendOTP(emailData) {
    return resendOTPAPI(emailData);
  }
}

export default new AuthService();