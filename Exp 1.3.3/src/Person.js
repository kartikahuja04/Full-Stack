export default class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getRole() {
    return 'Person';
  }

  describe() {
    return `${this.name}, ${this.age} years old (${this.getRole()})`;
  }

  greet() {
    return `Hello, I'm ${this.name}.`;
  }

  introduce() {
    return this.greet();
  }
}
