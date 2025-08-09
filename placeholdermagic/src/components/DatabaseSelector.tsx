import { Box, Checkbox, FormControl, InputLabel, List, ListItem, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { useColumns, useDatabases, usePreviewData, useSchemas, useTables } from "../hooks/useDatabaseQueries";

const DatabaseSelector = () => {
    const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
    const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
    
    const { data: databases } = useDatabases();
    const { data: schemas } = useSchemas(selectedDatabase || "");
    const { data: tables } = useTables(selectedDatabase || "", selectedSchema || "");
    const { data: columns } = useColumns(selectedDatabase || "", selectedSchema || "", selectedTable || "");
    const { data: previewData, isLoading, isError } = usePreviewData(selectedDatabase || "", selectedSchema || "", selectedTable || "");
    
    const handleDatabaseChange = (e: SelectChangeEvent<string>) => {
        setSelectedDatabase(e.target.value);
        setSelectedSchema(null);
        setSelectedTable(null);
        setSelectedColumns([]);
    };

    const handleSchemaChange = (e: SelectChangeEvent<string>) => {
        setSelectedSchema(e.target.value);
        setSelectedTable(null);
        setSelectedColumns([]);
    };

    const handleTableChange = (e: SelectChangeEvent<string>) => {
        setSelectedTable(e.target.value);
        setSelectedColumns([]);
    };

    const handleColumnToggle = (column: string) => {
        setSelectedColumns(prev => 
            prev.includes(column)
                ? prev.filter(col => col !== column)
                : [...prev, column]
        );
    };
    
    return (
        <Paper elevation={24} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControl fullWidth>
                    <TextField
                        required
                        id="placeholder-name"
                        label="Placeholder Name"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Database</InputLabel>
                    <Select
                        value={selectedDatabase || ""}
                        label="Database"
                        onChange={handleDatabaseChange}
                    >
                        <MenuItem value="">
                            <em>Select a database</em>
                        </MenuItem>
                        {databases?.map((db: string) => (
                            <MenuItem key={db} value={db}>{db}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth disabled={!selectedDatabase}>
                    <InputLabel>Schema</InputLabel>
                    <Select
                        value={selectedSchema || ""}
                        label="Schema"
                        onChange={handleSchemaChange}
                    >
                        <MenuItem value="">
                            <em>Select a schema</em>
                        </MenuItem>
                        {schemas?.map((schema) => (
                            <MenuItem key={schema} value={schema}>{schema}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth disabled={!selectedSchema}>
                    <InputLabel>Table</InputLabel>
                    <Select
                        value={selectedTable || ""}
                        label="Table"
                        onChange={handleTableChange}
                    >
                        <MenuItem value="">
                            <em>Select a table</em>
                        </MenuItem>
                        {tables?.map((table) => (
                            <MenuItem key={table} value={table}>{table}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedTable && columns && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Select columns from {selectedTable}
                        </Typography>
                        <List>
                            {columns.map((column) => (
                                <ListItem key={column}>
                                    <Checkbox
                                        checked={selectedColumns.includes(column)}
                                        onChange={() => handleColumnToggle(column)}
                                    />
                                    {column}
                                </ListItem>
                            ))}
                        </List>

                        {isLoading ? (
                            <Box sx={{ mt: 3 }}>
                                <Typography>Loading preview data...</Typography>
                            </Box>
                        ) : isError ? (
                            <Box sx={{ mt: 3 }}>
                                <Typography color="error">Error loading preview data</Typography>
                            </Box>
                        ) : (previewData && previewData.length > 0) ? (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Preview Data
                                </Typography>
                                <Box sx={{ overflowX: 'auto' }}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell key={column}>{column}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {previewData.map((row, index) => (
                                                <TableRow key={index}>
                                                    {columns.map((column) => (
                                                        <TableCell key={column}>
                                                            {String(row[column] ?? '')}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Box>
                        ) : (
                            <Box sx={{ mt: 3 }}>
                                <Typography>No preview data available</Typography>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </Paper>
    );
}

export default DatabaseSelector;