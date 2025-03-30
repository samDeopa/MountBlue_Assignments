import Hero from "./Hero";
import SortFilter from "./SortFilters";

const DiscoverSection = () => {
  return (
    <div className=" w-[1120px]  ">
      <h1 className=" text-[24px] font-[570] py-7">Discover</h1>
      <div className="shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1)] w-full flex justify-between">
        <div className="flex items-center gap-5">
          <a>Collectoins</a>
          <a className=" text-blue-500 py-3 border-b"> All smallcases</a>
          <a>Managers</a>
        </div>
        <div className="flex">
          <SortFilter />
        </div>
      </div>
      <Hero />
    </div>
  );
};

export default DiscoverSection;
