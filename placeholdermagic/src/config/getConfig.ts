// Interface defining the structure of the PlaceholderMagic configuration object.
export interface PlaceholderMagicConfig {
    apiEndpoints: {
      getDatabases: string; // API endpoint to fetch databases.
      getSchemas: string;   // API endpoint to fetch schemas.
      getTables: string;    // API endpoint to fetch tables.
      getColumns: string;   // API endpoint to fetch columns.
    };
    axiosConfig: {
      baseURL: string;      // Base URL for Axios HTTP requests.
      headers?: Record<string, string>; // Optional headers for Axios requests.
    };
  }
  
// Function to dynamically load the configuration file based on the environment.
export const getConfig = async (): Promise<PlaceholderMagicConfig> => {
    // Determine the environment (default to 'dev' if not set).
    const env = import.meta.env.VITE_PLACEHOLDER_MAGIC_ENV || 'dev';
    // Construct the configuration file name based on the environment.
    const configFileName = `placeholdermagic.config.${env}.json`;
  
    try {
      // Fetch the configuration file from the server.
      const response = await fetch(`/${configFileName}`);
      if (!response.ok) {
        // Throw an error if the file cannot be loaded.
        throw new Error(`Failed to load ${configFileName}`);
      }
      // Parse and return the configuration as a JSON object.
      return await response.json();
    } catch (error) {
      // Log and rethrow any errors encountered during the fetch process.
      console.error('Error loading configuration:', error);
      throw error;
    }
  };