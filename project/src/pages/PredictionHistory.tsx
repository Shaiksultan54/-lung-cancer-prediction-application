import React, { useEffect, useState } from 'react';
import { Clock, Filter, Search, AlertCircle, ChevronDown } from 'lucide-react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import { predictionService } from '../services/api';
import { PredictionResult } from '../types';

const PredictionHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModel, setFilterModel] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  
  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true);
      try {
        // Uncomment when backend is available
        // const data = await predictionService.getPredictionHistory();
        // setPredictions(data);
        
        // Mock data for demonstration
        setPredictions([
          {
            id: '1234567890',
            timestamp: '2023-06-15T09:23:45Z',
            model: 'random_forest',
            risk: 0.25,
            confidence: 0.88,
            details: 'Low risk prediction based on non-smoking status and absence of key symptoms.',
          },
          {
            id: '0987654321',
            timestamp: '2023-06-14T14:12:36Z',
            model: 'logistic_regression',
            risk: 0.68,
            confidence: 0.76,
            details: 'Moderate to high risk based on smoking history, age, and reported chest pain.',
          },
          {
            id: '5678901234',
            timestamp: '2023-06-13T11:05:18Z',
            model: 'neural_network',
            risk: 0.82,
            confidence: 0.91,
            details: 'High risk prediction due to combination of smoking, yellow fingers, and chronic cough.',
          },
          {
            id: '4321098765',
            timestamp: '2023-06-12T16:48:22Z',
            model: 'svm',
            risk: 0.42,
            confidence: 0.84,
            details: 'Moderate risk based primarily on age, family history, and environmental factors.',
          },
          {
            id: '9012345678',
            timestamp: '2023-06-11T08:30:15Z',
            model: 'random_forest',
            risk: 0.15,
            confidence: 0.93,
            details: 'Low risk profile with no significant concerning factors identified.',
          },
        ]);
      } catch (error) {
        console.error('Error fetching prediction history:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPredictions();
  }, []);
  
  const filteredPredictions = predictions.filter((prediction) => {
    const matchesSearch = prediction.id.includes(searchTerm) || 
                         prediction.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModel = filterModel === 'all' || prediction.model === filterModel;
    let matchesRisk = true;
    
    if (filterRisk === 'low') {
      matchesRisk = prediction.risk < 0.3;
    } else if (filterRisk === 'moderate') {
      matchesRisk = prediction.risk >= 0.3 && prediction.risk < 0.7;
    } else if (filterRisk === 'high') {
      matchesRisk = prediction.risk >= 0.7;
    }
    
    return matchesSearch && matchesModel && matchesRisk;
  });
  
  const getRiskColor = (risk: number): string => {
    if (risk < 0.3) return 'bg-success-100 text-success-800';
    if (risk < 0.7) return 'bg-warning-100 text-warning-800';
    return 'bg-error-100 text-error-800';
  };
  
  const getRiskLabel = (risk: number): string => {
    if (risk < 0.3) return 'Low Risk';
    if (risk < 0.7) return 'Moderate Risk';
    return 'High Risk';
  };
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Prediction History</h1>
          <p className="mt-1 text-neutral-600">View and filter previous lung cancer predictions</p>
        </div>
      </div>
      
      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search by ID or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
            fullWidth
            className="md:w-1/3"
          />
          
          <div className="flex flex-col md:flex-row gap-4 md:ml-auto">
            <Select
              options={[
                { value: 'all', label: 'All Models' },
                { value: 'random_forest', label: 'Random Forest' },
                { value: 'logistic_regression', label: 'Logistic Regression' },
                { value: 'neural_network', label: 'Neural Network' },
                { value: 'svm', label: 'SVM' },
              ]}
              value={filterModel}
              onChange={(e) => setFilterModel(e.target.value)}
              leftIcon={<Filter size={18} />}
              className="md:w-48"
            />
            
            <Select
              options={[
                { value: 'all', label: 'All Risk Levels' },
                { value: 'low', label: 'Low Risk' },
                { value: 'moderate', label: 'Moderate Risk' },
                { value: 'high', label: 'High Risk' },
              ]}
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              leftIcon={<AlertCircle size={18} />}
              className="md:w-48"
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredPredictions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Risk
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredPredictions.map((prediction) => (
                  <tr key={prediction.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      {prediction.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {formatDate(prediction.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {prediction.model.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskColor(prediction.risk)}`}>
                        {getRiskLabel(prediction.risk)} ({Math.round(prediction.risk * 100)}%)
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {Math.round(prediction.confidence * 100)}%
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 max-w-md truncate">
                      {prediction.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-neutral-100 p-3 rounded-full text-neutral-600 mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">No Predictions Found</h3>
            <p className="text-neutral-600">
              No prediction records match your current filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PredictionHistory;