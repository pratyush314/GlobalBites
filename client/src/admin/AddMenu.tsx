/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import EditMenu from "./EditMenu";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const AddMenu = () => {
  const { createMenu, removeMenu } = useMenuStore();
  const { restaurant, getRestaurant } = useRestaurantStore();
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();

  const [errors, setErrors] = useState<Partial<MenuFormSchema>>();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = menuSchema.safeParse(input);
    if (!res.success) {
      const fieldErrors = res.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<MenuFormSchema>);
      setIsLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      await createMenu(formData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setOpen(false);
  };

  const handleRemove = async (menuId: string) => {
    try {
      await removeMenu(menuId);
      await getRestaurant();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRes = async () => {
      await getRestaurant();
    };
    fetchRes();
  }, []);
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-orange hover:bg-hoverOrange">
              <Plus className="mr-2" /> Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="md:text-2xl text-center">
                Add New Menu
              </DialogTitle>
              <DialogDescription className="md:text-lg text-center">
                Create a menu that will make restaurant stand out.
              </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-3" onSubmit={submitHandler}>
              <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input
                  className="focus-visible:ring-0 focus-visible:border-none"
                  name="name"
                  type="text"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter menu name"
                />
                {errors && (
                  <span className="text-sm text-red-600 font-medium">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Input
                  name="description"
                  type="text"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter menu description"
                  className="focus-visible:ring-0 focus-visible:border-none"
                />
                {errors && (
                  <span className="text-sm text-red-600 font-medium">
                    {errors.description}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Price in (Rupees)</Label>
                <Input
                  name="price"
                  type="number"
                  value={input.price}
                  onChange={changeEventHandler}
                  placeholder="Enter menu price"
                  className="focus-visible:ring-0 focus-visible:border-none"
                />
                {errors && (
                  <span className="text-sm text-red-600 font-medium">
                    {errors.price}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Upload Menu Image</Label>
                <Input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                  className="cursor-pointer focus-visible:ring-0 focus-visible:border-none"
                />
                {errors && (
                  <span className="text-sm text-red-600 font-medium">
                    {errors.image?.name}
                  </span>
                )}
              </div>
              <DialogFooter className="mt-5">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="bg-orange hover:bg-hoverOrange w-full"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Adding Menu ...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {restaurant?.menus!.map((item: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={item.image}
              alt="Detials"
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold dark:text-gray-200 text-gray-800">
                {item.name}
              </h1>
              <p className="text-lg sm:text-sm dark:text-gray-200 text-gray-800 mt-1">
                {item.description}
              </p>
              <h2 className="text-lg font-semibold mt-2">
                Price: <span className="text-[#D19254]">{item.price} Rs</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(restaurant!.menus![idx]);
                setEditOpen(true);
              }}
              size="sm"
              className="mt-2 bg-orange hover:bg-hoverOrange"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                handleRemove(restaurant.menus![idx]._id);
              }}
              size="sm"
              className="mt-2 bg-orange hover:bg-hoverOrange"
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
