export interface Product {
  id: number;
  sex: string;
  brand: string;
  name: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  selectedSize: number;
}
