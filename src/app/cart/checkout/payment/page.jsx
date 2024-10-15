"use client";
import { postPayment } from "@/apis/carts";
import { useCartContext } from "@/Context/ProjectProvider";
import Button from "@/Shared/Button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function page() {
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: "{{CLIENT_SECRET}}",
  // };

  const handlePayment = async () => {};

  return (
    <div
      className={`max-w-screen-xl mx-auto px-5 md:px-10 flex flex-col justify-center items-center gap-10 pt-32 mb-60 w-full `}
    >
      {/* <CheckoutForm /> */}

      <Button text={"Pay"} handler={handlePayment} />
    </div>
  );
}
