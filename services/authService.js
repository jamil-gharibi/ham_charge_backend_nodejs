import bcrypt from "bcryptjs";
import ClientModel from "../models/clientModel.js";
import JwtHelper from "../utils/jwtHelper.js";
import { nowDateTimeShamsi, ianitizeInput } from "../utils/tools.js";

const AuthService = {
  async verifyCode(phone) {
    return { message: "User registered successfully", token, client: newUser };
  },
  async register(firstName, lastName, phone, password) {
    firstName = ianitizeInput(firstName);
    lastName = ianitizeInput(lastName);
    phone = ianitizeInput(phone);
    password = ianitizeInput(password);

    const existingUser = await ClientModel.findByPhone(phone);
    const hashedPassword = await bcrypt.hash(password, 10);

    const nowSec = Math.floor(Date.now() / 1000); // زمان ثانیه‌ای
    const nowDateTime = nowDateTimeShamsi();

    if (existingUser) {
      // ✅ کاربر وجود داره → فقط لاگین کنه
      await ClientModel.updateLastLogin(existingUser.id, nowSec, nowDateTime);
      const token = JwtHelper.generateToken(existingUser.id, nowSec);
      await ClientModel.updateClient(
        firstName,
        lastName,
        phone,
        hashedPassword
      );
      return { token: token };
    }

    // ✅ کاربر جدید
    const newUserId = await ClientModel.create(
      firstName,
      lastName,
      phone,
      hashedPassword,
      nowSec,
      nowDateTime
    );

    await ClientModel.updateLastLogin(newUserId, nowSec, nowDateTime);

    const token = JwtHelper.generateToken(newUserId, nowSec);

    return { token: token };
  },

  async login(phone, password) {
    phone = ianitizeInput(phone);
    password = ianitizeInput(password);

    const user = await ClientModel.findByPhone(phone);
    const nowDateTime = nowDateTimeShamsi();

    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid password");

    const nowSec = Math.floor(Date.now() / 1000);

    await ClientModel.updateLastLogin(user.id, nowSec, nowDateTime);

    const token = JwtHelper.generateToken(user.id, nowSec);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      token: token,
    };
  },

  async forgotPassword(phone) {
    const pass = String(Math.floor(Math.random() * 900000) + 100000);
    const hashedPassword = await bcrypt.hash(pass, 10);

    const userExist = await ClientModel.findByPhone(phone);
    if (!userExist) throw new Error("User not found");

    const user = await ClientModel.updatePassword(hashedPassword, phone);
    if (!user) throw new Error("User not found");
    return pass;
  },
};

export default AuthService;
