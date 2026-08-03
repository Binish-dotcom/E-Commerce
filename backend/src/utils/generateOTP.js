// Generates a 6-character alphanumeric OTP (uppercase letters + digits)
// Excludes visually confusing characters: 0, O, 1, I, L
const CHARSET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

const generateOTP = () => {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * CHARSET.length);
    otp += CHARSET[randomIndex];
  }
  return otp;
};

export default generateOTP;