import "dotenv/config";
import { prisma } from "../src/lib/db";

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: "aasishverma1507@gmail.com" }
  });
  console.log(JSON.stringify(user, null, 2));
}

main();
