import { ChakraProvider, Button as ChakraButton } from "@chakra-ui/react";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onSubmit: any;
}

export const Button = ({ children, onSubmit, ...rest }: ButtonProps) => {
  return (
    <ChakraProvider>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <h1 className="text-3xl font-bold underline bg-blue-500">
          Hello world!
        </h1>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <button type="submit" className="bg-black">
          Submit
        </button>
        <button type="button" className="bg-blue-600">
          Button text
        </button>
      </form>
    </ChakraProvider>
  );
};
