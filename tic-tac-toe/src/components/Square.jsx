const Square = ({ value, clickHandler }) => {
  return (
    <button
      className="h-[100px] w-[100px] bg-[#EFEFEF] border-1 rounded-[5%] "
      onClick={clickHandler}
    >
      {" "}
      {value}
    </button>
  );
};
export default Square;
