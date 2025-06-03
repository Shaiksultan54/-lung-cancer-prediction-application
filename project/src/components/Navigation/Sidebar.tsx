import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LineChart, 
  Upload, 
  Clock, 
  Info, 
  Heart, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  const navLinks = [
    { to: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/charts', icon: <LineChart size={20} />, label: 'Charts & Stats' },
    { to: '/upload', icon: <Upload size={20} />, label: 'SVG Uploader' },
    { to: '/history', icon: <Clock size={20} />, label: 'Prediction History' },
    { to: '/info', icon: <Info size={20} />, label: 'Lung Cancer Info' },
    { to: '/self-check', icon: <Heart size={20} />, label: 'Lung Health Check' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-200">
      <div className="flex items-center justify-center h-16 border-b border-neutral-200">
        <h1 className="text-xl font-bold text-primary-700">Lung Health Predictor</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-4">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink 
                to={link.to} 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`
                }
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-neutral-200">
        <button 
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;