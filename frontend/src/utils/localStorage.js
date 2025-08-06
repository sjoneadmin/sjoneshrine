// localStorage utilities for donations tracking
const STORAGE_KEYS = {
  DONATIONS: 'sjone_shrine_donations',
  GOAL: 'sjone_shrine_goal',
  MILESTONES: 'sjone_shrine_milestones',
  VERSION: 'sjone_shrine_version'
};

// Content version - increment this when mission statement or milestones change
const CONTENT_VERSION = '1.7';

// Default data
const defaultGoal = {
  id: "goal-1",
  title: "Sjòne Shrine Inc.",
  subtitle: "Supporting Future Leaders with armament to rise, and tools to stay.",
  description: "Sjòne Shrine is a non- profit, providing ceremonial coded programs based on clinical, cyber, and self-hood focused disciplines.",
  targetAmount: 100000,
  currentAmount: 5750,
  currency: "USD",
  createdAt: "2025-01-01",
  endDate: "2025-12-31"
};

const defaultMilestones = [
  {
    id: "milestone-1",
    amount: 20000,
    phase: "I",
    title: "Research & Visioning",
    description: "Sjòne Shrine is a non- profit, providing ceremonial coded programs based on clinical, cyber, and self-hood focused disciplines.",
    reward: "Foundation research and community engagement",
    achieved: false,
    achievedDate: null,
    percentage: 20
  },
  {
    id: "milestone-2", 
    amount: 25000,
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
    amount: 50000,
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
    amount: 75000,
    phase: "IV",
    title: "Infrastructure & Equipment",
    description: "Development and installation of core infrastructure and specialized equipment for in-house administration and program support.",
    reward: "Equipment procurement and infrastructure setup",
    achieved: false,
    achievedDate: null,
    percentage: 75
  },
  {
    id: "milestone-5",
    amount: 100000,
    phase: "V",
    title: "Buildout & Programming",
    description: "Development and installation of core infrastructure, encompassing administrative systems, communication platforms, program development environments, and digital frameworks, to ensure efficient in-house administration and effective delivery of integrated clinical, cyber, and self-empowerment fields.",
    reward: "Full program launch and community access",
    achieved: false,
    achievedDate: null,
    percentage: 100
  }
];

const defaultDonations = [
  {
    id: "donation-1",
    amount: 200,
    donorName: "Sarah M.",
    donorEmail: "sarah.m@email.com",
    message: "Supporting your mission for future female leaders!",
    date: "2025-01-15",
    type: "one-time",
    provider: "paypal",
    status: "completed"
  },
  {
    id: "donation-2",
    amount: 150,
    donorName: "Anonymous",
    donorEmail: "",
    message: "Excited to contribute to this important work.",
    date: "2025-02-03",
    type: "one-time",
    provider: "nbkc_payment",
    status: "completed"
  },
  {
    id: "donation-3",
    amount: 100,
    donorName: "Maria Rodriguez",
    donorEmail: "m.rodriguez@email.com",
    message: "",
    date: "2025-02-18",
    type: "one-time",
    provider: "paypal",
    status: "completed"
  },
  {
    id: "donation-4",
    amount: 50,
    donorName: "Ema Zine",
    donorEmail: "contact@emazine.org",
    message: "From our community with love and support for your ceremonial programs.",
    date: "2025-03-05",
    type: "one-time",
    provider: "nbkc_payment",
    status: "completed"
  }
];

// Initialize data if not exists
export const initializeData = () => {
  // Check if content needs updating based on version
  const currentVersion = localStorage.getItem(STORAGE_KEYS.VERSION);
  
  if (currentVersion !== CONTENT_VERSION) {
    console.log(`🔄 Content version mismatch (${currentVersion} vs ${CONTENT_VERSION}). Force updating all data...`);
    
    // Force update all data to latest versions
    localStorage.setItem(STORAGE_KEYS.GOAL, JSON.stringify(defaultGoal));
    localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(defaultMilestones));
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(defaultDonations));
    localStorage.setItem(STORAGE_KEYS.VERSION, CONTENT_VERSION);
    
    console.log('✅ All data force updated to version', CONTENT_VERSION);
  } else {
    // Normal initialization for new users only
    if (!localStorage.getItem(STORAGE_KEYS.GOAL)) {
      localStorage.setItem(STORAGE_KEYS.GOAL, JSON.stringify(defaultGoal));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MILESTONES)) {
      localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(defaultMilestones));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(defaultDonations));
    }
  }
};

