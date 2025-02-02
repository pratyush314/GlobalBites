export type CheckoutSessionRequest = {
  cartItems: {
    image?: string;
    menuId: string;
    name: string;
    price: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    email: string;
    contact: string;
    address: string;
    city: string;
    country: string;
  };
  restaurantId: string;
};

export interface Orders extends CheckoutSessionRequest {
  _id: string;
  status: string;
  totalAmount: number;
}

export type OrderState = {
  orders: Orders[];
  createCheckoutSession: (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => Promise<void>;
  getOrderDetails: () => Promise<void>;
};

export type CartItem = {
  image?: string;
  menuId: string;
  name: string;
  price: string;
  quantity: string;
};
