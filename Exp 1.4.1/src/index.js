const fs = require('fs').promises;
const path = require('path');
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const DATA_PATH = path.join(__dirname, '..', 'data', 'employees.json');

async function loadData() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function saveData(arr) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(arr, null, 2), 'utf8');
}

function validateName(name) {
  return typeof name === 'string' && name.trim().length > 0;
}

function validateAge(age) {
  const n = Number(age);
  return Number.isInteger(n) && n > 15 && n < 100;
}

function validateRole(role) {
  return typeof role === 'string' && role.trim().length > 0;
}

function nextId(arr) {
  if (!arr.length) return 1;
  return Math.max(...arr.map(e => e.id)) + 1;
}

async function main() {
  const rl = readline.createInterface({ input, output });
  let employees = await loadData();

  while (true) {
    console.log('\nEmployee Management');
    console.log('1) List all employees');
    console.log('2) Add employee');
    console.log('3) View employee');
    console.log('4) Update employee');
    console.log('5) Delete employee');
    console.log('6) Search by name');
    console.log('0) Exit');

    const choice = (await rl.question('Choose an option: ')).trim();

    if (choice === '1') {
      if (!employees.length) console.log('No employees.');
      else employees.forEach(e => console.log(`${e.id}: ${e.name} — ${e.role} (${e.age})`));
    } else if (choice === '2') {
      const name = (await rl.question('Name: ')).trim();
      if (!validateName(name)) { console.log('Invalid name.'); continue; }
      const age = (await rl.question('Age: ')).trim();
      if (!validateAge(age)) { console.log('Invalid age. Must be integer between 16 and 99.'); continue; }
      const role = (await rl.question('Role: ')).trim();
      if (!validateRole(role)) { console.log('Invalid role.'); continue; }

      const emp = { id: nextId(employees), name, age: Number(age), role };
      employees.push(emp);
      await saveData(employees);
      console.log('Employee added with id', emp.id);
    } else if (choice === '3') {
      const id = Number((await rl.question('Employee id: ')).trim());
      const emp = employees.find(e => e.id === id);
      if (!emp) console.log('Not found'); else console.log(emp);
    } else if (choice === '4') {
      const id = Number((await rl.question('Employee id to update: ')).trim());
      const idx = employees.findIndex(e => e.id === id);
      if (idx === -1) { console.log('Not found'); continue; }
      const emp = employees[idx];
      const name = (await rl.question(`Name (${emp.name}): `)).trim() || emp.name;
      const ageInput = (await rl.question(`Age (${emp.age}): `)).trim();
      const age = ageInput ? Number(ageInput) : emp.age;
      const role = (await rl.question(`Role (${emp.role}): `)).trim() || emp.role;

      if (!validateName(name) || !validateAge(age) || !validateRole(role)) { console.log('Invalid input. Update aborted.'); continue; }
      employees[idx] = { id, name, age: Number(age), role };
      await saveData(employees);
      console.log('Updated.');
    } else if (choice === '5') {
      const id = Number((await rl.question('Employee id to delete: ')).trim());
      const idx = employees.findIndex(e => e.id === id);
      if (idx === -1) { console.log('Not found'); continue; }
      const confirm = (await rl.question(`Delete ${employees[idx].name}? (y/N): `)).trim().toLowerCase();
      if (confirm === 'y' || confirm === 'yes') {
        employees.splice(idx, 1);
        await saveData(employees);
        console.log('Deleted.');
      } else console.log('Aborted.');
    } else if (choice === '6') {
      const q = (await rl.question('Search name: ')).trim().toLowerCase();
      const res = employees.filter(e => e.name.toLowerCase().includes(q));
      if (!res.length) console.log('No results'); else res.forEach(e => console.log(`${e.id}: ${e.name} — ${e.role} (${e.age})`));
    } else if (choice === '0') {
      console.log('Goodbye');
      break;
    } else {
      console.log('Invalid option');
    }
  }

  rl.close();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
