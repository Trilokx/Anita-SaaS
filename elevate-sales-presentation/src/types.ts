export interface Slide {
  id: number;
  title: string;
  content: string[];
  illustration: {
    type: 'mockup' | 'diagram' | 'comparison' | 'chat' | 'grid' | 'reviews' | 'bot' | 'roi';
    description: string;
    imageUrl?: string;
    beforeAfter?: {
      before: string;
      after: string;
    };
  };
  accentColor?: string;
}
