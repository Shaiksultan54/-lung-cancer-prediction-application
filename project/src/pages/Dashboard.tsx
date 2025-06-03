import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertCircle, Settings as Lungs, ArrowRight } from 'lucide-react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import Button from '../components/UI/Button';
import { PredictionResult, PredictionFormData } from '../types';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('random_forest');
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PredictionFormData>({
    defaultValues: {
      age: 45,
      gender: 'male',
      smoking: 'yes',
      yellowFingers: 'no',
      anxiety: 'no',
      peerPressure: 'no',
      chronicDisease: 'no',
      fatigue: 'no',
      allergy: 'no',
      wheezing: 'no',
      alcoholConsuming: 'no',
      coughing: 'no',
      shortnessOfBreath: 'no',
      swallowingDifficulty: 'no',
    }
  });
  
  // Transform form data to API format
  const transformDataForAPI = (data: PredictionFormData) => {
    return {
      features: {
        GENDER: data.gender === 'male' ? 1 : 0,
        AGE: Number(data.age),
        SMOKING: data.smoking === 'yes' ? 1 : 0,
        YELLOW_FINGERS: data.yellowFingers === 'yes' ? 1 : 0,
        ANXIETY: data.anxiety === 'yes' ? 1 : 0,
        PEER_PRESSURE: data.peerPressure === 'yes' ? 1 : 0,
        CHRONIC_DISEASE: data.chronicDisease === 'yes' ? 1 : 0,
        FATIGUE: data.fatigue === 'yes' ? 1 : 0,
        ALLERGY: data.allergy === 'yes' ? 1 : 0,
        WHEEZING: data.wheezing === 'yes' ? 1 : 0,
        ALCOHOL_CONSUMING: data.alcoholConsuming === 'yes' ? 1 : 0,
        COUGHING: data.coughing === 'yes' ? 1 : 0,
        SHORTNESS_OF_BREATH: data.shortnessOfBreath === 'yes' ? 1 : 0,
        SWALLOWING_DIFFICULTY: data.swallowingDifficulty === 'yes' ? 1 : 0,
      },
      model: selectedModel
    };
  };
  
  const onSubmit = async (data: PredictionFormData) => {
    setIsLoading(true);
    try {
      const transformedData = transformDataForAPI(data);
      console.log('Sending data to API:', JSON.stringify(transformedData, null, 2));
      
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const apiResult = await response.json();
      console.log('API Response:', apiResult);
      
      // Transform API response to match PredictionResult interface
      const result: PredictionResult = {
        timestamp: new Date().toISOString(),
        model: apiResult.model_used,
        model_used: apiResult.model_used,
        prediction: apiResult.probabilities?.cancer_risk_yes || 0,
        risk: apiResult.probabilities?.cancer_risk_yes || 0,
        confidence: apiResult.confidence_score,
        confidence_score: apiResult.confidence_score,
        details: `Prediction: ${apiResult.prediction}. ${apiResult.prediction === 'YES' ? 
          'The model indicates potential cancer risk based on provided symptoms.' : 
          'The model indicates low cancer risk based on provided symptoms.'} Analysis completed using ${apiResult.model_used} model.`,
        probabilities: apiResult.probabilities,
        log_id: apiResult.log_id,
        prediction_text: apiResult.prediction
      };
      
      setResult(result);
    } catch (error) {
      console.error('Error submitting prediction:', error);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const modelOptions = [
    { value: 'random_forest', label: 'Random Forest' },
    { value: 'logistic_regression', label: 'Logistic Regression' },
    { value: 'neural_network', label: 'Neural Network' },
    { value: 'svm', label: 'Support Vector Machine' },
  ];
  
  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];
  
  const getRiskLevel = (risk: number): { label: string; color: string } => {
    if (risk < 0.3) return { label: 'Low Risk', color: 'text-green-600' };
    if (risk < 0.7) return { label: 'Moderate Risk', color: 'text-yellow-600' };
    return { label: 'High Risk', color: 'text-red-600' };
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lung Cancer Prediction Dashboard</h1>
          <p className="mt-1 text-gray-600">Enter patient data to get a cancer risk prediction</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          title="Prediction Inputs"
          subtitle="Enter patient data for analysis"
          className="md:col-span-2"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="age"
                type="number"
                label="Age"
                fullWidth
                error={errors.age?.message}
                {...register('age', { 
                  required: 'Age is required',
                  min: { value: 0, message: 'Age must be positive' },
                  max: { value: 120, message: 'Age must be realistic' },
                })}
              />
              
              <Select
                id="gender"
                label="Gender"
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
                fullWidth
                error={errors.gender?.message}
                {...register('gender', { required: 'Gender is required' })}
              />
              
              {/* All other form fields following the same pattern */}
              {[
                'smoking', 'yellowFingers', 'anxiety', 'peerPressure',
                'chronicDisease', 'fatigue', 'allergy', 'wheezing',
                'alcoholConsuming', 'coughing', 'shortnessOfBreath', 'swallowingDifficulty'
              ].map((field) => (
                <Select
                  key={field}
                  id={field}
                  label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  options={yesNoOptions}
                  fullWidth
                  error={errors[field as keyof PredictionFormData]?.message}
                  {...register(field as keyof PredictionFormData, { required: 'Field is required' })}
                />
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <Select
                  id="model"
                  label="ML Model"
                  options={modelOptions}
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-48"
                />
                
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight size={16} />}
                >
                  Run Prediction
                </Button>
              </div>
            </div>
          </form>
        </Card>
        
        <Card 
          title="Prediction Results"
          subtitle={result ? `Model: ${result.model_used || result.model}` : "Run a prediction to see results"}
          className="md:col-span-1 h-fit"
        >
          {result ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg">
                <div className="text-5xl font-bold mb-2 mt-2">
                  {Math.round(result.risk * 100)}%
                </div>
                <div className={`font-semibold ${getRiskLevel(result.risk).color}`}>
                  {getRiskLevel(result.risk).label}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Confidence: {Math.round((result.confidence_score || result.confidence) * 100)}%
                </div>
                {result.prediction_text && (
                  <div className="text-sm font-medium mt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    Prediction: {result.prediction_text}
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Analysis</h4>
                <p className="text-gray-700">{result.details}</p>
              </div>
              
              {result.probabilities && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Probabilities</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cancer Risk (Yes):</span>
                      <span className="text-sm font-medium">{Math.round(result.probabilities.cancer_risk_yes * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cancer Risk (No):</span>
                      <span className="text-sm font-medium">{Math.round(result.probabilities.cancer_risk_no * 100)}%</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <AlertCircle size={16} className="mr-1 text-blue-600" />
                  <span>Log ID: {result.log_id || result.id}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600 mb-4">
                <Lungs size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Prediction Yet</h3>
              <p className="text-gray-600">
                Fill in the patient data and run a prediction to see results here
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;