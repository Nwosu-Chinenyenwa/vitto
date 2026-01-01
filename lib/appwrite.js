import { Client, Account, Databases, ID, Query } from "appwrite";

const createClient = () => {
  const client = new Client();

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '';
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';

  if (endpoint && projectId) {
    client.setEndpoint(endpoint).setProject(projectId);
  }

  return client;
};

export const account = new Account(createClient());
export const databases = new Databases(createClient());
export { ID, Query };