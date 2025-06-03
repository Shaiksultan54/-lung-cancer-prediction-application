import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement,
  LineElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { ActivitySquare, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import Card from '../components/UI/Card';
import Stat from '../components/UI/Stat';
import { chartService } from '../services/api';
import { ChartData, StatData } from '../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartsStats: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<StatData[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Uncomment when backend is available
        // const [chartsData, statsData] = await Promise.all([
        //   chartService.getCharts(),
        //   chartService.getStats()
        // ]);
        // setChartData(chartsData);
        // setStats(statsData);
        
        // Mock data for demonstration
        setChartData([
          {
            labels: ['Low Risk', 'Moderate Risk', 'High Risk'],
            datasets: [
              {
                label: 'Risk Distribution',
                data: [45, 30, 25],
                backgroundColor: [
                  'rgba(76, 175, 80, 0.6)',
                  'rgba(255, 193, 7, 0.6)',
                  'rgba(244, 67, 54, 0.6)',
                ],
                borderColor: [
                  'rgba(76, 175, 80, 1)',
                  'rgba(255, 193, 7, 1)',
                  'rgba(244, 67, 54, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Predictions',
                data: [65, 59, 80, 81, 56, 75],
                backgroundColor: 'rgba(33, 150, 243, 0.6)',
                borderColor: 'rgba(33, 150, 243, 1)',
                borderWidth: 1,
              },
            ],
          },
          {
            labels: ['Random Forest', 'Logistic Regression', 'Neural Network', 'SVM'],
            datasets: [
              {
                label: 'Model Accuracy',
                data: [85, 78, 90, 82],
                backgroundColor: [
                  'rgba(156, 39, 176, 0.6)',
                  'rgba(3, 169, 244, 0.6)',
                  'rgba(0, 188, 212, 0.6)',
                  'rgba(255, 87, 34, 0.6)',
                ],
                borderColor: [
                  'rgba(156, 39, 176, 1)',
                  'rgba(3, 169, 244, 1)',
                  'rgba(0, 188, 212, 1)',
                  'rgba(255, 87, 34, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
        ]);
        
        setStats([
          {
            title: 'Total Predictions',
            value: 524,
            change: 12.5,
            isPositive: true,
          },
          {
            title: 'Users',
            value: 48,
            change: 5.2,
            isPositive: true,
          },
          {
            title: 'High Risk Cases',
            value: '18%',
            change: 2.1,
            isPositive: false,
          },
          {
            title: 'Average Confidence',
            value: '86%',
            change: 3.4,
            isPositive: true,
          },
        ]);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const statIcons = [
    <ActivitySquare size={24} key="activity" />,
    <Users size={24} key="users" />,
    <AlertTriangle size={24} key="alert" />,
    <TrendingUp size={24} key="trending" />,
  ];
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Charts & Statistics</h1>
          <p className="mt-1 text-neutral-600">View prediction analytics and trends</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Stat
            key={index}
            title={stat.title}
            value={stat.value}
            icon={statIcons[index]}
            change={stat.change}
            isPositive={stat.isPositive}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Risk Distribution" subtitle="Patient risk level breakdown">
          <div className="h-64">
            <Pie data={chartData[0]} options={{ maintainAspectRatio: false }} />
          </div>
        </Card>
        
        <Card title="Monthly Predictions" subtitle="Number of predictions over time">
          <div className="h-64">
            <Bar data={chartData[1]} options={{ maintainAspectRatio: false }} />
          </div>
        </Card>
      </div>
      
      <Card title="Model Performance" subtitle="Accuracy comparison across models">
        <div className="h-64">
          <Bar data={chartData[2]} options={{ 
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: 'Accuracy (%)'
                }
              }
            }
          }} />
        </div>
      </Card>
      
      <div className="bg-primary-50 border border-primary-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-2">Analytics Insights</h3>
        <p className="text-primary-700">
          Based on recent predictions, the system has identified an increase in moderate risk cases among 
          patients aged 50-65 with a history of smoking. Consider focusing preventive measures on this demographic.
        </p>
      </div>
    </div>
  );
};

export default ChartsStats;