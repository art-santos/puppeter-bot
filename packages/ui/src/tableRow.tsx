import { Button } from "@chakra-ui/react";
import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { FaBeer, FaLink, FaPhone } from "react-icons/fa";
export interface FormatTableRowProps {
  keyVal: string;
  value:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | null
    | undefined;
}
export const FormatTableRow: React.FC<FormatTableRowProps> = ({
  keyVal,
  value,
}) => {
  const formatPhoneNumber = (phoneNumber: any) => {
    // Format the phone number as needed
    return phoneNumber; // Replace with actual formatting logic
  };

  switch (keyVal) {
    case "phone_number":
      return (
        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 flex items-center">
          <Button disabled={true} leftIcon={<FaPhone />} colorScheme="gray">
            {formatPhoneNumber(value)}
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
      return (
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {/* {new Date(value * 1000).toLocaleDateString()}{" "} */}
          {/* Assuming value is a Unix timestamp */}
        </td>
      );

    case "expires_in":
      return (
        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500">
          {/* {new Date(value * 1000).toLocaleDateString()}{" "} */}
          {/* Assuming value is a Unix timestamp */}
        </td>
      );

    case "regenerate":
      return (
        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500">
          <button>{value}</button>
        </td>
      );

    default:
      return (
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{value}</td>
      );
  }
};

export default FormatTableRow;
