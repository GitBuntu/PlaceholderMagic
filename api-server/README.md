# PlaceholderMagic API Server

This is the API server that acts as a middleware between the PlaceholderMagic React application and your MySQL database.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env` file and update the values:
   - `MYSQL_USER`: Your MySQL username
   - `MYSQL_PASSWORD`: Your MySQL password
   - `MYSQL_HOST`: Your MySQL host (default: localhost)
   - `MYSQL_PORT`: Your MySQL port (default: 3306)
   - `API_TOKEN`: The authentication token that matches your client configuration

3. Start the server:
```bash
npm run dev
```

The server will start on port 5242 by default.

## API Endpoints

- `GET /databases` - List all databases
- `GET /databases/:database/schemas` - List schemas in a database
- `GET /databases/:database/schemas/:schema/tables` - List tables in a schema
- `GET /databases/:database/schemas/:schema/tables/:table/columns` - List columns in a table
- `GET /databases/:database/schemas/:schema/tables/:table/preview` - Get preview data from a table

All endpoints require Bearer token authentication.
