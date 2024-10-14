"use client";
import CustomMultiStepper from "@/Shared/steppers/CustomMultiStepper";
import { validationErrorHandler } from "@/Utils/validationErrorHandler";
import { useState } from "react";
import CheckoutStep1 from "./CheckoutStep1";
import CheckoutStep2 from "./CheckoutStep2";
import CheckoutStep3 from "./CheckoutStep3";

const page = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = (validateForm) => {
    if (step < 3) {
      // if (validateForm()) {
      //   setStep((prev) => prev + 1);
      // }
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const [formData, setFormData] = useState({
    step1: {
      name: "",
      email: "",
      phone: "",
      streetAddress: "",
      apartment: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      deliveryInstruction: "",
    },
  });
  console.log({ formData });

  // VALIDATION
  const [errors1, setErrors1] = useState({});
  const validateForm1 = () => {
    const newErrors = {};

    // VALIDATE NAME
    if (!formData.step1.name || formData.step1.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    // VALIDATE STREET
    if (
      !formData.step1.streetAddress ||
      formData.step1.streetAddress.trim() === ""
    ) {
      newErrors.streetAddress = "Street is required";
    }
    // VALIDATE CITY
    if (!formData.step1.city || formData.step1.city.trim() === "") {
      newErrors.city = "City is required";
    }
    // VALIDATE STATE
    if (!formData.step1.state || formData.step1.state.trim() === "") {
      newErrors.state = "State is required";
    }
    // VALIDATE COUNTRY
    if (!formData.step1.country || formData.step1.country.trim() === "") {
      newErrors.country = "Country is required";
    }
    // VALIDATE PHONE
    if (!formData.step1.phone) {
      newErrors.phone = "Phone is required";
    }
    // VALIDATE EMAIL
    if (!formData?.step1?.email || formData?.step1?.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        formData?.step1?.email?.trim()
      )
    ) {
      newErrors.email = "Invalid email";
    }

    setErrors1(newErrors);
    console.log({ newErrors });
    validationErrorHandler(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div
      className={`max-w-screen-xl mx-auto px-5 md:px-10 flex flex-col justify-center items-center gap-10 pt-32 mb-60 w-full `}
    >
      <div className=" mb-5 w-full md:w-1/2 ">
        <CustomMultiStepper
          steps={[
            {
              serial: 1,
              id: 1,
              title: "Shipping Information",
              onCLickHandler: () => {
                setStep(1);
              },
            },
            {
              serial: 2,
              id: 2,
              title: "Payment Information",
              onCLickHandler: () => {
                if (validateForm1()) {
                  setStep(2);
                }
              },
            },
            {
              serial: 3,
              id: 3,
              title: "Order Review",
              onCLickHandler: () => {
                if (validateForm()) {
                  setStep(3);
                }
              },
            },
          ]}
          currentStep={step}
        />
      </div>
      <div className={`w-full`}>
        {step === 1 && (
          <CheckoutStep1
            errors={errors1}
            setErrors={setErrors1}
            setFormData={setFormData}
            formData={formData}
            validateForm={validateForm1}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 2 && (
          <CheckoutStep2
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 3 && (
          <CheckoutStep3
            formData={formData}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
      </div>
    </div>
  );
};

export default page;
