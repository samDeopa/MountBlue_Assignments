const Button = ({ onClickHandler, text, disabled }) => {
  return (
    <button
      className="p-[10px] h-[40px]  text-[20px] rounded  bg-gray-300 flex justify-center items-center"
      onClick={onClickHandler}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
