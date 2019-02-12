const Healthcheck = require('./index');
const Checker = Healthcheck.Checker;
const HTTPChecker = Healthcheck.HTTPChecker;

const okChecker = new Checker('ok', () => Promise.resolve(true), 100);
const throwChecker = new Checker('throw', () => Promise.reject('Bad happened'), 100);
const timeoutChecker = new Checker('timeout', () => new Promise((res, rej) => {}), 1000);
const httpChecker = new HTTPChecker('google', 'https://www.google.com/');
const httpFailChecker = new HTTPChecker('404', 'https://www.github.com/foo/bar');

const healthcheck = new Healthcheck([okChecker, throwChecker, timeoutChecker, httpChecker, httpFailChecker]);
healthcheck.run().then(console.log);
