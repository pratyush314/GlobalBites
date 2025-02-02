import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  PackageCheck,
  ShoppingCart,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";

const MobileNav = () => {
  const { cart } = useCartStore();
  const { user, logout } = useUserStore();
  const [open, setOpen] = useState<boolean>();
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const clickHandler = async () => {
    setisLoading(true);
    try {
      await logout();
      navigate("/login");
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          onClick={() => setOpen(false)}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="pt-3">GlobalBites</SheetTitle>
          <ModeToggle />
        </SheetHeader>
        <SheetDescription className="flex-1">
          <Separator className="my-2" />
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/order/status"
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <ShoppingCart />
            Cart
            <Button
              size="icon"
              className="absolute left-28 text-sm rounded-full h-4 w-4 bg-red-500 hover:bg-red-500"
            >
              {cart.length}
            </Button>
          </Link>
          {user?.admin && (
            <>
              <Link
                to="/admin/menu"
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <Menu />
                <span>Menu</span>
              </Link>
              <Link
                to="admin/restaurant"
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <UtensilsCrossed />
                <span>Restaurant</span>
              </Link>
              <Link
                to="admin/Orders"
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <PackageCheck />
                <span>Restaurant Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">{user?.fullName}</h1>
          </div>
          <SheetClose asChild>
            <Button
              className="bg-orange hover:bg-hoverOrange"
              disabled={isLoading}
              onClick={clickHandler}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Logging out ...</span>
                </div>
              ) : (
                "Logout"
              )}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
