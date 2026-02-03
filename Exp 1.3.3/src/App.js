import React from 'react';
import './App.css';
import Person from './Person';
import Student from './Student';
import Teacher from './Teacher';

function App() {
  const people = [
    new Person('Arjun Kapoor', 40),
    new Student('Priya Patel', 20, 'Computer Science'),
    new Teacher('Dr. Ramesh Verma', 50, 'Mathematics'),
    new Student('Riya Singh', 22, 'Design'),
  ];

  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <h1>Person Class Hierarchy</h1>
          <p className="sub">A simple demo of inheritance, overriding, and polymorphism</p>
        </header>

        <main className="content">
          <ul className="people-list">
            {people.map((p, i) => (
              <li key={i} className="person-card">
                <div className="role"><strong>{p.getRole()}:</strong> <span className="desc">{p.describe()}</span></div>
                <div className="introduce">{p.introduce()}</div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;
