import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import Button from "./Button";

const Stepper = () => {
  console.log("Rendering");
  const [currentStep, setCurrentStep] = useState(0);

  const messages = [
    "Add contact details for further communications.",
    "Add shipping address for successful delivery.",
    "Complete Payment to complete the order.",
    "Ready to get delivered!",
    "Order Delivered successfully!🎉",
  ];
  const [stages, setStages] = useState([
    "Contact Details",
    "Shipping Address",
    "Payment",
    "Delivered",
  ]);

  const [steps, setSteps] = useState({});

  useEffect(() => {
    const arr = stages.reduce((accumulator, stage, index) => {
      console.log(currentStep, index);

      let currentState = "Unactive";
      if (index === currentStep) {
        console.log("HI");

        currentState = "Active";
      } else if (index < currentStep) {
        currentState = "Completed";
      }
      accumulator[index] = { message: stage, state: currentState };
      return accumulator;
    }, {});
    setSteps(arr);
    console.log(arr);
  }, [stages, currentStep]);

  return (
    <div className="flex flex-col items-center gap-5">
      <ProgressBar
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      <p>{messages[currentStep]}</p>
      <div className="flex gap-20">
        <Button
          onClickHandler={() => {
            setCurrentStep(currentStep - 1);
          }}
          text="Previous"
          disabled={currentStep == 0 ? true : false}
        />
        <Button
          onClickHandler={() => {
            setCurrentStep(currentStep + 1);
          }}
          text="Next"
          disabled={currentStep == messages.length - 1 ? true : false}
        />
      </div>
    </div>
  );
};
export default Stepper;
