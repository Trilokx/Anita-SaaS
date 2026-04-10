export interface ServiceTier {
  name: string;
  priceMin: number;
  priceMax: number;
  label?: string;
  isPercentage?: boolean;
  features: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  tiers: ServiceTier[];
}

export interface BundlePackage {
  id: string;
  name: string;
  tagline: string;
  priceMin: number;
  priceMax: number;
  selections: Record<string, number>;
  highlight?: boolean;
}

export const SERVICES: ServiceCategory[] = [
  {
    id: 'website',
    name: 'Website Management',
    icon: 'globe',
    tiers: [
      {
        name: 'Basic',
        priceMin: 500,
        priceMax: 800,
        features: ['Hosting & updates', 'Minor edits', 'Uptime monitoring']
      },
      {
        name: 'Standard',
        priceMin: 800,
        priceMax: 1500,
        features: ['Everything in Basic', 'SEO optimization', 'Speed tuning', 'Monthly report']
      },
      {
        name: 'Premium',
        priceMin: 1500,
        priceMax: 3000,
        features: ['Everything in Standard', 'Redesigns & landing pages', 'A/B testing', 'Priority support']
      }
    ]
  },
  {
    id: 'aiChat',
    name: 'AI Chat Agent',
    icon: 'bot',
    tiers: [
      {
        name: 'Starter',
        priceMin: 300,
        priceMax: 600,
        features: ['Pre-built bot', 'FAQ setup', 'Basic lead capture']
      },
      {
        name: 'Custom',
        priceMin: 800,
        priceMax: 2000,
        features: ['Custom-trained agent', 'CRM integration', 'Human handoff']
      },
      {
        name: 'Enterprise',
        priceMin: 2000,
        priceMax: 5000,
        features: ['Multi-channel', 'Analytics dashboard', 'Ongoing tuning', 'Priority SLA']
      }
    ]
  },
  {
    id: 'social',
    name: 'Social Media',
    icon: 'megaphone',
    tiers: [
      {
        name: 'Basic',
        priceMin: 500,
        priceMax: 800,
        features: ['3 posts/week', '1 platform', 'Captions + graphics']
      },
      {
        name: 'Growth',
        priceMin: 1000,
        priceMax: 2000,
        features: ['Daily posts', '2–3 platforms', 'Stories + scheduling']
      },
      {
        name: 'Full-Service',
        priceMin: 2500,
        priceMax: 5000,
        features: ['Above + strategy', 'Analytics', 'Community management']
      }
    ]
  },
  {
    id: 'ads',
    name: 'Ad Campaigns',
    icon: 'target',
    tiers: [
      {
        name: 'Starter',
        priceMin: 500,
        priceMax: 750,
        features: ['Up to $2k ad spend', 'Campaign setup', 'Basic reporting']
      },
      {
        name: 'Standard',
        priceMin: 750,
        priceMax: 1500,
        features: ['$2k–$10k ad spend', 'A/B testing', 'Bi-weekly reports']
      },
      {
        name: 'Premium',
        priceMin: 0,
        priceMax: 0,
        isPercentage: true,
        label: '10–15% of spend',
        features: ['$10k+ ad spend', 'Dedicated manager', 'Full analytics suite']
      }
    ]
  }
];

export const BUNDLES: BundlePackage[] = [
  {
    id: 'starter',
    name: 'Starter Bundle',
    tagline: 'Perfect for getting started',
    priceMin: 750,
    priceMax: 1250,
    selections: { website: 0, social: 0 }
  },
  {
    id: 'growth',
    name: 'Growth Bundle',
    tagline: 'Scale your online presence',
    priceMin: 1500,
    priceMax: 2500,
    selections: { website: 1, social: 1, ads: 0 },
    highlight: true
  },
  {
    id: 'fullstack',
    name: 'Full-Stack',
    tagline: 'Everything, fully managed',
    priceMin: 2500,
    priceMax: 5000,
    selections: { website: 2, aiChat: 1, social: 2, ads: 1 }
  }
];

export const SETUP_FEE = { min: 500, max: 3000 };
