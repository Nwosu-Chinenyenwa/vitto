// lib/appwrite.js

import { Client, Account, Databases, ID, Query } from "appwrite";

// Create a function that returns a configured client
const createClient = () => {
  const client = new Client();

  // These env vars MUST be defined (they are NEXT_PUBLIC_, so safe in browser too)
  if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
    throw new Error("Missing NEXT_PUBLIC_APPWRITE_ENDPOINT");
  }
  if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    throw new Error("Missing NEXT_PUBLIC_APPWRITE_PROJECT_ID");
  }

  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  return client;
};

// Export account and databases that use the client lazily
export const account = new Account(createClient());
export const databases = new Databases(createClient());
export { ID, Query };