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
    // Determine the environment (default to 'dev' if not set)
    const env = import.meta.env.PLACEHOLDER_MAGIC_ENV || 'dev';
    
    try {
        // Import the configuration file dynamically
        const config = await import(`../../../placeholdermagic.config.${env}.json`);
        return config.default;
    } catch (error) {
        console.error('Error loading configuration:', error);
        throw error;
    }
};