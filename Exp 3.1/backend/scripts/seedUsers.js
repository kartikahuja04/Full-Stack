require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

const seedUsers = [
  {
    email: "admin@example.com",
    password: "Admin@123",
    role: "admin"
  },
  {
    email: "user@example.com",
    password: "User@123",
    role: "user"
  }
];

async function runSeed() {
  try {
    await connectDB();

    for (const user of seedUsers) {
      const existing = await User.findOne({ email: user.email.toLowerCase() });
      if (existing) continue;

      const passwordHash = await bcrypt.hash(user.password, 10);
      await User.create({
        email: user.email,
        passwordHash,
        role: user.role
      });
    }

    console.log("Seed completed");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
}

runSeed();
