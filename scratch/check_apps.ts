import "dotenv/config";
import { prisma } from "../src/lib/db";

async function main() {
  const app = await prisma.application.findFirst({
    orderBy: { createdAt: "desc" },
  });
  if (app) {
    const data = app.applicantData as any;
    console.log(`Latest Approved ID: ${app.id}`);
    console.log(`Target Email: ${data.email || data.contactEmail}`);
    console.log(`Credentials Sent Flag: ${app.credentialsSent}`);
    console.log(`Updated At: ${app.updatedAt}`);
  } else {
    console.log("No approved applications found.");
  }
}

main();
