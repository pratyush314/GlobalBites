/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import axios from "axios";
import { RestaurantState } from "@/types/RestaurantTypes";
import { Orders } from "@/types/OrderType";

const API_ENDPOINT = "http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set, get) => ({
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      restaurantOrders: [],
      createRestaurant: async (formData: FormData) => {
        try {
          const res = await axios.post(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.success) {
            toast.success(res.data.message);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      },

      getRestaurant: async () => {
        try {
          const res = await axios.get(`${API_ENDPOINT}/`);
          if (res.data.success) {
            set({ restaurant: res.data.restaurant });
          }
        } catch (error: any) {
          if (error.response.status === 404) {
            set({ restaurant: null });
          }
          console.log(error);
        }
      },

      updateRestaurant: async (formData: FormData) => {
        try {
          const res = await axios.put(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.success) {
            toast.success(res.data.message);
            set({ restaurant: res.data.restaurant });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      },

      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines);
          const res = await axios.get(
            `${API_ENDPOINT}/search/${searchText}?${params.toString()}`
          );
          if (res.data.success) {
            set({
              searchedRestaurant: {
                data: res.data.restaurants,
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
      },

      getSingleRestaurant: async (restaurantId: string) => {
        try {
          const res = await axios.get(`${API_ENDPOINT}/${restaurantId}`);
          if (res.data.success) {
            set({ restaurant: res.data.restaurant });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      },

      addMenuToRestaurant: (menu: any) => {
        set((state: any) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },
      updatedMenuToRestaurant: (updatedMenu: any) => {
        set((state: any) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu: any) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
          return state;
        });
      },

      setAppliedFilter: (value: string) => {
        set((state: any) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item: string) => item !== value)
            : [...state.appliedFilter, value];
          return {
            appliedFilter: updatedFilter,
          };
        });
      },
      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },

      getRestaurantOrders: async () => {
        try {
          const res = await axios.get(`${API_ENDPOINT}/order`);
          if (res.data.success) {
            set({ restaurantOrders: res.data.orders });
          }
        } catch (error) {
          console.log(error);
        }
      },
      updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
          const res = await axios.put(
            `${API_ENDPOINT}/order/${orderId}/status`,
            { status },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.data.success) {
            const updateOrder = get().restaurantOrders.map((order: Orders) => {
              return order._id === orderId
                ? { ...order, status: res.data.status }
                : order;
            });
            set({ restaurantOrders: updateOrder });
            toast.success(res.data.message, {
              position: "top-center",
              style: {
                fontSize: "18px",
              },
            });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      },
    }),
    {
      name: "restaurant-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
