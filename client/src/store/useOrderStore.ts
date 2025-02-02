import { CheckoutSessionRequest, OrderState } from "@/types/OrderType";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_ENDPOINT = "http://localhost:8000/api/v1/order";
axios.defaults.withCredentials = true;
export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      createCheckoutSession: async (
        checkoutSessionRequest: CheckoutSessionRequest
      ) => {
        try {
          const res = await axios.post(
            `${API_ENDPOINT}/checkout/create-checkout-session`,
            checkoutSessionRequest,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          window.location.href = res.data.session.url;
        } catch (error) {
          console.log(error);
        }
      },
      getOrderDetails: async () => {
        try {
          const res = await axios.get(`${API_ENDPOINT}`);
          set({ orders: res.data.orders });
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: "order-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
