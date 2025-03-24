const Step = ({ message, state, id, onClickHandler }) => {
  const classes = [
    "flex",
    "justify-center",
    "items-center",
    "rounded-full",
    "w-8",
    "h-8",
    "border-black",
    "border-2",
  ];
  if (state == "Active") {
    classes.push("bg-blue-700", "text-white");
  } else if (state === "Completed") {
    classes.push("bg-green-700", "text-white");
  } else {
    classes.push("bg-gray-400");
  }
  return (
    <div className=" flex flex-col justify-center items-center w-auto">
      <div className={classes.join(" ")} onClick={onClickHandler}>
        {state === "Completed" ? "✔️" : id}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Step;
