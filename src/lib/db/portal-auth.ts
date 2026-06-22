import bcrypt from "bcryptjs";
import type { OsPortalUser, OsStore } from "@/lib/os-api/types";
import { prisma } from "@/lib/db/prisma";

const BCRYPT_ROUNDS = 10;

export async function hashPortalPassword(password: string) {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPortalPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function syncPortalCredentialsFromStore(store: OsStore) {
  if (!store.portal_users?.length) return;

  for (const user of store.portal_users) {
    const email = user.email.toLowerCase();
    const existing = await prisma.portalCredential.findUnique({ where: { email } });

    if (existing) {
      await prisma.portalCredential.update({
        where: { email },
        data: { clientId: user.client_id, name: user.name, company: user.company },
      });
      continue;
    }

    await prisma.portalCredential.create({
      data: {
        clientId: user.client_id,
        email,
        passwordHash: await hashPortalPassword(user.password),
        name: user.name,
        company: user.company,
      },
    });
  }
}

export async function findPortalUserByEmail(email: string) {
  return prisma.portalCredential.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function upsertPortalUser(user: OsPortalUser, plainPassword: string) {
  const email = user.email.toLowerCase();
  await prisma.portalCredential.upsert({
    where: { email },
    create: {
      clientId: user.client_id,
      email,
      passwordHash: await hashPortalPassword(plainPassword),
      name: user.name,
      company: user.company,
    },
    update: {
      clientId: user.client_id,
      passwordHash: await hashPortalPassword(plainPassword),
      name: user.name,
      company: user.company,
    },
  });
}
