import { getConfig } from '../config/getConfig';
import { getAxiosInstance } from './axiosInstance';

export const fetchDatabases = async (): Promise<string[]> => {
  const axios = await getAxiosInstance();
  const config = await getConfig();
  const { data } = await axios.get(config.apiEndpoints.getDatabases);
  return data;
};

export const fetchSchemas = async (database: string): Promise<string[]> => {
  const axios = await getAxiosInstance();
  const config = await getConfig();
  const { data } = await axios.get(config.apiEndpoints.getSchemas.replace('{database}', database));
  return data;
};

export const fetchTables = async (database: string, schema: string): Promise<string[]> => {
  const axios = await getAxiosInstance();
  const config = await getConfig();
  const { data } = await axios.get(config.apiEndpoints.getTables
    .replace('{database}', database)
    .replace('{schema}', schema));
  return data;
};

export const fetchColumns = async (database: string, schema: string, table: string): Promise<string[]> => {
  const axios = await getAxiosInstance();
  const config = await getConfig();
  const { data } = await axios.get(config.apiEndpoints.getColumns
    .replace('{database}', database)
    .replace('{schema}', schema)
    .replace('{table}', table));
  return data;
};

// Type for database row data
export type DatabaseRow = Record<string, string | number | boolean | null>;

export const fetchPreviewData = async (database: string, schema: string, table: string): Promise<DatabaseRow[]> => {
  const axios = await getAxiosInstance();
  const config = await getConfig();
  const { data } = await axios.get(config.apiEndpoints.getPreviewData
    .replace('{database}', database)
    .replace('{schema}', schema)
    .replace('{table}', table));
  // Convert single row dictionary to array format
  return data ? [data] : [];
};