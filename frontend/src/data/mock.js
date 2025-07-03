// Mock data for Sjòne Shrine Inc. donations goal tracker
export const mockGoal = {
  id: "goal-1",
  title: "Sjòne Shrine Inc.",
  subtitle: "Supporting Emerging Future Female Leaders",
  description: "Sjòne Shrine Inc. supports emerging future female leaders for virtual athletic performance. These contributions help sustain resources for those seeking E-Sports coaching, recreational therapy, and gear.",
  targetAmount: 50000,
  currentAmount: 2750,
  currency: "USD",
  createdAt: "2025-01-01",
  endDate: "2025-12-31"
};

export const mockMilestones = [
  {
    id: "milestone-1",
    amount: 10000,
    phase: "I",
    title: "Research & Visioning",
    description: "Sjòne Shrine Inc. supports emerging future female leaders for virtual athletic performance. These contributions help sustain resources for those seeking E-Sports coaching, recreational therapy, and gear.",
    reward: "Foundation research and community engagement",
    achieved: false,
    achievedDate: null,
    percentage: 20
  },
  {
    id: "milestone-2", 
    amount: 12500,
    phase: "II",
    title: "Architectural Planning",
    description: "Architectural planning is in progress consulting with licensed professionals and project advisors.",
    reward: "Professional architectural consultation and planning documentation",
    achieved: false,
    achievedDate: null,
    percentage: 25
  },
  {
    id: "milestone-3",
    amount: 25000,
    phase: "III",
    title: "Ground Breaking",
    description: "This milestone marks a turning point in our development process, enabling us to move forward with infrastructure development.",
    reward: "Infrastructure development initiation and site preparation",
    achieved: false,
    achievedDate: null,
    percentage: 50
  },
  {
    id: "milestone-4",
    amount: 37500,
    phase: "IV",
    title: "Infrastructure & Equipment",
    description: "Development and installation of core infrastructure and specialized equipment for E-Sports coaching and recreational therapy programs.",
    reward: "Equipment procurement and infrastructure setup",
    achieved: false,
    achievedDate: null,
    percentage: 75
  },
  {
    id: "milestone-5",
    amount: 50000,
    phase: "V",
    title: "Buildout & Programming",
    description: "Complete facility buildout and launch of comprehensive programming for E-Sports coaching, recreational therapy, and community engagement.",
    reward: "Full program launch and community access",
    achieved: false,
    achievedDate: null,
    percentage: 100
  }
];

export const mockDonations = [
  {
    id: "donation-1",
    amount: 500,
    donorName: "Anonymous",
    donorEmail: "donor1@example.com",
    message: "Excited to support female leaders in E-Sports!",
    date: "2025-01-15",
    type: "one-time",
    provider: "nbkc_payment",
    status: "completed"
  },
  {
    id: "donation-2",
    amount: 250,
    donorName: "Sarah Gaming",
    donorEmail: "sarah@example.com",
    message: "This is exactly what the gaming community needs.",
    date: "2025-02-01",
    type: "one-time",
    provider: "paypal",
    status: "completed"
  },
  {
    id: "donation-3",
    amount: 100,
    donorName: "Tech Sisters",
    donorEmail: "contact@techsisters.org",
    message: "Supporting the next generation of female gamers!",
    date: "2025-02-10",
    type: "one-time",
    provider: "nbkc_payment",
    status: "completed"
  },
  {
    id: "donation-4",
    amount: 1000,
    donorName: "GameCorp Foundation",
    donorEmail: "foundation@gamecorp.com",
    message: "Initial corporate support - looking forward to the progress!",
    date: "2025-02-14",
    type: "one-time",
    provider: "paypal",
    status: "completed"
  },
  {
    id: "donation-5",
    amount: 150,
    donorName: "E-Sports Community",
    donorEmail: "community@esports.org",
    message: "From the E-Sports community with love and support",
    date: "2025-03-01",
    type: "one-time",
    provider: "nbkc_payment",
    status: "completed"
  },
  {
    id: "donation-6",
    amount: 300,
    donorName: "Female Gamers United",
    donorEmail: "unite@femalegamers.org",
    message: "Small contribution to get started!",
    date: "2025-04-15",
    type: "one-time",
    provider: "paypal",
    status: "completed"
  },
  {
    id: "donation-7",
    amount: 450,
    donorName: "Community Supporter",
    donorEmail: "supporter@donor.com",
    message: "",
    date: "2025-04-20",
    type: "one-time",
    provider: "nbkc_payment",
    status: "completed"
  }
];

// Payment provider information
export const paymentProviders = [
  {
    id: "nbkc_payment",
    name: "Bank",
    description: "Secure payment through NBKC Bank",
    supportedTypes: ["one-time"],
    icon: "🏦",
    hasPaymentLink: true,
    hasQRCode: false
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Pay securely with PayPal",
    supportedTypes: ["one-time"],
    icon: "💳",
    hasPaymentLink: true,
    hasQRCode: false
  }
];

// Helper functions for mock data manipulation
export const addDonation = (donation) => {
  const newDonation = {
    ...donation,
    id: `donation-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: "completed"
  };
  mockDonations.unshift(newDonation);
  mockGoal.currentAmount += donation.amount;
  
  // Update milestone achievements
  updateMilestoneAchievements();
  
  return newDonation;
};

export const updateMilestoneAchievements = () => {
  mockMilestones.forEach(milestone => {
    if (!milestone.achieved && mockGoal.currentAmount >= milestone.amount) {
      milestone.achieved = true;
      milestone.achievedDate = new Date().toISOString().split('T')[0];
    }
  });
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

export const getCurrentPhase = () => {
  const achieved = getAchievedMilestones();
  return achieved.length > 0 ? achieved[achieved.length - 1].phase : "Starting";
};

export const getLeafProgress = () => {
  const progress = getProgressPercentage();
  const leafCount = 7;
  const progressPerLeaf = 100 / leafCount;
  const filledLeaves = Math.floor(progress / progressPerLeaf);
  const partialLeafProgress = (progress % progressPerLeaf) / progressPerLeaf;
  
  return {
    filledLeaves,
    partialLeafProgress,
    totalLeaves: leafCount
  };
};