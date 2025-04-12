import { useQuery } from "@tanstack/react-query";
import { fetchColumns, fetchDatabases, fetchSchemas, fetchTables } from "../api/placeholderApi";

// Fetch the list of databases from the API.
export const useDatabases = () => {
  return useQuery({queryKey: ["databases"], queryFn: fetchDatabases});
}
// Fetch the list of schemas for a specific database from the API.
export const useSchemas = (database: string) => {
  return useQuery({
    queryKey: ["schemas", database],
    queryFn: () => fetchSchemas(database),
    enabled: !!database, // Only run the query if the database is defined
  });
}
// Fetch the list of tables for a specific database and schema from the API.
export const useTables = (database: string, schema: string) => {
  return useQuery({
    queryKey: ["tables", database, schema],
    queryFn: () => fetchTables(database, schema),
    enabled: !!database && !!schema, // Only run the query if both database and schema are defined
  });
}
// Fetch the list of columns for a specific database, schema, and table from the API.
export const useColumns = (database: string, schema: string, table: string) => {
  return useQuery({
    queryKey: ["columns", database, schema, table],
    queryFn: () => fetchColumns(database, schema, table),
    enabled: !!database && !!schema && !!table, // Only run the query if database, schema, and table are defined
  });
}