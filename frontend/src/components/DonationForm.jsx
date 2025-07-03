import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { addDonation, paymentProviders } from '../data/mock';
import { Heart, ExternalLink, Building, DollarSign, CreditCard, CheckCircle, Download } from 'lucide-react';

const DonationForm = ({ onDonationAdded }) => {
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    donorEmail: '',
    message: '',
    provider: '',
    donationType: 'one-time'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [donationDetails, setDonationDetails] = useState(null);
  const { toast } = useToast();

  // Actual payment links
  const NBKC_PAYMENT_LINK = "https://app.autobooks.co/pay/kimatrices-1";
  const PAYPAL_PAYMENT_LINK = "https://paypal.me/SjoneShrine";

  const providerIcons = {
    nbkc_payment: Building,
    paypal: CreditCard
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
        description: "Please fill in the amount, donor name, and select a payment method.",
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

    // Show payment information instead of processing immediately
    setShowPaymentInfo(true);
  };

  const handlePaymentComplete = () => {
    const donation = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    const newDonation = addDonation(donation);
    
    toast({
      title: "Thank You! 🎉",
      description: `Your $${donation.amount} donation has been recorded. Thank you for supporting our mission!`,
    });
    
    // Reset form
    setFormData({
      amount: '',
      donorName: '',
      donorEmail: '',
      message: '',
      provider: '',
      donationType: 'one-time'
    });
    
    setShowPaymentInfo(false);
    
    // Notify parent component
    if (onDonationAdded) {
      onDonationAdded(newDonation);
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
              <Building className="w-8 h-8 text-[#FE6F5E]" />
              {showPaymentInfo ? "Complete Your Donation" : "Donation Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {!showPaymentInfo ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Payment Provider Selection */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-700">
                    Payment Method *
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentProviders.map((provider) => {
                      const Icon = providerIcons[provider.id];
                      
                      return (
                        <div
                          key={provider.id}
                          className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.provider === provider.id
                              ? 'border-[#FE6F5E] bg-[#FE6F5E]/5 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                          onClick={() => handleInputChange('provider', provider.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-6 h-6 ${formData.provider === provider.id ? 'text-[#FE6F5E]' : 'text-gray-500'}`} />
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900">{provider.name}</div>
                              <div className="text-sm text-gray-600">{provider.description}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
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
                      <Building className="w-5 h-5" />
                      Donation Summary
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
                  disabled={!formData.amount || !formData.donorName || !formData.provider}
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-[#FE6F5E] to-[#FE4A36] hover:from-[#FE4A36] hover:to-[#FE6F5E] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6" />
                    Continue to Payment
                  </div>
                </Button>
              </form>
            ) : (
              /* Payment Information Display */
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Complete Your ${formData.amount} Donation
                  </h3>
                  <p className="text-gray-600">
                    {formData.provider === 'nbkc_payment' 
                      ? 'Use either the payment link or scan the QR code below'
                      : 'Click the button below to complete your PayPal payment'
                    }
                  </p>
                </div>

                {/* Payment Link Option */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    {formData.provider === 'nbkc_payment' ? 'Option 1: Payment Link' : 'PayPal Payment'}
                  </h4>
                  <p className="text-blue-800 mb-4">
                    {formData.provider === 'nbkc_payment' 
                      ? 'Click the button below to open the NBKC payment portal:'
                      : 'Click the button below to complete your payment via PayPal:'
                    }
                  </p>
                  <Button
                    onClick={() => window.open(
                      formData.provider === 'nbkc_payment' ? NBKC_PAYMENT_LINK : PAYPAL_PAYMENT_LINK, 
                      '_blank'
                    )}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {formData.provider === 'nbkc_payment' 
                      ? 'Open NBKC Payment Portal' 
                      : 'Pay with PayPal'
                    }
                  </Button>
                </div>

                {/* QR Code Option - Only for NBKC */}
                {formData.provider === 'nbkc_payment' && (
                  <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-2 border-green-200">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                      <QrCode className="w-5 h-5" />
                      Option 2: QR Code
                    </h4>
                    <p className="text-green-800 mb-4">Scan this QR code with your mobile device:</p>
                    <div className="flex justify-center">
                      <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                        <img 
                          src={NBKC_QR_CODE} 
                          alt="NBKC Payment QR Code" 
                          className="w-48 h-48 mx-auto"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Instructions:</h4>
                  <ol className="list-decimal list-inside text-yellow-800 space-y-1">
                    {formData.provider === 'nbkc_payment' ? (
                      <>
                        <li>Use either the payment link or QR code above</li>
                        <li>Complete your ${formData.amount} donation through NBKC</li>
                        <li>Return here and click "I've Completed Payment" below</li>
                      </>
                    ) : (
                      <>
                        <li>Click the PayPal button above</li>
                        <li>Complete your ${formData.amount} donation through PayPal</li>
                        <li>Return here and click "I've Completed Payment" below</li>
                      </>
                    )}
                  </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowPaymentInfo(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    ← Back to Form
                  </Button>
                  <Button
                    onClick={handlePaymentComplete}
                    className="flex-1 bg-gradient-to-r from-[#FE6F5E] to-[#FE4A36] hover:from-[#FE4A36] hover:to-[#FE6F5E] text-white"
                  >
                    I've Completed Payment ✓
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationForm;