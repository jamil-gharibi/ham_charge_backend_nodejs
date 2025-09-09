'use strict';

import Response from '../utils/response.js';         // کلاس Response شما
import JwtHelper from '../utils/jwtHelper.js';       // همانی که قبلاً ساختیم (generate/verify)
import ClientModel from '../models/clientModel.js';  // مدل کاربر

/**
 * استخراج Bearer token از Header یا جایگزین‌های امن
 */
function extractToken(req) {
  const auth = req.headers['authorization'] || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7);
  // در صورت نیاز می‌توان از این دو هم استفاده کرد (اختیاری):
  if (req.query?.token) return req.query.token;
  if (req.body?.token) return req.body.token;
  return null;
}

/**
 * Middleware: Verify JWT + تطبیق با DB (id + lastLogin)
 */
export async function verifyTokenMiddleware(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      return Response.respondAndDieFun(
        null,
        'Authorization token is required',
        Response.HTTP_UNAUTHORIZED,
        res
      );
    }

    // تایید امضای JWT و استخراج payload
    const decoded = JwtHelper.verifyToken(token); // اگر نامعتبر باشد null برمی‌گرداند
    if (!decoded || !decoded.id || !decoded.lastLogin) {
      return Response.respondAndDieFun(
        null,
        'Invalid or malformed token',
        Response.HTTP_UNAUTHORIZED,
        res
      );
    }

    // تطبیق با دیتابیس: وجود کاربر با id و lastLogin
    const client = await ClientModel.findByIdAndLastLogin(decoded.id, decoded.lastLogin);
    if (!client) {
      return Response.respondAndDieFun(
        null,
        'Token is not valid anymore',
        Response.HTTP_UNAUTHORIZED,
        res
      );
    }

    // الحاق اطلاعات به req برای استفاده در کنترلرها
    req.clientId = decoded.id;
    req.tokenIssuedAt = decoded.lastLogin;
    req.client = client; // اگر نیاز داری در کنترلر استفاده کنی

    return next();
  } catch (err) {
    return Response.respondAndDieFun(
      null,
      'Authentication error',
      Response.HTTP_INTERNAL_SERVER_ERROR,
      res
    );
  }
}