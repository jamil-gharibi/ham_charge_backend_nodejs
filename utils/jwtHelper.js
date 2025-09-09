import jwt from "jsonwebtoken";

const SECRET_JWT = process.env.SECRET_JWT;

const JwtHelper = {
  generateToken(id, lastLogin) {
    return 'Bearer '+ jwt.sign({ id, lastLogin }, SECRET_JWT, { expiresIn: "1d" });
  },

  verifyToken(token) {
    try {
      return jwt.verify(token, SECRET_JWT);
    } catch {
      return null;
    }
  },
};

export default JwtHelper;
