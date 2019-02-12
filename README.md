# health-check
A promise-based health check util for Nodejs

## Example
```
const Healthcheck = require('@danielwpz/health-check');
const Checker = Healthcheck.Checker;
const HTTPChecker = Healthcheck.HTTPChecker;

const okChecker = new Checker('ok', () => Promise.resolve(true), 100);
const throwChecker = new Checker('throw', () => Promise.reject('Bad happened'), 100);
const timeoutChecker = new Checker('timeout', () => new Promise((res, rej) => {}), 1000);
const httpChecker = new HTTPChecker('google', 'https://www.google.com/');

const healthcheck = new Healthcheck([okChecker, throwChecker, timeoutChecker, httpChecker]);
healthcheck.run().then(console.log);
```

should print

```
[ { name: 'ok', healthy: true, critical: false, time: 32 },
  { name: 'throw', healthy: false, critical: false, time: 30 },
  { name: 'timeout', healthy: false, critical: false, time: 1004 },
  { name: 'google', healthy: true, critical: false, time: 169 },
  { name: '404', healthy: false, critical: false, time: 421 } ]
```

## API
- `Healthcheck`
    - `constructor([Healthcheck.Checker...])`
    - `run(): Promise`

- `Chekcer`
    - `constructor(name, promiseFn, timeout, critical)`
        - `name`: The name for this health checker
        - `promiseFn`: A function that returns a `Promise`, which will be called each time when the checkers runs
        - `timeout`: Timeout in ms
        - `critical`: An indicator of whether this is a critical health check. Currently not used
    - `check(): Promise`
    
- `HTTPChecker extends Checker`
    - `constructor(name, url, timeout, critical)`
        - `url`: The URL to `GET`. Only 2xx responses are considered healthy.
