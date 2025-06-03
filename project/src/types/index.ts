export interface User {
  email: string;
  isAuthenticated: boolean;
}

export interface PredictionFeatures {
  GENDER: number;
  AGE: number;
  SMOKING: number;
  YELLOW_FINGERS: number;
  ANXIETY: number;
  PEER_PRESSURE: number;
  CHRONIC_DISEASE: number;
  FATIGUE: number;
  ALLERGY: number;
  WHEEZING: number;
  ALCOHOL_CONSUMING: number;
  COUGHING: number;
  SHORTNESS_OF_BREATH: number;
  SWALLOWING_DIFFICULTY: number;
}

export interface PredictionResult {
  prediction: number;
  confidence_score: number;
  probabilities: {
    cancer_risk_yes: number;
    cancer_risk_no: number;
  };
  model_used: string;
  log_id: number;
}

export interface ChartData {
  summary: {
    total_predictions: number;
    high_risk_predictions: number;
    low_risk_predictions: number;
    high_risk_percentage: number;
  };
  model_usage: Array<{
    model: string;
    count: number;
  }>;
  confidence_distribution: Array<{
    range: string;
    count: number;
  }>;
}

export interface StatData {
  title: string;
  value: number | string;
  change?: number;
  isPositive?: boolean;
}

export interface UploadedFile {
  id: string;
  filename: string;
  uploadDate: string;
  annotated: boolean;
}

export interface SelfCheckQuestion {
  id: number;
  question: string;
  options: string[];
}
// Core form data interface
export interface PredictionFormData {
  // Demographics
  age: number;
  gender: 'male' | 'female';
  
  // Lifestyle factors
  smoking: 'yes' | 'no';
  alcoholConsuming: 'yes' | 'no';
  
  // Physical symptoms
  yellowFingers: 'yes' | 'no';
  anxiety: 'yes' | 'no';
  peerPressure: 'yes' | 'no';
  chronicDisease: 'yes' | 'no';
  fatigue: 'yes' | 'no';
  allergy: 'yes' | 'no';
  wheezing: 'yes' | 'no';
  coughing: 'yes' | 'no';
  shortnessOfBreath: 'yes' | 'no';
  swallowingDifficulty: 'yes' | 'no';
}

// Form field configuration
export interface FormFieldConfig {
  id: keyof PredictionFormData;
  label: string;
  type: 'number' | 'select';
  options?: Array<{ value: string; label: string }>;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    message?: string;
  };
  category: 'demographics' | 'lifestyle' | 'symptoms';
  description?: string;
}

// Default form values
export const defaultFormValues: PredictionFormData = {
  age: 45,
  gender: 'male',
  smoking: 'no',
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
};

