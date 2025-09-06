"use client";

import animationData from "./animationData.json";
import { useLottie } from "lottie-react";

const ConfirmAnimation = () => {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <>
      <div className="">
        <div className="w-full">{View}</div>
      </div>
    </>
  );
};

export default ConfirmAnimation;