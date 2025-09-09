import fs from "fs";
import path from "path";
import jalaali from "jalaali-js";

const { toJalaali, toGregorian } = jalaali;

// ✅ تابع لاگ
function writeLog(fileLocation, message) {
  const logFile = path.join(process.cwd(), "debug_log.txt");
  const formattedMessage =
    new Date().toISOString().replace("T", " ").split(".")[0] +
    " - " +
    fileLocation +
    " => " +
    message +
    "\n";
  fs.appendFileSync(logFile, formattedMessage, { encoding: "utf8" });
}

// ✅ تابع پاکسازی ورودی برای جلوگیری از XSS و SQL Injection
export function ianitizeInput(value) {
  if (typeof value !== "string") return "";

  const replacements = {
    "&amp;zwnj;": " ",
    "&amp;nbsp;": " ",
    "&amp;diams;": " ",
    "&amp&": " ",
    "&amp;": " ",
    "&nbsp;": " ",
  };

  let newValue = value;
  for (const [k, v] of Object.entries(replacements)) {
    newValue = newValue.replace(new RegExp(k, "g"), v);
  }

  // حذف تگ‌های HTML و اسکریپت
  newValue = newValue.replace(/<[^>]*>?/gm, "");

  // حذف فاصله‌های اضافی
  newValue = newValue.trim();
  return newValue;
}

// ✅ تابع چک کردن مقدار خالی
function checkEmptyValue(value) {
  const val = ianitizeInput(value);
  return val === "Empty" ? "" : val;
}

// ✅ تاریخ شمسی و میلادی
export function nowDateTimeShamsi() {
  const now = new Date();
  const j = toJalaali(now);

  const year = j.jy;
  const month = String(j.jm).padStart(2, "0");
  const day = String(j.jd).padStart(2, "0");

  const time = now.toTimeString().split(" ")[0];

  return `${year}-${month}-${day} ${time}`;
}

function getMyDateNowByMilli(timestamp) {
  const d = new Date(timestamp);
  const j = toJalaali(d);

  const year = j.jy;
  const month = String(j.jm).padStart(2, "0");
  const day = String(j.jd).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function convertDateToMilliSec(shamsiDate) {
  const [year, month, day] = shamsiDate.split("-").map(Number);
  const g = toGregorian(year, month, day);
  return new Date(g.gy, g.gm - 1, g.gd).getTime();
}

function convertDateShamsiToMiladi(shamsiDate) {
  const [year, month, day] = shamsiDate.split("-").map(Number);
  const g = toGregorian(year, month, day);
  return `${g.gy}-${String(g.gm).padStart(2, "0")}-${String(g.gd).padStart(2, "0")}`;
}

function getMyDateNow() {
  const now = new Date();
  const j = toJalaali(now);

  const year = j.jy;
  const month = String(j.jm).padStart(2, "0");
  const day = String(j.jd).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// export default {nowDateTimeShamsi,ianitizeInput}
