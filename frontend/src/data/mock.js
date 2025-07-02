// Mock data for donations goal tracker
export const mockGoal = {
  id: "goal-1",
  title: "Open Source Project Funding",
  description: "Help us build amazing open source tools for the community",
  targetAmount: 10000,
  currentAmount: 6750,
  currency: "USD",
  createdAt: "2025-01-01",
  endDate: "2025-12-31"
};

export const mockMilestones = [
  {
    id: "milestone-1",
    amount: 2500,
    title: "Development Tools",
    description: "Purchase professional development tools and licenses",
    reward: "Contributors get access to premium development resources",
    achieved: true,
    achievedDate: "2025-02-15"
  },
  {
    id: "milestone-2", 
    amount: 5000,
    title: "Server Infrastructure",
    description: "Set up reliable hosting and CI/CD pipeline",
    reward: "24/7 uptime and automated deployments",
    achieved: true,
    achievedDate: "2025-04-20"
  },
  {
    id: "milestone-3",
    amount: 7500,
    title: "Mobile App Development",
    description: "Start development of mobile companion app",
    reward: "Beta access to mobile app for all contributors",
    achieved: false,
    achievedDate: null
  },
  {
    id: "milestone-4",
    amount: 10000,
    title: "Full Feature Set",
    description: "Complete all planned features and documentation",
    reward: "Lifetime premium access for all early supporters",
    achieved: false,
    achievedDate: null
  }
];

export const mockDonations = [
  {
    id: "donation-1",
    amount: 500,
    donorName: "Anonymous",
    message: "Great project! Keep up the good work.",
    date: "2025-01-15",
    type: "one-time"
  },
  {
    id: "donation-2",
    amount: 1000,
    donorName: "John Smith",
    message: "Happy to support open source development",
    date: "2025-02-01",
    type: "one-time"
  },
  {
    id: "donation-3",
    amount: 250,
    donorName: "Sarah Johnson",
    message: "Love what you're building!",
    date: "2025-02-10",
    type: "monthly"
  },
  {
    id: "donation-4",
    amount: 2000,
    donorName: "TechCorp Inc",
    message: "Corporate sponsorship for Q1",
    date: "2025-02-14",
    type: "corporate"
  },
  {
    id: "donation-5",
    amount: 750,
    donorName: "DevCommunity",
    message: "From the developer community with love",
    date: "2025-03-01",
    type: "community"
  },
  {
    id: "donation-6",
    amount: 1500,
    donorName: "Anonymous",
    message: "Excited for the mobile app!",
    date: "2025-04-15",
    type: "one-time"
  },
  {
    id: "donation-7",
    amount: 750,
    donorName: "CodeMaster",
    message: "Thanks for making development easier",
    date: "2025-05-01",
    type: "one-time"
  }
];

// Helper functions for mock data manipulation
export const addDonation = (donation) => {
  const newDonation = {
    ...donation,
    id: `donation-${Date.now()}`,
    date: new Date().toISOString().split('T')[0]
  };
  mockDonations.unshift(newDonation);
  mockGoal.currentAmount += donation.amount;
  return newDonation;
};

export const addMilestone = (milestone) => {
  const newMilestone = {
    ...milestone,
    id: `milestone-${Date.now()}`,
    achieved: false,
    achievedDate: null
  };
  mockMilestones.push(newMilestone);
  mockMilestones.sort((a, b) => a.amount - b.amount);
  return newMilestone;
};

export const updateGoal = (updates) => {
  Object.assign(mockGoal, updates);
  return mockGoal;
};

export const getProgressPercentage = () => {
  return Math.min((mockGoal.currentAmount / mockGoal.targetAmount) * 100, 100);
};

export const getNextMilestone = () => {
  return mockMilestones.find(m => !m.achieved && m.amount > mockGoal.currentAmount);
};

export const getAchievedMilestones = () => {
  return mockMilestones.filter(m => m.achieved);
};