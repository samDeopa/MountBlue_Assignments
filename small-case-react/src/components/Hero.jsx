import SideFilters from "./SideFilters";

const Hero = () => {
  return (
    <div className="flex ">
      <div className="w-1/3">
        <SideFilters />
      </div>
      <div className="w-2/3"></div>
    </div>
  );
};
export default Hero;
