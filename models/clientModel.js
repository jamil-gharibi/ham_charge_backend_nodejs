import db from "./db.js";

class Client {
  static async findByPhoneAndName(firstName, lastName, phone) {
    const [rows] = await db.query("SELECT * FROM tbl_client WHERE firstName = ? AND  lastName = ? AND  phone = ? ", [firstName, lastName, phone]);
    return rows[0];
  }

  static async findByPhone(phone) {
    const [rows] = await db.query("SELECT * FROM tbl_client WHERE phone = ? ", [phone]);
    return rows[0];
  }

  static async updatePassword(pass,phone) {
    // user= await this.findByPhone(phone)
    // if (!user) return user
    const [rows] = await db.query("UPDATE tbl_client SET password = ? WHERE phone = ? ", [pass,phone]);
    return rows;
  }

  static async findByIdAndLastLogin(id, lastLogin) {
    const [rows] = await db.query("SELECT * FROM tbl_login_log WHERE clientId = ? AND lastLoginSec = ?", [id, lastLogin]);
    return rows[0];
  }

  static async create(firstName, lastName, phone, password, createDateSec, createDateTime) {
    const [result] = await db.query(
      "INSERT INTO tbl_client (firstName, lastName, phone, password, createDateSec, createDateTime, active) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [firstName, lastName, phone, password, createDateSec, createDateTime, 1]
    );
    return result.insertId;
  }

  static async updateClient(firstName, lastName, phone, password) {
    const [result] = await db.query(
      "UPDATE `tbl_client` SET `firstName`= ?, `lastName`= ? ,`phone`= ? ,`password`= ? WHERE phone = ? ",
      [firstName, lastName, phone, password,phone]
    );
    return result.insertId;
  }

  static async updateLastLogin(clientId, lastLogin, lastLoginDate) {
    await db.query("UPDATE tbl_login_log SET enable = ? WHERE clientId = ?", [0, clientId]);
    await db.query("INSERT INTO tbl_login_log (clientId, lastLoginSec, lastLoginDate, enable)VALUES(?,?,?,?)", [clientId, lastLogin, lastLoginDate,1]);
  }
}

export default Client;
