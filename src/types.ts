export interface Subscription {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  }
  
  export interface SubscriptionSuggestion {
    name: string;
    image: string;
  }
  
  export const subscriptionSuggestions: SubscriptionSuggestion[] = [
    { name: 'YouTube', image: 'https://example.com/youtube.png' },
    { name: 'TikTok', image: 'https://example.com/tiktok.png' },
    { name: 'Abema', image: 'https://example.com/abema.png' },
    // 他のサービスも追加
  ];