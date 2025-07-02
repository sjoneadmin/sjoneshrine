import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { addDonation } from '../data/mock';
import { DollarSign, Heart } from 'lucide-react';

const AddDonation = ({ onDonationAdded }) => {
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    message: '',
    type: 'one-time'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.donorName) {
      toast({
        title: "Missing Information",
        description: "Please fill in the amount and donor name.",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const donation = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      
      const newDonation = addDonation(donation);
      
      toast({
        title: "Donation Added! 🎉",
        description: `$${donation.amount} donation from ${donation.donorName} has been recorded.`,
      });
      
      // Reset form
      setFormData({
        amount: '',
        donorName: '',
        message: '',
        type: 'one-time'
      });
      
      // Notify parent component
      if (onDonationAdded) {
        onDonationAdded(newDonation);
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add donation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Add New Donation</h1>
          <p className="text-xl text-gray-600">Record a new contribution to help reach our goals</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <DollarSign className="w-8 h-8 text-blue-600" />
              Donation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Amount and Type Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-lg font-semibold text-gray-700">
                    Donation Amount *
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      step="0.01"
                      min="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-lg font-semibold text-gray-700">
                    Donation Type
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Donor Name */}
              <div className="space-y-2">
                <Label htmlFor="donorName" className="text-lg font-semibold text-gray-700">
                  Donor Name *
                </Label>
                <Input
                  id="donorName"
                  type="text"
                  placeholder="Enter donor name or 'Anonymous'"
                  value={formData.donorName}
                  onChange={(e) => handleInputChange('donorName', e.target.value)}
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-lg font-semibold text-gray-700">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Add a message from the donor..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="min-h-[100px] text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                  rows={4}
                />
              </div>

              {/* Preview */}
              {formData.amount && formData.donorName && (
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Preview:</h3>
                  <div className="text-green-700">
                    <span className="font-bold">${parseFloat(formData.amount || 0).toLocaleString()}</span> donation from{' '}
                    <span className="font-semibold">{formData.donorName}</span>
                    {formData.message && (
                      <div className="mt-1 italic">"{formData.message}"</div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !formData.amount || !formData.donorName}
                className="w-full h-14 text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                    Adding Donation...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6" />
                    Add Donation
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddDonation;