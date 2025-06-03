import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Menu, 
  X, 
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

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  
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
    <div className="md:hidden">
      <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
        <h1 className="text-xl font-bold text-primary-700">Lung Health Predictor</h1>
        <button 
          onClick={toggleMenu}
          className="p-2 text-neutral-700 rounded-lg hover:bg-neutral-100"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isOpen && (
        <nav className="fixed inset-0 z-50 bg-white pt-16">
          <div className="absolute top-0 right-0 p-4">
            <button 
              onClick={toggleMenu}
              className="p-2 text-neutral-700 rounded-lg hover:bg-neutral-100"
            >
              <X size={24} />
            </button>
          </div>
          <ul className="space-y-2 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink 
                  to={link.to} 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
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
            <li>
              <button 
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
              >
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MobileNav;