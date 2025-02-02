/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantFormSchema,
  RestaurantFormSchema,
} from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const AdminRestaurant = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createRestaurant, restaurant, updateRestaurant, getRestaurant } =
    useRestaurantStore();

  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({
      ...input,
      [name]: type === "number" ? Number(value) : value,
    });
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = restaurantFormSchema.safeParse(input);
    if (!result.success) {
      const errorFields = result.error.formErrors.fieldErrors;
      setErrors(errorFields as Partial<RestaurantFormSchema>);
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("restaurantName", input.restaurantName);
    formData.append("city", input.city);
    formData.append("country", input.country);
    formData.append("deliveryTime", input.deliveryTime.toString());
    formData.append("cuisines", JSON.stringify(input.cuisines));
    if (input.imageFile) {
      formData.append("imageFile", input.imageFile);
    }
    try {
      if (restaurant) {
        await updateRestaurant(formData);
      } else {
        await createRestaurant(formData);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      setInput({
        restaurantName: restaurant?.restaurantName || "",
        city: restaurant?.city || "",
        country: restaurant?.country || "",
        deliveryTime: restaurant?.deliveryTime || 0,
        cuisines: restaurant?.cuisines
          ? restaurant.cuisines.map((cuisine: string) => cuisine)
          : [],
        imageFile: undefined,
      });
    };
    fetchRestaurant();
  }, []);
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <h1 className="font-bold text-2xl mb-5">
          {!restaurant ? "Add Restaurant" : "Update Restaurant"}
        </h1>
        <form onSubmit={submitHandler}>
          <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
            <div className="flex flex-col gap-3">
              <Label>Restaurant Name</Label>
              <Input
                type="text"
                placeholder="Enter your restaurant name"
                name="restaurantName"
                value={input.restaurantName}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 focus-visible:border-none"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.restaurantName}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>City</Label>
              <Input
                type="text"
                placeholder="Enter city"
                name="city"
                value={input.city}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 focus-visible:border-none"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.city}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>Country</Label>
              <Input
                type="text"
                placeholder="Enter country"
                name="country"
                value={input.country}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 focus-visible:border-none"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.country}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>Estimated Delivery Time(minutes)</Label>
              <Input
                type="number"
                name="deliveryTime"
                value={input.deliveryTime}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 focus-visible:border-none"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.deliveryTime}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>Cuisines</Label>
              <Input
                type="text"
                placeholder="eg. Italian, Chinese, Indian"
                name="cuisines"
                value={input.cuisines}
                onChange={(e) =>
                  setInput({ ...input, cuisines: e.target.value.split(",") })
                }
                className="focus-visible:ring-0 focus-visible:border-none"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.cuisines}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>Upload Restaurant Banner</Label>
              <Input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={(e) =>
                  setInput({
                    ...input,
                    imageFile: e.target.files?.[0] || undefined,
                  })
                }
                className="cursor-pointer focus-visible:ring-0 focus-visible:border-none"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.imageFile?.name}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Button
              disabled={isLoading}
              className="bg-orange hover:bg-hoverOrange"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{!restaurant ? "Adding ..." : "Updating ..."}</span>
                </div>
              ) : !restaurant ? (
                "Add Your Restaurant"
              ) : (
                "Update your Restaurant"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminRestaurant;
