"use client";

import { Button, Tag } from "@chakra-ui/react";
import { FaLink, FaPhone } from "react-icons/fa";
import { CountdownTimer } from "./CountdownComponent";

export interface FormatTableRowProps {
  keyVal: string;
  value:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | null
    | undefined;
  person: {
    name: string;
    phone_number: string;
    code: string;
    generation_date: number;
    expires_in: number;
    payment_status: string;
    regenerate: string;
  };
}

export const FormatTableRow: React.FC<FormatTableRowProps> = ({
  keyVal,
  value,
  person,
}) => {
  const formatPhoneNumber = (phoneNumber: string) => {
    // Format the phone number as needed
    return phoneNumber; // Replace with actual formatting logic
  };

  switch (keyVal) {
    case "phone_number":
      return (
        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 flex items-center">
          <Button disabled={true} leftIcon={<FaPhone />} colorScheme="gray">
            {formatPhoneNumber(value as string)}
          </Button>
        </td>
      );

    case "code":
      return (
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          <Button leftIcon={<FaLink />} colorScheme="messenger">
            Copiar Pix
          </Button>
        </td>
      );

    case "generation_date":
      //convert from timestamp to date

      return (
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {new Date(value as number).toLocaleString()}
        </td>
      );

    case "expires_in":
      //convert from timestamp to date

      //expirationTimestamp = new Date(expirationTimestamp).toLocaleString();
      return (
        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500">
          {<CountdownTimer expirationTimestamp={value as string} />}
        </td>
      );

    case "payment_status":
      return (
        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500">
          <Tag
            colorScheme={
              value === "Pending"
                ? "yellow"
                : value === "Completed"
                ? "green"
                : "red"
            }
            fontWeight={"bold"}
            size={"lg"}
          >
            {value}
          </Tag>
        </td>
      );

    case "regenerate":
      return (
        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500">
          <Button colorScheme="blue">{value}</Button>
        </td>
      );

    default:
      return (
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{value}</td>
      );
  }
};

export default FormatTableRow;
