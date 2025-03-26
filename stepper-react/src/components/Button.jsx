const Button = ({ onClickHandler, text, disabled }) => {
  return (
    <button
      className={`p-[10px] h-[40px]  text-[20px] rounded    flex justify-center items-center ${
        disabled ? "bg-gray-100" : "bg-gray-300"
      }`}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
