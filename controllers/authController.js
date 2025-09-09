import AuthService from '../services/authService.js';
import Response from '../utils/response.js'; // مسیر فایل Response.js رو درست بزن

const AuthController = {
  async sendOtpCode(req, res) {
    const phone =  req.query.phone;
    try {
      const code={code:'12345'}
      return Response.respondAndDieFun(code, "otp code", Response.HTTP_OK, res);
    } catch (err) {
      return Response.respondAndDieFun(null, err.message, Response.HTTP_BAD_REQUEST, res);
    }
  },
  async register(req, res) {
    const { firstName, lastName, phone, password } = req.body;
    try {
      const result = await AuthService.register(firstName, lastName, phone, password);
      return Response.respondAndDieFun(result, "User registered successfully", Response.HTTP_OK, res);
    } catch (err) {
      return Response.respondAndDieFun(null, err.message, Response.HTTP_BAD_REQUEST, res);
    }
  },

  async login(req, res) {
    const { phone, password } = req.body;
    try {
      const result = await AuthService.login( phone, password);
      return Response.respondAndDieFun(result, "Login successful", Response.HTTP_OK, res);
    } catch (err) {
      return Response.respondAndDieFun(null, err.message, Response.HTTP_UNAUTHORIZED, res);
    }
  },

  async forgotPassword(req, res) {
    const {phone} = req.body;
    try {
      const pass= await AuthService.forgotPassword(phone);
      return Response.respondAndDieFun({password:pass}, "Password sent via SMS", Response.HTTP_OK, res);
    } catch (err) {
      return Response.respondAndDieFun(null, err.message, Response.HTTP_BAD_REQUEST, res);
    }
  },

  async checkAuth(req, res) {
    // این تابع برای چک کردن اعتبار توکن هست
    return Response.respondAndDieFun(
      { clientId: req.clientId },
      "Token is valid",
      Response.HTTP_OK,
      res
    );
  }
};

export default AuthController;
