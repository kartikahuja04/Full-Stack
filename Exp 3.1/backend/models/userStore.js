const User = require("./User");

async function findUserByEmail(email) {
  const user = await User.findOne({ email: email.toLowerCase() }).lean();
  if (!user) return null;

  return {
    email: user.email,
    role: user.role,
    passwordHash: user.passwordHash
  };
}

module.exports = {
  findUserByEmail
};
