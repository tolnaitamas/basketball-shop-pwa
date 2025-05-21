import { OrderProduct } from './product';

export interface Order {
  customer: Customer;
  items: OrderProduct[];
  price: number;
  shipping: ShippingAddress;
}

export interface ShippingAddress {
  country: string;
  zip: string;
  city: string;
  address: string;
}

export interface Customer {
  email: string;
  name: string;
  phone: string;
}
