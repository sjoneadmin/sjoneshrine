import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { addDonation, paymentProviders } from '../data/mock';
import { Heart, ExternalLink, QrCode, Building, DollarSign } from 'lucide-react';

const DonationForm = ({ onDonationAdded }) => {
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    donorEmail: '',
    message: '',
    provider: '',
    donationType: 'one-time',
    interval: 'monthly'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const providerIcons = {
    remitly: Globe,
    autobooks_invoice: FileText,
    cashapp: DollarSign
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.donorName || !formData.provider) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
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

    const selectedProvider = paymentProviders.find(p => p.id === formData.provider);
    if (formData.donationType === 'recurring' && !selectedProvider?.supportedTypes.includes('recurring')) {
      toast({
        title: "Unsupported Type",
        description: `${selectedProvider.name} doesn't support recurring donations. Please select a different provider or choose one-time donation.`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const donation = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      
      const newDonation = addDonation(donation);
      
      toast({
        title: "Payment Successful! 🎉",
        description: `Thank you for your $${donation.amount} donation via ${selectedProvider.name}!`,
      });
      
      // Reset form
      setFormData({
        amount: '',
        donorName: '',
        donorEmail: '',
        message: '',
        provider: '',
        donationType: 'one-time',
        interval: 'monthly'
      });
      
      // Notify parent component
      if (onDonationAdded) {
        onDonationAdded(newDonation);
      }
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedProvider = paymentProviders.find(p => p.id === formData.provider);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FE6F5E] to-[#FE4A36] rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Support Our Mission</h1>
          <p className="text-xl text-gray-600">Choose your payment method and make a difference</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-[#FE6F5E]/10 to-[#FE4A36]/10 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <CreditCard className="w-8 h-8 text-[#FE6F5E]" />
              Donation Payment
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
                      className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-[#FE6F5E] transition-colors"
                      step="0.01"
                      min="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-lg font-semibold text-gray-700">
                    Donation Type *
                  </Label>
                  <RadioGroup 
                    value={formData.donationType} 
                    onValueChange={(value) => handleInputChange('donationType', value)}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one-time" id="one-time" />
                      <Label htmlFor="one-time" className="font-medium">One-time donation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="recurring" id="recurring" />
                      <Label htmlFor="recurring" className="font-medium">Monthly recurring</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Payment Provider Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-700">
                  Payment Method *
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentProviders.map((provider) => {
                    const Icon = providerIcons[provider.id];
                    const isSupported = formData.donationType === 'one-time' || provider.supportedTypes.includes('recurring');
                    
                    return (
                      <div
                        key={provider.id}
                        className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          formData.provider === provider.id
                            ? 'border-[#FE6F5E] bg-[#FE6F5E]/5 shadow-md'
                            : isSupported
                            ? 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                            : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                        }`}
                        onClick={() => isSupported && handleInputChange('provider', provider.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-6 h-6 ${formData.provider === provider.id ? 'text-[#FE6F5E]' : 'text-gray-500'}`} />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{provider.name}</div>
                            <div className="text-sm text-gray-600">{provider.description}</div>
                          </div>
                        </div>
                        {!isSupported && formData.donationType === 'recurring' && (
                          <div className="absolute top-2 right-2">
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                              No recurring
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Donor Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="donorName" className="text-lg font-semibold text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="donorName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.donorName}
                    onChange={(e) => handleInputChange('donorName', e.target.value)}
                    className="h-12 text-lg border-2 border-gray-200 focus:border-[#FE6F5E] transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donorEmail" className="text-lg font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="donorEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.donorEmail}
                    onChange={(e) => handleInputChange('donorEmail', e.target.value)}
                    className="h-12 text-lg border-2 border-gray-200 focus:border-[#FE6F5E] transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-lg font-semibold text-gray-700">
                  Message of Support (Optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Share why you're supporting our mission..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="min-h-[100px] text-lg border-2 border-gray-200 focus:border-[#FE6F5E] transition-colors resize-none"
                  rows={4}
                />
              </div>

              {/* Preview */}
              {formData.amount && formData.donorName && formData.provider && (
                <div className="p-6 bg-gradient-to-r from-[#FE6F5E]/10 to-[#FE4A36]/10 border-2 border-[#FE6F5E]/20 rounded-lg">
                  <h3 className="font-semibold text-[#FE4A36] mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Payment Summary
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-bold">${parseFloat(formData.amount || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Donor:</span>
                      <span className="font-semibold">{formData.donorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span className="font-semibold">{selectedProvider?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-semibold capitalize">{formData.donationType.replace('-', ' ')}</span>
                    </div>
                    {formData.message && (
                      <div className="mt-3 pt-3 border-t border-[#FE6F5E]/20">
                        <div className="italic text-sm">"{formData.message}"</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !formData.amount || !formData.donorName || !formData.provider}
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-[#FE6F5E] to-[#FE4A36] hover:from-[#FE4A36] hover:to-[#FE6F5E] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                    Processing Payment...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6" />
                    Donate ${formData.amount || '0'} Now
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

export default DonationForm;