// Force update mission statement - call this when content needs to be updated
export const updateMissionStatement = () => {
  // Force complete reset of goal data with latest default
  localStorage.setItem(STORAGE_KEYS.GOAL, JSON.stringify(defaultGoal));
  
  // Force complete reset of milestone data with latest defaults
  localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(defaultMilestones));
  
  console.log('✅ Mission statement and milestones force updated');
};

// Force update milestone descriptions to latest versions
export const updateMilestoneDescriptions = () => {
  // Force update all milestone descriptions to match default data
  localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(defaultMilestones));
  console.log('✅ Milestone descriptions updated to latest versions');
};

// Clean up test donations and reset to verified donations only
export const cleanupTestDonations = () => {
  // Reset donations to only verified default donations
  localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(defaultDonations));
  
  // Reset goal to default amounts (verified total)
  localStorage.setItem(STORAGE_KEYS.GOAL, JSON.stringify(defaultGoal));
  
  // Force update milestones to ensure latest descriptions are used
  localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(defaultMilestones));
  
  // Update milestone achievements based on verified amounts
  updateMilestoneAchievements();
};

// Admin function to manually add verified donations
export const addVerifiedDonation = (donationData) => {
  const donation = {
    id: `verified-donation-${Date.now()}`,
    amount: parseFloat(donationData.amount),
    donorName: donationData.donorName || "Anonymous",
    donorEmail: donationData.donorEmail || "",
    message: donationData.message || "",
    date: donationData.date || new Date().toISOString().split('T')[0],
    type: "one-time",
    provider: donationData.provider || "manual_verification",
    status: "completed"
  };
  
  const donations = getDonations();
  donations.unshift(donation);
  localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  
  // Update goal current amount
  const goal = getGoal();
  goal.currentAmount += donation.amount;
  updateGoal(goal);
  
  // Update milestone achievements
  updateMilestoneAchievements();
  
  console.log('✅ Verified donation added:', donation);
  return donation;
};

// Admin function to view current total for verification
export const getVerificationSummary = () => {
  const goal = getGoal();
  const donations = getDonations();
  
  const summary = {
    totalRaised: goal.currentAmount,
    totalDonations: donations.length,
    goal: goal.targetAmount,
    percentage: ((goal.currentAmount / goal.targetAmount) * 100).toFixed(2),
    recentDonations: donations.slice(0, 5)
  };
  
  console.log('📊 Current Summary:', summary);
  return summary;
};

// Goal functions
export const getGoal = () => {
  const goal = localStorage.getItem(STORAGE_KEYS.GOAL);
  return goal ? JSON.parse(goal) : defaultGoal;
};

export const updateGoal = (goalData) => {
  localStorage.setItem(STORAGE_KEYS.GOAL, JSON.stringify(goalData));
  return goalData;
};

// Milestone functions
export const getMilestones = () => {
  const milestones = localStorage.getItem(STORAGE_KEYS.MILESTONES);
  return milestones ? JSON.parse(milestones) : defaultMilestones;
};

export const updateMilestones = (milestonesData) => {
  localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(milestonesData));
  return milestonesData;
};

// Donation functions
export const getDonations = () => {
  const donations = localStorage.getItem(STORAGE_KEYS.DONATIONS);
  return donations ? JSON.parse(donations) : defaultDonations;
};

export const addDonation = (donation) => {
  const donations = getDonations();
  const newDonation = {
    ...donation,
    id: `donation-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: "completed"
  };
  
  donations.unshift(newDonation);
  localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  
  // Update goal current amount
  const goal = getGoal();
  goal.currentAmount += donation.amount;
  updateGoal(goal);
  
  // Update milestone achievements
  updateMilestoneAchievements();
  
  return newDonation;
};

export const updateMilestoneAchievements = () => {
  const milestones = getMilestones();
  const goal = getGoal();
  
  milestones.forEach(milestone => {
    if (!milestone.achieved && goal.currentAmount >= milestone.amount) {
      milestone.achieved = true;
      milestone.achievedDate = new Date().toISOString().split('T')[0];
    }
  });
  
  updateMilestones(milestones);
};

// Helper functions
export const getProgressPercentage = () => {
  const goal = getGoal();
  return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
};

export const getNextMilestone = () => {
  const milestones = getMilestones();
  const goal = getGoal();
  return milestones.find(m => !m.achieved && m.amount > goal.currentAmount);
};

export const getAchievedMilestones = () => {
  const milestones = getMilestones();
  return milestones.filter(m => m.achieved);
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

// Payment provider information
export const paymentProviders = [
  {
    id: "nbkc_payment",
    name: "Bank",
    description: "FDIC Secure transaction network",
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