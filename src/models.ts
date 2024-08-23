export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity?: number;
}

export interface Product extends CartProduct{
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}