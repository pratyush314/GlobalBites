/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { useRestaurantStore } from "./useRestaurantStore";

const API_ENDPOINT = "http://localhost:8000/api/v1/menu";
axios.defaults.withCredentials = true;

type MenuState = {
  menu: null;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
  removeMenu: (menuId: string) => Promise<void>;
};

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      menu: null,
      createMenu: async (formData: FormData) => {
        try {
          const res = await axios.post(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.success) {
            toast.success(res.data.message);
            set({ menu: res.data.menu });
          }
          useRestaurantStore.getState().addMenuToRestaurant(res.data.menu);
        } catch (error: any) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      },
      editMenu: async (menuId: string, formData: FormData) => {
        try {
          const res = await axios.put(`${API_ENDPOINT}/${menuId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.success) {
            toast.success(res.data.message);
            set({ menu: res.data.menu });
          }
          useRestaurantStore.getState().updatedMenuToRestaurant(res.data.menu);
        } catch (error: any) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      },
      removeMenu: async (menuId: string) => {
        try {
          const res = await axios.delete(`${API_ENDPOINT}/${menuId}`);
          if (res.data.success) {
            toast.success(res.data.message, {
              position: "top-center",
              style: {
                fontSize: "17px",
              },
            });
          } else {
            toast.error(res.data.message);
          }
        } catch (error: any) {
          toast.error(error.response.data.message, {
            position: "top-center",
          });
          console.log(error);
        }
      },
    }),
    {
      name: "menu-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
