import { Card, CardContent, CardFooter } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const RestaurantCardSkeleton = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden transition-shadow duration-300">
      <div className="relative">
        <Skeleton className="w-full h-48" />
        <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 dark:bg-opacity-75 rounded-lg py-1 px-3">
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-4" /> {/* Placeholder for title */}
        <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          {[...Array(3)].map((_, idx) => (
            <Skeleton className="h-5 w-12 rounded-full" key={idx} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
        <Skeleton className="h-10 w-28 rounded-full" />{" "}
        {/* Placeholder for button */}
      </CardFooter>
    </Card>
  );
};

export default RestaurantCardSkeleton;
