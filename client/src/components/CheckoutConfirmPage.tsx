import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
import { useOrderStore } from "@/store/useOrderStore";
import { Loader2 } from "lucide-react";
import { CheckoutSessionRequest } from "@/types/OrderType";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();
  const { cart } = useCartStore();
  const { restaurant } = useRestaurantStore();
  const [isLoading, setIsLoading] = useState<boolean>();
  const { createCheckoutSession } = useOrderStore();
  const [input, setInput] = useState({
    name: user?.fullName || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItems: cart.map((cartItem) => ({
          menuId: cartItem._id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity.toString(),
        })),
        deliveryDetails: input,
        restaurantId: restaurant?._id as string,
      };
      await createCheckoutSession(checkoutData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle className="text-center text-2xl">
          Review Your Order
        </DialogTitle>
        <DialogDescription className="text-center">
          Double-Check your delivery details and ensure everything is in order.
          When you are ready, Go to payment page to finalize your order.
        </DialogDescription>
        <form
          onSubmit={checkoutHandler}
          className="md:grid grid-cols-2 items-center gap-2 space-y-1 md:space-y-0"
        >
          <div className="flex flex-col gap-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullName"
              value={input.name}
              onChange={changeEventHandler}
              className="focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Email</Label>
            <Input
              disabled
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className=" focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Contact</Label>
            <Input
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              className=" focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={input.address}
              onChange={changeEventHandler}
              className=" focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
              className=" focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
              className=" focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
            />
          </div>
          <DialogFooter className="col-span-2 pt-5">
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-orange hover:bg-hoverOrange"
              onClick={() => checkoutHandler}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Please Wait ...</span>
                </div>
              ) : (
                "Proceed to payment"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;
