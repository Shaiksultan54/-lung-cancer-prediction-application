import React from 'react';
import { Info, AlertTriangle, Cigarette, Wind, Activity, HeartPulse } from 'lucide-react';
import Card from '../components/UI/Card';

const LungCancerInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Lung Cancer Information</h1>
          <p className="mt-1 text-neutral-600">Educational resources and prevention tips</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-600 p-8 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Understanding Lung Cancer</h2>
          <p className="max-w-3xl text-primary-50">
            Lung cancer is one of the most common cancers worldwide. Early detection and 
            prevention strategies can significantly improve outcomes and survival rates.
          </p>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="What is Lung Cancer?" className="h-full">
              <div className="space-y-4">
                <p className="text-neutral-700">
                  Lung cancer is a type of cancer that begins in the lungs, primarily in the cells lining the air passages.
                  It occurs when cells in the lungs grow uncontrollably, forming tumors that reduce a person's ability to breathe.
                </p>
                <p className="text-neutral-700">
                  There are two main types of lung cancer:
                </p>
                <ul className="list-disc pl-5 text-neutral-700 space-y-2">
                  <li><span className="font-medium">Non-small cell lung cancer (NSCLC)</span> - More common, accounts for 85% of cases</li>
                  <li><span className="font-medium">Small cell lung cancer (SCLC)</span> - Less common, tends to spread faster</li>
                </ul>
              </div>
            </Card>
            
            <div className="bg-primary-50 rounded-lg shadow-md overflow-hidden h-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center">
                  <AlertTriangle size={20} className="mr-2 text-primary-700" />
                  Key Statistics
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-primary-200 rounded-full h-6 w-6 text-primary-800 mr-3 mt-0.5 font-semibold text-sm">1</span>
                    <p className="text-primary-800">Lung cancer is the leading cause of cancer deaths worldwide</p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-primary-200 rounded-full h-6 w-6 text-primary-800 mr-3 mt-0.5 font-semibold text-sm">2</span>
                    <p className="text-primary-800">Smoking is responsible for 80-90% of lung cancer cases</p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-primary-200 rounded-full h-6 w-6 text-primary-800 mr-3 mt-0.5 font-semibold text-sm">3</span>
                    <p className="text-primary-800">Early detection can increase 5-year survival rates from 15% to over 50%</p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-primary-200 rounded-full h-6 w-6 text-primary-800 mr-3 mt-0.5 font-semibold text-sm">4</span>
                    <p className="text-primary-800">Non-smokers exposed to secondhand smoke have a 20-30% higher risk</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
              <Info size={20} className="mr-2 text-primary-600" />
              Common Causes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-error-100 p-2 rounded-full text-error-600 mr-3">
                    <Cigarette size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900">Smoking</h4>
                </div>
                <p className="text-neutral-700">
                  Tobacco smoking is the primary cause of lung cancer, with cigarettes containing over 70 known carcinogens.
                  The risk increases with the number of cigarettes smoked and years of smoking.
                </p>
              </div>
              
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-warning-100 p-2 rounded-full text-warning-600 mr-3">
                    <Wind size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900">Environmental Factors</h4>
                </div>
                <p className="text-neutral-700">
                  Exposure to radon gas, asbestos, air pollution, and industrial chemicals can significantly increase
                  lung cancer risk, especially in combination with smoking.
                </p>
              </div>
              
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-2 rounded-full text-primary-600 mr-3">
                    <HeartPulse size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900">Genetic Factors</h4>
                </div>
                <p className="text-neutral-700">
                  Family history of lung cancer can increase risk. Certain genetic mutations make some people more
                  susceptible to lung cancer, even without smoking history.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Common Symptoms</h3>
            <p className="text-neutral-700 mb-4">
              Lung cancer symptoms often don't appear until the disease is advanced. Watch for these warning signs:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-center text-neutral-700">
                  <span className="inline-block w-2 h-2 bg-error-500 rounded-full mr-2"></span>
                  Persistent cough that worsens over time
                </li>
                <li className="flex items-center text-neutral-700">
                  <span className="inline-block w-2 h-2 bg-error-500 rounded-full mr-2"></span>
                  Chest pain that worsens with deep breathing
                </li>
                <li className="flex items-center text-neutral-700">
                  <span className="inline-block w-2 h-2 bg-error-500 rounded-full mr-2"></span>
                  Hoarseness or voice changes
                </li>
                <li className="flex items-center text-neutral-700">
                  <span className="inline-block w-2 h-2 bg-error-500 rounded-full mr-2"></span>
                  Weight loss and loss of appetite
                </li>
              </ul>
              
              <ul className="space-y-2">
                <li className="flex items-center text-neutral-700">
                  <span className="inline-block w-2 h-2 bg-error-500 rounded-full mr-2"></span>
                  Shortness of breath or wheezing
                </li>
                <li className="flex items-center text-neutral-700">
                  <span className="inline-block w-2 h-2 bg-error-500 rounded-full mr-2"></span>
                  Coughing up blood (hemoptysis)
                </li>
                <li className="flex items-center text-neutral-700">
                  <span className="inline-block w-2 h-2 bg-error-500 rounded-full mr-2"></span>
                  Recurring respiratory infections
                </li>
                <li className="flex items-center text-neutral-700">
                  <span className="inline-block w-2 h-2 bg-error-500 rounded-full mr-2"></span>
                  Fatigue and weakness
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
              <Activity size={20} className="mr-2 text-success-600" />
              Prevention Tips
            </h3>
            
            <div className="bg-success-50 border border-success-100 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-success-900 mb-3">Lifestyle Changes to Reduce Risk</h4>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-success-100 rounded-full h-6 w-6 text-success-800 mr-3 mt-0.5 font-semibold text-sm">1</span>
                  <div>
                    <p className="font-medium text-success-800">Don't smoke, and quit if you do</p>
                    <p className="text-success-700 text-sm mt-1">
                      Quitting smoking at any age can significantly reduce your risk of lung cancer. After 10 years of quitting,
                      your risk drops to about half that of a current smoker.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-success-100 rounded-full h-6 w-6 text-success-800 mr-3 mt-0.5 font-semibold text-sm">2</span>
                  <div>
                    <p className="font-medium text-success-800">Avoid secondhand smoke</p>
                    <p className="text-success-700 text-sm mt-1">
                      If you live or work with smokers, encourage them to quit or smoke outside. Avoid areas where people smoke.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-success-100 rounded-full h-6 w-6 text-success-800 mr-3 mt-0.5 font-semibold text-sm">3</span>
                  <div>
                    <p className="font-medium text-success-800">Test your home for radon</p>
                    <p className="text-success-700 text-sm mt-1">
                      Radon is a colorless, odorless gas that can build up in homes and increase lung cancer risk.
                      Inexpensive test kits can detect dangerous levels.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-success-100 rounded-full h-6 w-6 text-success-800 mr-3 mt-0.5 font-semibold text-sm">4</span>
                  <div>
                    <p className="font-medium text-success-800">Maintain a healthy diet and exercise regularly</p>
                    <p className="text-success-700 text-sm mt-1">
                      A diet rich in fruits and vegetables may help reduce lung cancer risk. Regular physical activity
                      improves lung function and overall health.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-success-100 rounded-full h-6 w-6 text-success-800 mr-3 mt-0.5 font-semibold text-sm">5</span>
                  <div>
                    <p className="font-medium text-success-800">Get regular screenings if you're at high risk</p>
                    <p className="text-success-700 text-sm mt-1">
                      If you have a history of heavy smoking, are a current smoker, or have other risk factors,
                      talk to your doctor about lung cancer screening options.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LungCancerInfo;