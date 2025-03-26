import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import Button from "./Button";

const Stepper = () => {
  ("Rendering");
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

  const stepsToRender = stages.reduce((accumulator, stage, index) => {
    currentStep, index;

    let currentState = "Unactive";
    if (index === currentStep) {
      currentState = "Active";
    } else if (index < currentStep) {
      currentState = "Completed";
    }
    accumulator[index] = { message: stage, state: currentState };
    return accumulator;
  }, {});

  return (
    <div className="flex flex-col items-center gap-5">
      <ProgressBar
        steps={stepsToRender}
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
