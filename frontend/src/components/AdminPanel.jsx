import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { addVerifiedDonation, getVerificationSummary } from '../utils/localStorage';
import { Plus, Check, Eye } from 'lucide-react';

const AdminPanel = ({ onDonationAdded }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    donorEmail: '',
    message: '',
    provider: 'manual_verification',
    date: new Date().toISOString().split('T')[0]
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    try {
      const newDonation = addVerifiedDonation(formData);
      
      // Reset form
      setFormData({
        amount: '',
        donorName: '',
        donorEmail: '',
        message: '',
        provider: 'manual_verification',
        date: new Date().toISOString().split('T')[0]
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Notify parent to refresh
      if (onDonationAdded) {
        onDonationAdded(newDonation);
      }
    } catch (error) {
      alert('Error adding donation: ' + error.message);
    }
  };

  const handleViewSummary = () => {
    getVerificationSummary();
    alert('Check browser console (F12) for detailed summary');
  };

  // Secret key combination to show admin panel
  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      setIsVisible(!isVisible);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 text-xs text-gray-400">
        Press Ctrl+Shift+A for admin
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <Card className="shadow-2xl border-2 border-[#F47E7E]">
        <CardHeader className="bg-gradient-to-r from-[#F47E7E] to-[#CCCCFF] text-white">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Admin Panel
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20"
            >
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {showSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-green-800">Verified donation added!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Amount ($)*</label>
              <Input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Donor Name</label>
              <Input
                value={formData.donorName}
                onChange={(e) => setFormData({...formData, donorName: e.target.value})}
                placeholder="Anonymous"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Provider</label>
              <select
                value={formData.provider}
                onChange={(e) => setFormData({...formData, provider: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="manual_verification">Manual Verification</option>
                <option value="nbkc_payment">Bank</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Optional message"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                type="submit" 
                className="flex-1 bg-[#F47E7E] hover:bg-[#CCCCFF]"
              >
                Add Verified Donation
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={handleViewSummary}
                className="border-[#F47E7E] text-[#F47E7E]"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <div className="mt-3 text-xs text-gray-600">
            Only add donations that have been verified and completed through external payment processors.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;