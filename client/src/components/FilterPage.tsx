import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export interface IFilterOptions {
  id: string;
  label: string;
}

const filterOptions: IFilterOptions[] = [
  {
    id: "burger",
    label: "Burger",
  },
  {
    id: "pizza",
    label: "Pizza",
  },
  {
    id: "indian",
    label: "Indian",
  },
  {
    id: "chinese",
    label: "Chinese",
  },
  {
    id: "italian",
    label: "Italian",
  },
  {
    id: "mexican",
    label: "Mexican",
  },
  {
    id: "japanese",
    label: "Japanese",
  },
  {
    id: "mediterranean",
    label: "Mediterranean",
  },
  {
    id: "korean",
    label: "Korean",
  },
  {
    id: "vietnamese",
    label: "Vietnamese",
  },
  {
    id: "lebanese",
    label: "Lebanese",
  },
  {
    id: "greek",
    label: "Greek",
  },
  {
    id: "french",
    label: "French",
  },
  {
    id: "thai",
    label: "Thai",
  },
  {
    id: "seafood",
    label: "Seafood",
  },
  {
    id: "dessert",
    label: "Dessert",
  },
];

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } =
    useRestaurantStore();
  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value);
  };

  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <Button variant="link" onClick={() => resetAppliedFilter()}>
          Reset
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {filterOptions.map((option) => {
          return (
            <div key={option.id} className="flex items-center space-x-2 my-5">
              <Checkbox
                id={option.id}
                checked={appliedFilter.includes(option.label)}
                onClick={() => appliedFilterHandler(option.label)}
              />
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {option.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterPage;
