import StockCard from "./StockCard";

const StockList = ({ stocks }) => {
  return (
    <div className="flex flex-col">
      {stocks.map((stock) => (
        <StockCard key={stock._id} stock={stock} />
      ))}
    </div>
  );
};

export default StockList;
