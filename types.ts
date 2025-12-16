export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type Category = 'All' | 'Electronics' | 'Fashion' | 'Home' | 'Beauty';