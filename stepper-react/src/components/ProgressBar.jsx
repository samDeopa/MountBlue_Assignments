import Step from "./Step";

const ProgressBar = ({ steps, currentStep, setCurrentStep }) => {
  const progressPercent = Math.min(currentStep * 34, 100);
  return (
    <div className="relative flex mx-50 justify-between w-[70%]">
      {Object.keys(steps).map((index) => (
        <Step
          message={steps[index].message}
          state={steps[index].state}
          id={parseInt(index) + 1}
          onClickHandler={() => {
            setCurrentStep(parseInt(index));
          }}
          key={index}
        />
      ))}
      <div className="absolute h-2 w-[90%] bg-red-400 mx-auto top-[22%] ml-16 -z-1">
        <div
          style={{ width: `${progressPercent}%` }}
          className="absolute h-2 bg-green-400 z-1"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
