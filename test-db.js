const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.user.findMany().then(users => {
  console.log("Users:", users.map(u => ({ id: u.id, email: u.email, role: u.role })));
}).catch(console.error).finally(() => prisma.$disconnect());
