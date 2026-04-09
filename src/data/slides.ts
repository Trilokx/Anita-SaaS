import { Slide } from '../types/slide';

export const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Why Your Business Is Invisible on Google",
    content: [
      "Customers are searching… but not finding YOU",
      "Your competitors are getting YOUR customers",
      "Your business looks inactive or doesn't exist online"
    ],
    illustration: {
      type: 'mockup',
      description: "Google Search Mockup showing competitors with 5 stars vs an unclaimed, empty profile.",
      imageUrl: "https://picsum.photos/seed/google-search/800/600"
    },
    accentColor: "text-[#FF3131]"
  },
  {
    id: 2,
    title: "Invisible = Lost Revenue Every Day",
    content: [
      "80% of customers search online before buying",
      "If you don't appear → you don't exist",
      "Slow replies = lost customers",
      "No system = missed opportunities"
    ],
    illustration: {
      type: 'diagram',
      description: "Funnel diagram showing searches leading to clicks, then customers, with a leaking funnel.",
      imageUrl: "https://picsum.photos/seed/lost-revenue/800/600"
    },
    accentColor: "text-[#B2FF05]"
  },
  {
    id: 3,
    title: "The 3 Biggest Problems",
    content: [
      "No Google presence (SEO / Maps)",
      "Weak or no social media",
      "No follow-up system (lost leads)"
    ],
    illustration: {
      type: 'grid',
      description: "Three broken icons: Greyed out Google, low engagement Instagram, and a silent chat bubble.",
    },
    accentColor: "text-[#FF3131]"
  },
  {
    id: 4,
    title: "Why Your Marketing Isn't Working",
    content: [
      "Posting randomly ≠ strategy",
      "No website = no trust",
      "No automation = missed sales"
    ],
    illustration: {
      type: 'comparison',
      description: "Before vs After: Chaotic, unstructured posts vs a clean, structured system.",
      beforeAfter: {
        before: "Chaotic & Random",
        after: "Structured & Strategic"
      }
    },
    accentColor: "text-[#BF40BF]"
  },
  {
    id: 5,
    title: "We Turn Visibility Into Customers",
    content: [
      "SEO & Google optimization",
      "Social media strategy",
      "Website creation",
      "AI automation systems"
    ],
    illustration: {
      type: 'diagram',
      description: "Clean modern brand visual with arrows: Visibility → Engagement → Conversion.",
      imageUrl: "https://picsum.photos/seed/elevate-intro/800/600"
    },
    accentColor: "text-[#B2FF05]"
  },
  {
    id: 6,
    title: "Step 1: Get Found on Google",
    content: [
      "Google Business Profile optimization",
      "SEO (rank on search)",
      "Reviews strategy"
    ],
    illustration: {
      type: 'reviews',
      description: "Comparison of a low-ranked business with 1 star vs a high-ranked business with 5 stars.",
      beforeAfter: {
        before: "Low Rank (1.2 ⭐)",
        after: "High Rank (4.9 ⭐)"
      }
    },
    accentColor: "text-[#B2FF05]"
  },
  {
    id: 7,
    title: "Step 2: Turn Visitors Into Customers",
    content: [
      "Modern website",
      "Fast, mobile-friendly",
      "Clear call-to-action"
    ],
    illustration: {
      type: 'mockup',
      description: "Mock website showing Book Now and Call Now buttons with a clean premium design.",
      imageUrl: "https://picsum.photos/seed/website-conversion/800/600"
    },
    accentColor: "text-[#BF40BF]"
  },
  {
    id: 8,
    title: "Step 3: Build Trust & Demand",
    content: [
      "Content strategy",
      "Consistent posting",
      "Brand positioning"
    ],
    illustration: {
      type: 'comparison',
      description: "Instagram feed comparison: Before with random posts vs After with an aesthetic, branded grid.",
      beforeAfter: {
        before: "Random Feed",
        after: "Branded Aesthetic"
      }
    },
    accentColor: "text-[#FF3131]"
  },
  {
    id: 9,
    title: "Step 4: Never Lose a Customer Again",
    content: [
      "Instant replies 24/7",
      "Capture leads automatically",
      "Book appointments automatically"
    ],
    illustration: {
      type: 'bot',
      description: "AI Bot Agent interface showing instant lead capture and automated appointment booking.",
    },
    accentColor: "text-[#B2FF05]"
  },
  {
    id: 10,
    title: "The Difference with Elevate",
    content: [
      "From invisible to industry leader",
      "From manual work to automated growth",
      "From lost leads to loyal customers"
    ],
    illustration: {
      type: 'comparison',
      description: "The stark contrast between a business struggling without Elevate and thriving with our full system.",
      beforeAfter: {
        before: "Without Elevate: Stagnant",
        after: "With Elevate: Thriving"
      }
    },
    accentColor: "text-[#BF40BF]"
  },
  {
    id: 11,
    title: "Ready to Elevate Your Business?",
    content: [
      "Book your free strategy call today",
      "Let's build your custom growth roadmap",
      "Start turning visibility into revenue"
    ],
    illustration: {
      type: 'roi',
      description: "A dynamic graphic showing a rising ROI curve, symbolizing business growth with Elevate.",
    },
    accentColor: "text-[#B2FF05]"
  }
];
