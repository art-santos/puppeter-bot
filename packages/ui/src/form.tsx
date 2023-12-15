"use client";

import { Button, ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import { PixGenerateButton } from "./Button";

export const Form = () => {
  const [phone, setPhone] = useState("");
  const [displayPhone, setDisplayPhone] = useState("");
  const [isValidNumber, setIsValidNumber] = useState(false);

  const formatBrazilianPhone = (phone: string) => {
    // Format only for Brazilian numbers (length check is a simple heuristic)
    //make a deep copy of the phone
    const newPhone = structuredClone(phone);

    return newPhone;
  };

  const handlePhoneChange = (value: string, country: any) => {
    // Set the actual phone number for validation
    setPhone(value);
    console.log(value);
    // Format the display value for Brazilian numbers
    if (country?.countryCode === "br") {
      setDisplayPhone(formatBrazilianPhone(value));
    } else {
      setDisplayPhone(value);
    }

    // Validate the phone number
    const fullPhoneNumber = value;

    setIsValidNumber(isValidPhoneNumber(fullPhoneNumber, "BR"));
  };

  return (
    <ChakraProvider>
      <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-1 m-auto">
        <div className="p-5 flex flex-wrap gap-4 items-end">
          <div className="flex-grow">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone number
            </label>
            <PhoneInput
              country={"br"}
              value={displayPhone}
              onChange={handlePhoneChange}
              preferredCountries={["br"]}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              countryCodeEditable={false}
              placeholder="Enter phone number"
              containerClass="mt-1"
              inputClass="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <PixGenerateButton isValidNumber={isValidNumber} />
        </div>
      </form>
    </ChakraProvider>
  );
};
