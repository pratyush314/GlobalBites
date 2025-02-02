/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import RestroCardSkeleton from "./RestroCardSkeleton";
import RestroCard from "./RestroCard";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Restaurant } from "@/types/RestaurantTypes";
import { X } from "lucide-react";
const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    searchRestaurant,
    searchedRestaurant,
    appliedFilter,
    setAppliedFilter,
  } = useRestaurantStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    searchRestaurant(params.text!, searchQuery, appliedFilter);
    setIsLoading(false);
  }, [params.text!, appliedFilter]);
  const searchResultsExist =
    searchedRestaurant?.data && searchedRestaurant.data.length > 0;

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              onClick={() => {
                searchRestaurant(params.text!, searchQuery, appliedFilter);
              }}
              className="bg-orange hover:bg-hoverOrange"
            >
              Search
            </Button>
          </div>
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1>({searchedRestaurant?.data.length}) Search result found</h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {appliedFilter.map((selectedFilter: string, idx: number) => {
                  return (
                    <div
                      className="relative inline-flex items-center max-w-full"
                      key={idx}
                    >
                      <Badge
                        className="text-[#D19254] pr-6 whitespace-nowrap rounded-md hover:cursor-pointer"
                        variant="outline"
                      >
                        {selectedFilter}
                      </Badge>
                      <X
                        onClick={() => setAppliedFilter(selectedFilter)}
                        size={16}
                        className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {isLoading ? (
                <RestroCardSkeleton />
              ) : searchResultsExist ? (
                searchedRestaurant?.data.map(
                  (restaurant: Restaurant, idx: number) => (
                    <RestroCard
                      key={idx}
                      _id={restaurant._id}
                      restaurantName={restaurant.restaurantName}
                      city={restaurant.city}
                      country={restaurant.country}
                      cuisines={restaurant.cuisines}
                      imageUrl={restaurant.imageUrl}
                      deliveryTime={restaurant.deliveryTime}
                    />
                  )
                )
              ) : (
                <div className="text-center col-span-3">
                  <h2 className="text-xl font-semibold">
                    No search results found
                  </h2>
                  <p className="text-gray-500">
                    Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
