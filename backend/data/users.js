import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "JOHN MO",
    email: "adin@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "MO JOHN",
    email: "adsin@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
