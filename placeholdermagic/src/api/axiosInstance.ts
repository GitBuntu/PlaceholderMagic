import axios, { AxiosInstance } from 'axios';
import { getConfig, PlaceholderMagicConfig } from '../config/getConfig';

// Singleton instance of Axios to ensure only one instance is created.
let axiosInstance: AxiosInstance | null = null;

// Function to get or create the Axios instance configured with the app's settings.
export const getAxiosInstance = async (): Promise<AxiosInstance> => {
  if (!axiosInstance) {
    // Load configuration dynamically.
    const config: PlaceholderMagicConfig = await getConfig();
    // Create a new Axios instance with the loaded configuration.
    axiosInstance = axios.create(config.axiosConfig);
  }
  // Return the existing or newly created Axios instance.
  return axiosInstance;
};