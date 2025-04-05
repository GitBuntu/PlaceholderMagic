import { getConfig } from '../config/getConfig';
import { getAxiosInstance } from './axiosInstance';

// Function to fetch the list of databases from the API.
export const fetchDatabases = async (): Promise<string[]> => {
  const axios = await getAxiosInstance();
  const config = await getConfig();
  const { data } = await axios.get(config.apiEndpoints.getDatabases); // Use endpoint from config.
  return data;
};

// Function to fetch the list of schemas for a specific database from the API.
export const fetchSchemas = async (database: string): Promise<string[]> => {
  const axios = await getAxiosInstance();
  const config = await getConfig();
  const { data } = await axios.get(config.apiEndpoints.getSchemas, { params: { database } }); // Use endpoint from config.
  return data;
};

// Function to fetch the list of tables for a specific database and schema from the API.
export const fetchTables = async (database: string, schema: string): Promise<string[]> => {
  const axios = await getAxiosInstance();
  const config = await getConfig();
  const { data } = await axios.get(config.apiEndpoints.getTables, { params: { database, schema } }); // Use endpoint from config.
  return data;
};

// Function to fetch the list of columns for a specific database, schema, and table from the API.
export const fetchColumns = async (database: string, schema: string, table: string): Promise<string[]> => {
  const axios = await getAxiosInstance();
  const config = await getConfig();
  const { data } = await axios.get(config.apiEndpoints.getColumns, { params: { database, schema, table } }); // Use endpoint from config.
  return data;
};