import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import ProgressLogo from './ProgressLogo';
import { 
  getGoal, 
  getMilestones, 
  getDonations, 
  getProgressPercentage, 
  getNextMilestone, 
  getCurrentPhase,
  initializeData
} from '../utils/localStorage';
import { Target, Trophy, DollarSign, Users, Calendar, Gift, Gamepad2, Heart } from 'lucide-react';

const Dashboard = () => {
  const [goal, setGoal] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [donations, setDonations] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initialize data on first load
    initializeData();
    
    // Load data from localStorage
    setGoal(getGoal());
    setMilestones(getMilestones());
    setDonations(getDonations());
    setProgress(getProgressPercentage());
  }, []);

  if (!goal) return <div>Loading...</div>;

  const nextMilestone = getNextMilestone();
  const recentDonations = donations.slice(0, 5);
  const achievedMilestones = milestones.filter(m => m.achieved);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#F47E7E] via-[#FF1493] to-[#E8452E]">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white space-y-6">
                <h1 className="text-5xl font-black leading-tight">
                  {goal.title}
                  <span className="block text-2xl font-normal text-orange-100 mt-2">
                    {goal.subtitle}
                  </span>
                </h1>
                <p className="text-xl text-orange-100 leading-relaxed">
                  {goal.description}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <DollarSign className="w-8 h-8" />
                    <div>
                      <div className="text-4xl font-bold">
                        ${goal.currentAmount.toLocaleString()}
                      </div>
                      <div className="text-orange-200">
                        of ${goal.targetAmount.toLocaleString()} goal
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-6 h-6" />
                      <span className="text-xl">{donations.length} supporters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-6 h-6" />
                      <span className="text-xl">Phase {getCurrentPhase()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <ProgressLogo size={350} className="transform hover:scale-105 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full opacity-10 transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-400 rounded-full opacity-10 transform -translate-x-32 translate-y-32"></div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-[#F47E7E] to-[#FF1493] rounded-xl">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{progress.toFixed(1)}%</div>
                    <div className="text-gray-600">Goal Progress</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{achievedMilestones.length}</div>
                    <div className="text-gray-600">Phases Complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${donations.length > 0 ? (goal.currentAmount / donations.length).toFixed(0) : '0'}
                    </div>
                    <div className="text-gray-600">Avg Donation</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${(goal.targetAmount - goal.currentAmount).toLocaleString()}
                    </div>
                    <div className="text-gray-600">Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Milestones */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                    <Trophy className="w-8 h-8 text-[#F47E7E]" />
                    Development Phases
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={milestone.id} className="relative">
                      <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        milestone.achieved 
                          ? 'bg-gradient-to-r from-[#F47E7E]/10 to-[#FF1493]/10 border-[#F47E7E] shadow-lg' 
                          : milestone.amount <= goal.currentAmount
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400 shadow-lg animate-pulse'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge variant={milestone.achieved ? "default" : "secondary"} className="text-lg px-4 py-2 bg-gradient-to-r from-[#F47E7E] to-[#FF1493] text-white">
                                Phase {milestone.phase}
                              </Badge>
                              <Badge variant={milestone.achieved ? "default" : "secondary"} className="text-base px-3 py-1">
                                ${milestone.amount.toLocaleString()} | {milestone.percentage}%
                              </Badge>
                              {milestone.achieved && (
                                <Badge className="bg-green-500 hover:bg-green-600 text-white">
                                  ✓ Complete
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">{milestone.description}</p>
                            <div className="flex items-start gap-2 text-[#F47E7E]">
                              <Gift className="w-5 h-5 mt-0.5 flex-shrink-0" />
                              <span className="font-medium">{milestone.reward}</span>
                            </div>
                            {milestone.achievedDate && (
                              <div className="mt-3 text-sm text-green-600 font-medium">
                                Completed on {new Date(milestone.achievedDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Progress bar for this milestone */}
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{Math.min((goal.currentAmount / milestone.amount) * 100, 100).toFixed(1)}%</span>
                          </div>
                          <Progress 
                            value={Math.min((goal.currentAmount / milestone.amount) * 100, 100)} 
                            className="h-3 bg-gray-200"
                          />
                        </div>
                      </div>
                      
                      {/* Connector line */}
                      {index < milestones.length - 1 && (
                        <div className="absolute left-1/2 bottom-0 w-1 h-6 bg-gradient-to-b from-[#F47E7E]/50 to-gray-200 transform translate-y-full"></div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Donations */}
            <div>
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl font-bold">
                    <Users className="w-6 h-6 text-[#F47E7E]" />
                    Recent Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentDonations.map((donation) => (
                    <div key={donation.id} className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-[#F47E7E]/20 hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-gray-900">{donation.donorName}</div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge className="bg-gradient-to-r from-[#F47E7E] to-[#FF1493] text-white">
                            ${donation.amount}
                          </Badge>
                          <span className="text-xs text-gray-500 capitalize">
                            {donation.provider === 'nbkc_payment' ? 'Bank' : donation.provider === 'paypal' ? 'PayPal' : donation.provider}
                          </span>
                        </div>
                      </div>
                      {donation.message && (
                        <p className="text-sm text-gray-600 mb-2">"{donation.message}"</p>
                      )}
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{new Date(donation.date).toLocaleDateString()}</span>
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${donation.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                          <span className="capitalize">{donation.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Next Milestone */}
              {nextMilestone && (
                <Card className="mt-6 shadow-xl border-0 bg-gradient-to-r from-[#F47E7E]/10 to-[#FF1493]/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg font-bold text-[#FF1493]">
                      <Target className="w-6 h-6" />
                      Next Phase
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#F47E7E] text-white">Phase {nextMilestone.phase}</Badge>
                        <span className="text-2xl font-bold text-[#FF1493]">
                          ${nextMilestone.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-[#FF1493] font-medium">{nextMilestone.title}</div>
                      <div className="text-sm text-gray-700 mb-3">{nextMilestone.description}</div>
                      <Progress 
                        value={(goal.currentAmount / nextMilestone.amount) * 100} 
                        className="h-3"
                      />
                      <div className="text-sm text-[#FF1493] font-medium">
                        ${(nextMilestone.amount - goal.currentAmount).toLocaleString()} remaining
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;