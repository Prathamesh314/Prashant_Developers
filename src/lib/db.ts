// lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

let cached = global._mongoose || { conn: null, promise: null };
global._mongoose = cached;

export async function connectDb() {
  if (cached.conn) {
    console.log('[mongo] using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('[mongo] creating new connection...');
    
    // Configure mongoose settings
    mongoose.set("bufferCommands", false);
    mongoose.set("strictQuery", true);

    // Connection event listeners
    mongoose.connection.on("connecting", () => console.log("[mongo] connecting..."));
    mongoose.connection.on("connected", () => console.log("[mongo] connected"));
    mongoose.connection.on("error", (err) => console.error("[mongo] connection error:", err));
    mongoose.connection.on("disconnected", () => console.warn("[mongo] disconnected"));

    const opts = {
      dbName: "Ajinkya",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 15000,  // Increased timeout
      socketTimeoutMS: 45000,           // Increased timeout
      connectTimeoutMS: 15000,          // Increased timeout
      retryWrites: true,
      w: 'majority'
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('[mongo] connection established');
        return mongoose;
      })
      .catch((error) => {
        console.error('[mongo] connection failed:', error);
        cached.promise = null; // Reset promise on failure
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset on failure
    throw error;
  }
}