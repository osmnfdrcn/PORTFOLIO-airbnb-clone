("use clint");
import { BiSearch } from "react-icons/bi";
type Props = {};

const SearchArea = (props: Props) => {
  return (
    <div
      className="
        w-full md:w-auto py-2 
        border-[1px] rounded-full 
        bg-neutral-50 
        text-sm text-gray-600
        shadow-sm hover:shadow-md 
        transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        {/* location input */}
        <div className=" px-6">Anywhere</div>
        {/* date input */}
        <div className="flex-1 hidden sm:block text-center px-6 border-x-[1px]">
          Any Week
        </div>
        {/* guest number input */}
        <div className="flex flex-row items-center gap-3 pl-6 pr-1">
          <div className=" hidden sm:block">Add Guests</div>
          <div className="p-2 bg-rose-500 text-white rounded-full">
            <BiSearch size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
