export class Validator {
  constructor(rules) {
    this.validationErrors = {};
    this.rules = rules;
  }

  validate(states) {
    for (rule in rules) {
      if (states[rule.name]) {

      }
    }
  }

}

export class Rule {
  constructor() {
    this.name = name;
    this.message = message;
    this.rule = rule
  }

  valid(state) {
    return
  }
}