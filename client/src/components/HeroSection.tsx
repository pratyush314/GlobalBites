import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import pizza from "@/assets/pizza.png";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Order Food anytime & anywhere
          </h1>
          <p className="text-gray-500">
            Delicious Meals at Your Doorstep – Fast & Fresh!
          </p>
        </div>
        <div className="relative flex items-center gap-3">
          <div className="w-full">
            <Input
              type="text"
              value={searchText}
              placeholder="Search restaurant by name, city & country"
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 text-lg"
            />
            <Search className="absolute inset-y-2 left-2 text-gray-500" />
          </div>
          <Button
            onClick={() => navigate(`/search/${searchText}`)}
            className="bg-orange hover:bg-hoverOrange"
          >
            Search
          </Button>
        </div>
      </div>
      <div>
        <img
          src={pizza}
          alt="Pizza"
          className="object-cover w-full max-h-[500px]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
