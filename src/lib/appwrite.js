/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 * @description Appwrite for the app
 */

import { Client, Databases, ID, Query, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);
export const account = new Account(client);
export { ID, Query };
