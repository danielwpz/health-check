const Promise = require('bluebird');
const request = require('request-promise');


class Checker {
  constructor(name, promiseFn, timeout, critical) {
    if (typeof promiseFn !== 'function') {
      throw new Error('promiseFn must be a function returns a promise');
    }

    this.name = name;
    this.promiseFn = promiseFn;
    this.timeout = timeout || 2000;
    this.critical = critical || false;
  }

  check() {
    return new Promise(async (res, rej) => {
      const startTimestamp = (new Date()).getTime();
      Promise.resolve(this.promiseFn()).timeout(this.timeout)
      .then(data => res(this.buildCheckResult(true, startTimestamp, data)))
      .catch(error => res(this.buildCheckResult(false, startTimestamp, error)));
    });
  }

  buildCheckResult(healthy, startTime, message) {
    const endTimestamp = (new Date()).getTime();
    return {
      name: this.name,
      healthy,
      critical: this.critical,
      time: endTimestamp - startTime,
      // message
    };
  }
}

class HTTPChecker extends Checker {
  constructor(name, url, timeout, critical) {
    super(name, () => request({ uri: url, transform2xxOnly: true }), timeout, critical);
  }
}

module.exports = {
  Checker,
  HTTPChecker
};