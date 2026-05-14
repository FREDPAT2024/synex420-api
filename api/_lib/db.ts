import { MongoClient, Db } from 'mongodb';

const URI = process.env.MONGODB_URI!;
const DB_NAME = process.env.MONGODB_DB || 'synex420';

if (!URI) throw new Error('MONGODB_URI environment variable is not set.');

// Vercel serverless: reuse connection across warm invocations
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (cachedDb && cachedClient) return cachedDb;
  const client = new MongoClient(URI, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 10000,
  });
  await client.connect();
  cachedClient = client;
  cachedDb = client.db(DB_NAME);
  return cachedDb;
}
