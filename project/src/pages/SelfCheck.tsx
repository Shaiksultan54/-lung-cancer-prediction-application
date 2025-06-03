import React, { useState } from 'react';
import { CheckCircle, ChevronRight, RefreshCw, Settings as Lungs } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { SelfCheckQuestion } from '../types';

const SelfCheck: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  
  const questions: SelfCheckQuestion[] = [
    {
      id: 1,
      question: 'Do you currently smoke or have you smoked regularly in the past?',
      options: ['Yes, I currently smoke', 'I used to smoke but quit', 'No, I have never smoked regularly'],
    },
    {
      id: 2,
      question: 'Have you experienced a persistent cough for more than 3 weeks?',
      options: ['Yes, frequently', 'Occasionally', 'No, rarely or never'],
    },
    {
      id: 3,
      question: 'Do you often feel short of breath during normal activities?',
      options: ['Yes, frequently', 'Sometimes', 'No, rarely or never'],
    },
    {
      id: 4,
      question: 'Have you noticed any blood in your sputum (phlegm) when coughing?',
      options: ['Yes', 'Not sure', 'No'],
    },
    {
      id: 5,
      question: 'Do you experience chest pain or discomfort, especially when breathing deeply?',
      options: ['Yes, frequently', 'Occasionally', 'No, rarely or never'],
    },
    {
      id: 6,
      question: 'Have you lost weight unexpectedly in the past few months?',
      options: ['Yes, significantly', 'Yes, but only slightly', 'No weight loss'],
    },
    {
      id: 7,
      question: 'Do you have a history of exposure to any of these substances?',
      options: ['Asbestos', 'Radon', 'Industrial chemicals', 'None of these'],
    },
    {
      id: 8,
      question: 'Is there a history of lung cancer in your immediate family?',
      options: ['Yes, immediate family', 'Yes, extended family', 'No family history'],
    },
  ];
  
  const handleAnswerSelect = (answer: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: answer });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const calculateRiskScore = (): number => {
    let score = 0;
    const maxScore = 16; // Maximum possible risk score
    
    // Question 1: Smoking status
    if (answers[1] === 'Yes, I currently smoke') score += 4;
    else if (answers[1] === 'I used to smoke but quit') score += 2;
    
    // Question 2: Persistent cough
    if (answers[2] === 'Yes, frequently') score += 2;
    else if (answers[2] === 'Occasionally') score += 1;
    
    // Question 3: Shortness of breath
    if (answers[3] === 'Yes, frequently') score += 2;
    else if (answers[3] === 'Sometimes') score += 1;
    
    // Question 4: Blood in sputum
    if (answers[4] === 'Yes') score += 3;
    else if (answers[4] === 'Not sure') score += 1;
    
    // Question 5: Chest pain
    if (answers[5] === 'Yes, frequently') score += 2;
    else if (answers[5] === 'Occasionally') score += 1;
    
    // Question 6: Weight loss
    if (answers[6] === 'Yes, significantly') score += 2;
    else if (answers[6] === 'Yes, but only slightly') score += 1;
    
    // Question 7: Environmental exposure
    if (answers[7] === 'Asbestos' || answers[7] === 'Radon' || answers[7] === 'Industrial chemicals') score += 2;
    
    // Question 8: Family history
    if (answers[8] === 'Yes, immediate family') score += 2;
    else if (answers[8] === 'Yes, extended family') score += 1;
    
    // Calculate percentage
    return Math.round((score / maxScore) * 100);
  };
  
  const getRiskLevel = (score: number): { level: string; color: string; advice: string } => {
    if (score < 25) {
      return {
        level: 'Low',
        color: 'text-success-600',
        advice: 'Your responses suggest a lower risk for lung health concerns. Continue maintaining good lung health practices.'
      };
    } else if (score < 50) {
      return {
        level: 'Moderate',
        color: 'text-warning-600',
        advice: 'Some risk factors are present. Consider discussing these with your healthcare provider during your next visit.'
      };
    } else {
      return {
        level: 'Higher',
        color: 'text-error-600',
        advice: 'Several risk factors are present. We recommend consulting with a healthcare professional for proper evaluation.'
      };
    }
  };
  
  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Lung Health Self-Check</h1>
          <p className="mt-1 text-neutral-600">Answer a few questions to assess your lung health</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {!showResults ? (
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="w-full bg-neutral-100 rounded-full h-2.5">
                <div 
                  className="bg-primary-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm font-medium text-neutral-600">
                {currentStep + 1}/{questions.length}
              </span>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-6">
                {questions[currentStep].question}
              </h2>
              
              <div className="space-y-3">
                {questions[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className="w-full flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors duration-200"
                  >
                    <span className="text-neutral-800">{option}</span>
                    <ChevronRight size={20} className="text-neutral-400" />
                  </button>
                ))}
              </div>
            </div>
            
            {currentStep > 0 && (
              <div className="mt-6 flex justify-center">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back to Previous Question
                </Button>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <p className="text-sm text-neutral-500 italic">
                <strong>Note:</strong> This self-check is for educational purposes only and is not a medical diagnosis.
                If you have health concerns, please consult a healthcare professional.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <div className="flex justify-center mb-8">
              <div className="bg-primary-100 p-4 rounded-full">
                <Lungs size={48} className="text-primary-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-neutral-900 mb-2">
              Your Lung Health Assessment
            </h2>
            <p className="text-center text-neutral-600 mb-8 max-w-md mx-auto">
              Based on your responses, here's a general assessment of potential lung health risk factors
            </p>
            
            <div className="max-w-md mx-auto mb-8">
              <div className="w-full bg-neutral-100 rounded-full h-4 mb-2">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                    calculateRiskScore() < 25 
                      ? 'bg-success-500' 
                      : calculateRiskScore() < 50 
                        ? 'bg-warning-500' 
                        : 'bg-error-500'
                  }`}
                  style={{ width: `${calculateRiskScore()}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm text-neutral-600">
                <span>Lower concern</span>
                <span>Higher concern</span>
              </div>
            </div>
            
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-8">
              <h3 className={`text-xl font-bold mb-2 ${getRiskLevel(calculateRiskScore()).color}`}>
                {getRiskLevel(calculateRiskScore()).level} Level of Concern
              </h3>
              <p className="text-neutral-700">
                {getRiskLevel(calculateRiskScore()).advice}
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-neutral-900">Factors to Consider:</h3>
              
              <div className="space-y-2">
                {answers[1] === 'Yes, I currently smoke' && (
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-primary-600 mr-2 mt-0.5" />
                    <p className="text-neutral-700">
                      <span className="font-medium">Smoking:</span> Current smoking significantly increases lung cancer risk.
                      Consider a smoking cessation program.
                    </p>
                  </div>
                )}
                
                {(answers[2] === 'Yes, frequently' || answers[3] === 'Yes, frequently') && (
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-primary-600 mr-2 mt-0.5" />
                    <p className="text-neutral-700">
                      <span className="font-medium">Respiratory Symptoms:</span> Persistent cough or shortness of breath
                      should be evaluated by a healthcare provider.
                    </p>
                  </div>
                )}
                
                {answers[4] === 'Yes' && (
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-primary-600 mr-2 mt-0.5" />
                    <p className="text-neutral-700">
                      <span className="font-medium">Blood in Sputum:</span> This symptom requires prompt medical attention.
                    </p>
                  </div>
                )}
                
                {answers[7] !== 'None of these' && (
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-primary-600 mr-2 mt-0.5" />
                    <p className="text-neutral-700">
                      <span className="font-medium">Environmental Exposure:</span> Your exposure history
                      should be shared with your healthcare provider.
                    </p>
                  </div>
                )}
                
                {answers[8] === 'Yes, immediate family' && (
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-primary-600 mr-2 mt-0.5" />
                    <p className="text-neutral-700">
                      <span className="font-medium">Family History:</span> Having close relatives with lung cancer
                      may increase your risk.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={resetQuiz}
                leftIcon={<RefreshCw size={16} />}
              >
                Retake Self-Check
              </Button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 text-sm text-primary-800">
                <p className="font-semibold mb-1">Important Health Disclaimer:</p>
                <p>
                  This self-check tool is for educational purposes only and is not a substitute for professional medical advice,
                  diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any
                  questions you may have regarding a medical condition.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfCheck;