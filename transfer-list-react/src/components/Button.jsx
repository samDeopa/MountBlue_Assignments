const Button = ({ value, onClickHandler, disabled }) => {
  return (
    <button
      className={`p-1 w-15   ${
        disabled ? "bg-gray-100" : "bg-gray-400"
      } rounded m-2`}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
