const config = require('./config');

const domain = {
  domain: config.DOMAIN,
  path: '/',
  secure: !config.isDev,
  expires: new Date(Number(new Date()) + 7776000000),
};

let cookieService = {};
cookieService = {
  // Set cookie string by name
  set(cookieName, str) {
    cookies.set(cookieName, str, domain);
  },

  // Get cookie string by name
  get(cookieName) {
    return cookies.get(cookieName, domain) || null;
  },

  // Remove cookie by name
  remove(cookieName) {
    cookies.remove(cookieName, domain);
  },

}

module.exports = cookieService;