// Form field configurations
export const formFieldConfigs: FormFieldConfig[] = [
  // Demographics
  {
    id: 'age',
    label: 'Age',
    type: 'number',
    validation: {
      required: true,
      min: 0,
      max: 120,
      message: 'Age must be between 0 and 120'
    },
    category: 'demographics',
    description: 'Patient age in years'
  },
  {
    id: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ],
    validation: { required: true },
    category: 'demographics',
    description: 'Biological gender'
  },
  
  // Lifestyle factors
  {
    id: 'smoking',
    label: 'Smoking',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validation: { required: true },
    category: 'lifestyle',
    description: 'Current or past smoking history'
  },
  {
    id: 'alcoholConsuming',
    label: 'Alcohol Consuming',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validation: { required: true },
    category: 'lifestyle',
    description: 'Regular alcohol consumption'
  },
  
  // Physical symptoms
  {
    id: 'yellowFingers',
    label: 'Yellow Fingers',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validation: { required: true },
    category: 'symptoms',
    description: 'Yellow discoloration of fingers'
  },
  {
    id: 'anxiety',
    label: 'Anxiety',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validation: { required: true },
    category: 'symptoms',
    description: 'Frequent anxiety or nervousness'
  },
  {
    id: 'peerPressure',
    label: 'Peer Pressure',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validation: { required: true },
    category: 'symptoms',
    description: 'Experiencing peer pressure related to smoking'
  },
  {
    id: 'chronicDisease',
    label: 'Chronic Disease',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validation: { required: true },
    category: 'symptoms',
    description: 'History of chronic diseases'
  },
  {
    id: 'fatigue',
    label: 'Fatigue',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validation: { required: true },
    category: 'symptoms',
    description: 'Persistent tiredness or fatigue'
  },
  {
    id: 'allergy',
    label: 'Allergy',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validation: { required: true },
    category: 'symptoms',
    description: 'Known allergies or allergic reactions'
  },
  {
    id: 'wheezing',
    label: 'Wheezing',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validation: { required: true },
    category: 'symptoms',
    description: 'Whistling sound when breathing'
  },
  {
    id: 'coughing',
    label: 'Coughing',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validation: { required: true },
    category: 'symptoms',
    description: 'Persistent or frequent coughing'
  },
  {
    id: 'shortnessOfBreath',
    label: 'Shortness of Breath',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validation: { required: true },
    category: 'symptoms',
    description: 'Difficulty breathing or breathlessness'
  },
  {
    id: 'swallowingDifficulty',
    label: 'Swallowing Difficulty',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validation: { required: true },
    category: 'symptoms',
    description: 'Difficulty swallowing food or liquids'
  }
];

// Utility functions
export const getFieldsByCategory = (category: FormFieldConfig['category']): FormFieldConfig[] => {
  return formFieldConfigs.filter(field => field.category === category);
};

export const getFieldConfig = (fieldId: keyof PredictionFormData): FormFieldConfig | undefined => {
  return formFieldConfigs.find(field => field.id === fieldId);
};

// Transform form data to API format
export const transformFormDataToAPI = (data: PredictionFormData, model: string) => {
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
    model: model
  };
};

// Validation rules for react-hook-form
export const getValidationRules = (fieldId: keyof PredictionFormData) => {
  const config = getFieldConfig(fieldId);
  if (!config?.validation) return {};
  
  const rules: any = {};
  
  if (config.validation.required) {
    rules.required = config.validation.message || `${config.label} is required`;
  }
  
  if (config.validation.min !== undefined) {
    rules.min = {
      value: config.validation.min,
      message: config.validation.message || `${config.label} must be at least ${config.validation.min}`
    };
  }
  
  if (config.validation.max !== undefined) {
    rules.max = {
      value: config.validation.max,
      message: config.validation.message || `${config.label} must be at most ${config.validation.max}`
    };
  }
  
  return rules;
};

// Form data validation
export const validateFormData = (data: PredictionFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Age validation
  if (!data.age || data.age < 0 || data.age > 120) {
    errors.push('Age must be between 0 and 120');
  }
  
  // Required field validation
  const requiredFields: (keyof PredictionFormData)[] = [
    'gender', 'smoking', 'yellowFingers', 'anxiety', 'peerPressure',
    'chronicDisease', 'fatigue', 'allergy', 'wheezing', 'alcoholConsuming',
    'coughing', 'shortnessOfBreath', 'swallowingDifficulty'
  ];
  
  requiredFields.forEach(field => {
    if (!data[field]) {
      const config = getFieldConfig(field);
      errors.push(`${config?.label || field} is required`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Get summary of form data
export const getFormDataSummary = (data: PredictionFormData) => {
  const yesCount = Object.entries(data)
    .filter(([key, value]) => key !== 'age' && key !== 'gender' && value === 'yes')
    .length;
  
  const totalSymptoms = Object.keys(data).length - 2; // Exclude age and gender
  
  return {
    age: data.age,
    gender: data.gender,
    symptomsPresent: yesCount,
    totalSymptoms: totalSymptoms,
    symptomPercentage: Math.round((yesCount / totalSymptoms) * 100),
    riskFactors: Object.entries(data)
      .filter(([key, value]) => value === 'yes')
      .map(([key]) => getFieldConfig(key as keyof PredictionFormData)?.label || key)
  };
};