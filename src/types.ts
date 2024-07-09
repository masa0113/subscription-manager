export interface Subscription {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  billingCycle: 'monthly' | 'yearly';
  paymentDate: number; // 1-31の数値
  paymentMethodId: number; // 支払い方法のID
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

export interface PaymentMethod {
  id: number;
  name: string;
  type: 'credit' | 'debit' | 'other';
  isSelected: boolean;
}

// paymentMethods.ts
export const paymentMethods: PaymentMethod[] = [
  { id: 1, name: 'VISAカード', type: 'credit', isSelected: false},
  { id: 2, name: 'MasterCard', type: 'credit', isSelected: false },
  { id: 3, name: 'PayPay', type: 'other', isSelected: false},
  // 他の支払い方法を追加
];