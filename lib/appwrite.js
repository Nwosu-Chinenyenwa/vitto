// lib/appwrite.js

import { Client, Account, Databases, ID, Query } from "appwrite";

// DO NOT call .setEndpoint() or .setProject() at the top level

const client = new Client();

// Only configure when actually needed (safe for build time)
if (typeof window === "undefined") {
  // Server-side (during API routes, server components, etc.)
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");
} else {
  // Client-side (browser)
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");
}

export const account = new Account(client);
export const databases = new Databases(client);
export { ID, Query };
export { client }; // optional, if needed elsewhere