import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DonationForm from "./components/DonationForm";
import AdminPanel from "./components/AdminPanel";
import { Toaster } from "./components/ui/toaster";
import { Button } from "./components/ui/button";
import { Home, Heart, Target, Menu, X } from 'lucide-react';
import { initializeData, updateMissionStatement, cleanupTestDonations, updateMilestoneDescriptions } from './utils/localStorage';

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Donate Now', href: '/donate', icon: Heart },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center p-1">
                <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 15 C65 20, 80 40, 75 60 C70 80, 55 85, 50 85 C45 85, 30 80, 25 60 C20 40, 35 20, 50 15 Z" 
                        fill="none" stroke="#FFF" stroke-width="2"/>
                  <path d="M50 15 C60 25, 70 45, 65 65" fill="none" stroke="#FFF" stroke-width="1.5" opacity="0.8"/>
                  <path d="M50 15 C40 25, 30 45, 35 65" fill="none" stroke="#FFF" stroke-width="1.5" opacity="0.8"/>
                  <circle cx="50" cy="45" r="18" fill="#F47E7E" opacity="1"/>
                  <path d="M50 45 m-12 0 a12 12 0 1 1 24 0 a8 8 0 1 1 -16 0 a4 4 0 1 1 8 0 a2 2 0 1 1 -4 0" 
                        fill="#000" opacity="0.9"/>
                  <polygon points="58,65 65,70 58,75" fill="#CCCCFF" opacity="1"/>
                </svg>
              </div>
              <span className="text-xl font-black text-gray-900">Sjòne Shrine</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-[#FE6F5E] to-[#FE4A36] text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-[#FE6F5E] to-[#FE4A36] text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Initialize data and update mission statement
    initializeData();
    updateMissionStatement();
    // Clean up any test donations and ensure only verified donations are shown
    cleanupTestDonations();
    // Force update milestone descriptions to latest versions
    updateMilestoneDescriptions();
  }, []);

  const handleDonationAdded = () => {
    // Force re-render of Dashboard when donation is added
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <HashRouter>
        <Navigation />
        <Routes>
          <Route 
            path="/" 
            element={<Dashboard key={refreshKey} />} 
          />
          <Route 
            path="/donate" 
            element={<DonationForm onDonationAdded={handleDonationAdded} />} 
          />
        </Routes>
        <Toaster />
        <AdminPanel onDonationAdded={handleDonationAdded} />
      </HashRouter>
    </div>
  );
}

export default App;