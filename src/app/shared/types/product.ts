export interface Product {
  id: number;
  sex: string;
  brand: string;
  name: string;
  imageUrl: string;
  category: string;
  price: number;
  sizes: number[];
  selectedSize: number;
  quantity: number;
}
