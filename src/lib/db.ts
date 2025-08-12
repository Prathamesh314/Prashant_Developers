// lib/db.ts
import mongoose, { type ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("Please define MONGODB_URI");

declare global {
  // eslint-disable-next-line no-var
  var _mongoose:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}
let cached = global._mongoose || { conn: null, promise: null };
global._mongoose = cached;

export async function connectDb() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("bufferCommands", false);
    mongoose.set("strictQuery", true);

    const opts: ConnectOptions & { dbName: string } = {
      dbName: "Ajinkya",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
      writeConcern: { w: 'majority' as const },
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        console.log("[mongo] connection established");
        return m;
      })
      .catch((err) => {
        console.error("[mongo] connection failed:", err);
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
