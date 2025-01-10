import dotenv from 'dotenv';

dotenv.config();

export const LANGFLOW_CONFIG = {
  BASE_API_URL: process.env.LANGFLOW_BASE_API_URL || '',
  LANGFLOW_ID: process.env.LANGFLOW_ID || '',
  FLOW_ID: process.env.FLOW_ID || '',
  APPLICATION_TOKEN: process.env.APPLICATION_TOKEN || '',
};