import React from "react";

// import { , QrcodeIcon, CalendarIcon, ExclamationIcon, CashIcon, RefreshIcon } from "@heroicons/react/outline";

import {
  FaPhone as PhoneIcon,
  FaQrcode as QrcodeIcon,
  FaCalendar as CalendarIcon,
  FaExclamation as ExclamationIcon,
  FaCashRegister as CashIcon,
  FaSyncAlt as RefreshIcon,
} from "react-icons/fa";

interface TableHeaderProps {
  keyVal: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ keyVal }) => {
  const renderHeaderContent = (key: string) => {
    switch (key) {
      case "phone_number":
        return (
          <div className="flex align-center justify-center">
            <PhoneIcon className="h-4 w-4 text-sky-500 bg-blend-color-dodge mr-2" />
            Phone Number
          </div>
        );

      case "code":
        return (
          <div className="flex align-center justify-center">
            <QrcodeIcon className="h-4 w-4 text-sky-500 bg-blend-color-dodge mr-2" />
            Pix Code
          </div>
        );

      case "generation_date":
        return (
          <div className="flex align-center justify-center">
            <CalendarIcon className="h-4 w-4 text-sky-500 bg-blend-color-dodge mr-2" />
            Generation Date
          </div>
        );

      case "expires_in":
        return (
          <div className="flex align-center justify-center">
            <ExclamationIcon className="h-4 w-4 text-sky-500 bg-blend-color-dodge mr-2" />
            Expires In
          </div>
        );

      case "payment_status":
        return (
          <div className="flex align-center justify-center">
            <CashIcon className="h-4 w-4 text-sky-500 bg-blend-color-dodge mr-2" />
            Payment Status
          </div>
        );

      case "regenerate":
        return (
          <div className="flex align-center justify-center">
            <RefreshIcon className="h-4 w-4 text-sky-500 bg-blend-color-dodge mr-2" />
            Action
          </div>
        );

      default:
        return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
    }
  };

  return (
    <th className="py-3.5 pl-4 pr-4 text-left text-sm font-semibo">
      {renderHeaderContent(keyVal)}
    </th>
  );
};
