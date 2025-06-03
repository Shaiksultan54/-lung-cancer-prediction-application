import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Sun as Lung } from 'lucide-react';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { useAuth } from '../context/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(data.email, data.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Password must be at least 6 characters.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-primary-100 px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary-600 p-4 rounded-full text-white mb-4">
            <Lung size={32} />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">Welcome to Lung Health Predictor</h1>
          <p className="mt-2 text-center text-neutral-600">
            Sign in to access your prediction dashboard and health insights
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-error-50 border border-error-200 text-error-700 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="your@email.com"
              leftIcon={<Mail size={18} />}
              fullWidth
              error={errors.email?.message}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              leftIcon={<Lock size={18} />}
              fullWidth
              error={errors.password?.message}
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              This is a demo application. Any email and password (min 6 characters) will work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;