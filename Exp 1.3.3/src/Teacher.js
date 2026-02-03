import Person from './Person';

export default class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  getRole() {
    return 'Teacher';
  }

  describe() {
    return `${super.describe()} Teaches: ${this.subject}`;
  }

  teach() {
    return `${this.name} teaches ${this.subject}.`;
  }

  introduce() {
    return `${this.greet()} I teach ${this.subject}.`;
  }
}
