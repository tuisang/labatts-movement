import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Neon pauses idle databases and drops their connections. Two defences:
//  1. Keep pooled connections short-lived so we never reuse one Neon has
//     already closed, and allow plenty of time for a cold start to finish.
//  2. Retry an operation when the failure means "couldn't connect" (nothing
//     was sent to the database yet, so a retry can't duplicate a write).
const RETRYABLE = [
  "before secure TLS connection was established",
  "Can't reach database server",
  "Timed out fetching a new connection",
  "ECONNREFUSED",
  "ETIMEDOUT",
  "P1001",
  "P1002",
];
const MAX_ATTEMPTS = 4;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function isConnectError(err: unknown): boolean {
  const text = `${(err as Error)?.message ?? ""} ${(err as { code?: string })?.code ?? ""}`;
  return RETRYABLE.some((needle) => text.includes(needle));
}

function createClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    max: 5,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 20_000,
    keepAlive: true,
  });

  return new PrismaClient({ adapter }).$extends({
    query: {
      async $allOperations({ args, query }) {
        let lastError: unknown;
        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
          try {
            return await query(args);
          } catch (err) {
            lastError = err;
            if (!isConnectError(err) || attempt === MAX_ATTEMPTS) throw err;
            await wait(attempt * 1500); // 1.5s, 3s, 4.5s — enough for Neon to wake
          }
        }
        throw lastError;
      },
    },
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
