import Person from './Person';

export default class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }

  getRole() {
    return 'Student';
  }

  describe() {
    return `${super.describe()} Major: ${this.major}`;
  }

  study() {
    return `${this.name} is studying ${this.major}.`;
  }

  introduce() {
    return `${this.greet()} I'm studying ${this.major}.`;
  }
}
