import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-60 sm:w-80 md:w-96 flex items-center px-4 rounded-md gap-1">
      <Input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-sm bg-transparent py-3 in-focus: border-b-2 border-slate-500"
        value={value}
        onChange={onChange}
      />

      {value && (
        <Button variant="ghost" size="icon" onClick={onClearSearch} className="text-slate-500 hover:text-black">
          <IoMdClose className="text-xl" />
        </Button>
      )}

      <Button variant="outline" size="icon" onClick={handleSearch} className=" ">
        <FaMagnifyingGlass className="text-xl" />
      </Button>
    </div>
  );
};

export default SearchBar;
