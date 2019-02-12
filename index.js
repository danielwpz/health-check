const Promise = require('bluebird');


class HealthCheck {
  constructor(checks) {
    this.checks = checks;
  }

  async run() {
    const results = await Promise.all(this.checks.map(c => c.check()));
    return results;
  }
}

const Checker = require('./lib/checker');
for (var key in Checker) {
  HealthCheck[key] = Checker[key];
}

module.exports = HealthCheck;