import { useRestaurantStore } from "@/store/useRestaurantStore";
import AvailableMenu from "./AvailableMenu";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RestroDetails = () => {
  const { getSingleRestaurant, restaurant } = useRestaurantStore();
  const params = useParams();
  useEffect(() => {
    const getRestroDetials = async () => {
      await getSingleRestaurant(params.id!);
    };
    getRestroDetials();
  }, []);
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src={restaurant?.imageUrl}
            alt="RestroImage"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">
              {restaurant?.restaurantName}
            </h1>
            <div className="flex gap-2 my-2">
              {restaurant?.cuisines.map((cuisine: string, idx: number) => (
                <Badge key={idx}>{cuisine}</Badge>
              ))}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time :{" "}
                  <span className="text-[#D19254]">
                    {restaurant?.deliveryTime} mins
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <AvailableMenu menus={restaurant?.menus} />
      </div>
    </div>
  );
};

export default RestroDetails;
