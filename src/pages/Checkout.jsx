import React, { useState } from "react";
import { Label } from "../Components/ui/Label";
import { Input } from "../Components/ui/Input";
import { cn } from "../utils";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkout submitted");
  };

  return (
    <div className="max-w-2xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-slate-900 dark:bg-black">
      <h2 className="font-bold text-xl  text-neutral-200">
        Checkout
      </h2>
      <p className=" text-sm max-w-sm mt-2 text-neutral-300">
        Complete your purchase by filling out the form below.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-gray-300">First Name</Label>
            <Input id="firstname" placeholder="John" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-gray-300">Last Name</Label>
            <Input id="lastname" placeholder="Doe" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-gray-300">Email Address</Label>
          <Input id="email" placeholder="johndoe@example.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="address" className="text-gray-300">Shipping Address</Label>
          <Input id="address" placeholder="123 Main St, City, Country" type="text" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="billing-address" className="text-gray-300">Billing Address (if different)</Label>
          <Input id="billing-address" placeholder="456 Another St, City, Country" type="text" />
        </LabelInputContainer>

        {/* Payment Method Selection */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold  text-neutral-200">Payment Method</h3>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => handlePaymentMethodChange("card")}
                className="mr-2"
              />
              <span className="text-neutral-200">Card</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={() => handlePaymentMethodChange("upi")}
                className="mr-2"
              />
              <span className="text-neutral-200">UPI</span>
            </label>
          </div>
        </div>

        {/* Conditional Fields Based on Payment Method */}
        {paymentMethod === "card" && (
          <div className="mb-4">
            <LabelInputContainer className="mb-2">
              <Label htmlFor="cardnumber" className="text-gray-300">Card Number</Label>
              <Input id="cardnumber" placeholder="1234 5678 9012 3456" type="text" />
            </LabelInputContainer>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer className="flex-1">
                <Label htmlFor="expiration" className="text-gray-300">Expiration Date</Label>
                <Input id="expiration" placeholder="MM/YY" type="text" />
              </LabelInputContainer>
              <LabelInputContainer className="flex-1">
                <Label htmlFor="cvv" className="text-gray-300">CVV</Label>
                <Input id="cvv" placeholder="123" type="text" />
              </LabelInputContainer>
            </div>
          </div>
        )}

        {paymentMethod === "upi" && (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="upi-id" className="text-gray-300">UPI ID</Label>
            <Input id="upi-id" placeholder="example@upi" type="text" />
          </LabelInputContainer>
        )}

        <div className="flex items-center mb-4">
          <input
            id="terms"
            type="checkbox"
            className="mr-2"
          />
          <Label htmlFor="terms" className="text-neutral-300 text-sm">
            I agree to the <a href="/terms" className="text-blue-500">Terms and Conditions</a>.
          </Label>
        </div>

        <button
          className="relative group/btn bg-gradient-to-br  from-zinc-900 to-zinc-900 w-full text-white rounded-md h-10 font-medium shadow-input"
          type="submit"
        >
          Complete Purchase &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

