import { MongoClient, Db } from 'mongodb';

const URI = process.env.MONGODB_URI as string;
const DB_NAME = process.env.MONGODB_DB || 'synex420';

if (!URI) {
  console.error('[DB] MONGODB_URI is not set. Please configure your .env file.');
  process.exit(1);
}

let client: MongoClient;
let db: Db;

export async function connectDB(): Promise<Db> {
  if (db) return db;
  client = new MongoClient(URI, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 10000,
  });
  await client.connect();
  db = client.db(DB_NAME);
  console.log(`[DB] Connected to MongoDB: ${DB_NAME}`);
  return db;
}

export function getDB(): Db {
  if (!db) throw new Error('[DB] Database not connected. Call connectDB() first.');
  return db;
}

// Graceful shutdown
process.on('SIGINT', async () => {
  if (client) await client.close();
  console.log('[DB] MongoDB connection closed.');
  process.exit(0);
});
