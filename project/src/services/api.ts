import axios from 'axios';
import { PredictionFeatures, PredictionResult, ChartData, StatData, UploadedFile } from '../types';

const API_URL = 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Error in request setup
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const predictionService = {
  getModels: async (): Promise<string[]> => {
    const response = await apiClient.get('/api/models');
    return response.data;
  },

  runPrediction: async (features: PredictionFeatures, model: string): 
  
  Promise<PredictionResult> => {
    const response = await apiClient.post('/api/predict', {
      features,
      model
    });
    console.log('Prediction history fetched:', response.data);
    return response.data;
    
  },

  getPredictionHistory: async (limit: number = 10): Promise<PredictionResult[]> => {
    const response = await apiClient.get(`/api/predictions?limit=${limit}`);
    return response.data;

  },
};

export const chartService = {
  getCharts: async (): Promise<ChartData> => {
    const response = await apiClient.get('/charts');
    return response.data;
  },

  getStats: async (): Promise<StatData[]> => {
    const response = await apiClient.get('/stats');
    return response.data;
  },
};

export const fileService = {
  uploadSvg: async (files: File[], model: string): Promise<UploadedFile[]> => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('model', model);
    
    const response = await apiClient.post('/api/upload_svgs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getAnnotatedUrl: (filename: string): string => {
    return `${API_URL}/api/download_annotated/${filename}`;
  },

  checkHealth: async (): Promise<boolean> => {
    try {
      const response = await apiClient.get('/api/health');
      return response.status === 200;
    } catch {
      return false;
    }
  },
};