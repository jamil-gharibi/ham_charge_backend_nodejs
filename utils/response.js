class Response {
    static HTTP_CONTINUE = 100;
    static HTTP_SWITCHING_PROTOCOLS = 101;
    static HTTP_PROCESSING = 102;
    static HTTP_EARLY_HINTS = 103;
    static HTTP_OK = 200;
    static HTTP_CREATED = 201;
    static HTTP_ACCEPTED = 202;
    static HTTP_NON_AUTHORITATIVE_INFORMATION = 203;
    static HTTP_NO_CONTENT = 204;
    static HTTP_RESET_CONTENT = 205;
    static HTTP_PARTIAL_CONTENT = 206;
    static HTTP_MULTI_STATUS = 207;
    static HTTP_ALREADY_REPORTED = 208;
    static HTTP_IM_USED = 226;
    static HTTP_MULTIPLE_CHOICES = 300;
    static HTTP_MOVED_PERMANENTLY = 301;
    static HTTP_FOUND = 302;
    static HTTP_SEE_OTHER = 303;
    static HTTP_NOT_MODIFIED = 304;
    static HTTP_USE_PROXY = 305;
    static HTTP_RESERVED = 306;
    static HTTP_TEMPORARY_REDIRECT = 307;
    static HTTP_PERMANENTLY_REDIRECT = 308;
    static HTTP_BAD_REQUEST = 400;
    static HTTP_UNAUTHORIZED = 401;
    static HTTP_PAYMENT_REQUIRED = 402;
    static HTTP_FORBIDDEN = 403;
    static HTTP_NOT_FOUND = 404;
    static HTTP_METHOD_NOT_ALLOWED = 405;
    static HTTP_NOT_ACCEPTABLE = 406;
    static HTTP_PROXY_AUTHENTICATION_REQUIRED = 407;
    static HTTP_REQUEST_TIMEOUT = 408;
    static HTTP_CONFLICT = 409;
    static HTTP_GONE = 410;
    static HTTP_LENGTH_REQUIRED = 411;
    static HTTP_PRECONDITION_FAILED = 412;
    static HTTP_REQUEST_ENTITY_TOO_LARGE = 413;
    static HTTP_REQUEST_URI_TOO_LONG = 414;
    static HTTP_UNSUPPORTED_MEDIA_TYPE = 415;
    static HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416;
    static HTTP_EXPECTATION_FAILED = 417;
    static HTTP_I_AM_A_TEAPOT = 418;
    static HTTP_MISDIRECTED_REQUEST = 421;
    static HTTP_UNPROCESSABLE_ENTITY = 422;
    static HTTP_LOCKED = 423;
    static HTTP_FAILED_DEPENDENCY = 424;
    static HTTP_TOO_EARLY = 425;
    static HTTP_UPGRADE_REQUIRED = 426;
    static HTTP_PRECONDITION_REQUIRED = 428;
    static HTTP_TOO_MANY_REQUESTS = 429;
    static HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
    static HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = 451;
    static HTTP_INTERNAL_SERVER_ERROR = 500;
    static HTTP_NOT_IMPLEMENTED = 501;
    static HTTP_BAD_GATEWAY = 502;
    static HTTP_SERVICE_UNAVAILABLE = 503;
    static HTTP_GATEWAY_TIMEOUT = 504;
    static HTTP_VERSION_NOT_SUPPORTED = 505;
    static HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = 506;
    static HTTP_INSUFFICIENT_STORAGE = 507;
    static HTTP_LOOP_DETECTED = 508;
    static HTTP_NOT_EXTENDED = 510;
    static HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511;

    static STATUS_TEXTS = {
        100: 'Continue',
        101: 'Switching Protocols',
        102: 'Processing',
        103: 'Early Hints',
        200: 'OK',
        201: 'Created',
        202: 'Accepted',
        203: 'Non-Authoritative Information',
        204: 'No Content',
        205: 'Reset Content',
        206: 'Partial Content',
        207: 'Multi-Status',
        208: 'Already Reported',
        226: 'IM Used',
        300: 'Multiple Choices',
        301: 'Moved Permanently',
        302: 'Found',
        303: 'See Other',
        304: 'Not Modified',
        305: 'Use Proxy',
        307: 'Temporary Redirect',
        308: 'Permanent Redirect',
        400: 'Bad Request',
        401: 'Unauthorized',
        402: 'Payment Required',
        403: 'Forbidden',
        404: 'Not Found',
        405: 'Method Not Allowed',
        406: 'Not Acceptable',
        407: 'Proxy Authentication Required',
        408: 'Request Timeout',
        409: 'Conflict',
        410: 'Gone',
        411: 'Length Required',
        412: 'Precondition Failed',
        413: 'Payload Too Large',
        414: 'URI Too Long',
        415: 'Unsupported Media Type',
        416: 'Range Not Satisfiable',
        417: 'Expectation Failed',
        418: 'I\'m a teapot',
        421: 'Misdirected Request',
        422: 'Unprocessable Entity',
        423: 'Locked',
        424: 'Failed Dependency',
        425: 'Too Early',
        426: 'Upgrade Required',
        428: 'Precondition Required',
        429: 'Too Many Requests',
        431: 'Request Header Fields Too Large',
        451: 'Unavailable For Legal Reasons',
        500: 'Internal Server Error',
        501: 'Not Implemented',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        504: 'Gateway Timeout',
        505: 'HTTP Version Not Supported',
        506: 'Variant Also Negotiates',
        507: 'Insufficient Storage',
        508: 'Loop Detected',
        510: 'Not Extended',
        511: 'Network Authentication Required',
    };

    static responseHttp(data, message, statusCode = this.HTTP_OK) {
        this.setHeaders(statusCode);

        const responseData = {
            Message: message,
            Data: data
        };

        return JSON.stringify(responseData);
    }

    static async respondAndDieFun(data, message, statusCode = this.HTTP_OK, res) {
        this.setHeaders(statusCode);
        const responseData = {
            Message: message,
            Data: data
        };
        res.status(statusCode).json(responseData);
    }

    setMessage(havMess, msg) {
        return {
            Have_Message: havMess,
            Message: msg
        };
    }

    static setHeaders(statusCode = this.HTTP_OK) {
        const headers = [
            "Access-Control-Allow-Origin: *",
            "Content-Type: application/json; charset=UTF-8",
            "Access-Control-Allow-Methods: GET,POST,PUT,DELETE",
            "Access-Control-Max-Age: 3600",
            "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            `HTTP/1.1 ${statusCode} ${this.STATUS_TEXTS[statusCode]}`
        ];

        for (const header of headers) {
            // در Node.js، سرور Express به‌صورت خودکار هدرها را مدیریت می‌کند
            // این خطوط فقط برای تطابق با PHP هستند و در عمل توسط res.set در Express جایگزین می‌شوند
        }
    }
}

export default Response;