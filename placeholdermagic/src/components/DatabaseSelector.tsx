import React, { useState } from "react";
import { useColumns, useDatabases, useSchemas, useTables } from "../hooks/useDatabaseQueries";

const DatabaseSelector: React.FC = () => {
    const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
    const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    
    const { data: databases } = useDatabases();
    const { data: schemas } = useSchemas(selectedDatabase || "");
    const { data: tables } = useTables(selectedDatabase || "", selectedSchema || "");
    const { data: columns } = useColumns(selectedDatabase || "", selectedSchema || "", selectedTable || "");
    
    const handleDatabaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDatabase(e.target.value);
    };

    const handleSchemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSchema(e.target.value);
    };

    const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTable(e.target.value);
    };
    
    return (
        <div>
            <h2>Select Database</h2>
            <select onChange={handleDatabaseChange} value={selectedDatabase || ""}>
                <option value="">Select a database</option>
                {databases && databases.map((db: string) => (
                    <option key={db} value={db}>{db}</option>
                ))}
            </select>

            <div>
                <h2>Select Schema</h2>
                <select 
                    onChange={handleSchemaChange} 
                    value={selectedSchema || ""} 
                    disabled={!selectedDatabase}
                >
                    <option value="">Select a schema</option>
                    {schemas?.map((schema) => (
                        <option key={schema} value={schema}>{schema}</option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Select Table</h2>
                <select 
                    onChange={handleTableChange} 
                    value={selectedTable || ""} 
                    disabled={!selectedSchema}
                >
                    <option value="">Select a table</option>
                    {tables?.map((table) => (
                        <option key={table} value={table}>{table}</option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Columns in {selectedTable || '...'}</h2>
                <ul>
                    {columns?.map((column) => (
                        <li key={column}>{column}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default DatabaseSelector;