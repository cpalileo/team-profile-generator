const TeamMember = require("./TeamMember");

class Engineer extends TeamMember {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
  getGithub() {
    return this.github;
  }
  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
