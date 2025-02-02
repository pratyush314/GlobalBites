import { Orders } from "./OrderType";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};
export type Menus = {
  menus: MenuItem[] | undefined;
};

export type Restaurant = {
  _id?: string;
  user?: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  menus?: MenuItem[];
  imageUrl: string;
};

export type SearchedRestaurant = {
  data: Restaurant[];
};

export type RestaurantState = {
  restaurant: Restaurant | null;
  searchedRestaurant: SearchedRestaurant | null;
  appliedFilter: string[];
  restaurantOrders: Orders[];
  createRestaurant: (formData: FormData) => Promise<void>;
  getRestaurant: () => Promise<void>;
  updateRestaurant: (formData: FormData) => Promise<void>;
  searchRestaurant: (
    searchText: string,
    searchQuery: string,
    selectedCuisines: any
  ) => Promise<void>;
  getSingleRestaurant: (restaurantId: string) => Promise<void>;
  addMenuToRestaurant: (menu: any) => void;
  updatedMenuToRestaurant: (updatedMenu: any) => void;
  setAppliedFilter: (value: string) => void;
  resetAppliedFilter: () => void;
  getRestaurantOrders: () => Promise<void>;
  updateRestaurantOrder: (orderId: string, status: string) => Promise<void>;
};
