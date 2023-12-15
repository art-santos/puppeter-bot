import { Button } from "@chakra-ui/react";
import React, {
  useState,
  useEffect,
  ReactNode,
  JSXElementConstructor,
  ReactElement,
} from "react";

const formatTimeLeft = (timeLeftInSeconds: number): string => {
  const hours = Math.floor(timeLeftInSeconds / 3600);
  const minutes = Math.floor((timeLeftInSeconds % 3600) / 60);
  const seconds = timeLeftInSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const CountdownTimer: React.FC<{
  expirationTimestamp:
    | number
    | true
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>;
}> = ({ expirationTimestamp }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const expirationDate = new Date(expirationTimestamp);

    // Function to update the timer
    const updateTimer = () => {
      const currentDate = new Date();

      // Calculate the difference in milliseconds
      const timeDifference = expirationDate.getTime() - currentDate.getTime();

      // Check if the difference is smaller than or equal to 0
      if (timeDifference <= 0) {
        // Set the state to "expired" and stop updating the timer
        setIsExpired(true);

        return;
      }

      // Calculate the remaining time in seconds
      const timeLeftInSeconds = Math.round(timeDifference / 1000);

      // Update the state with the formatted time left
      setTimeLeft(formatTimeLeft(timeLeftInSeconds));
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [expirationTimestamp]);

  return (
    <Button isDisabled colorScheme={isExpired ? "red" : undefined}>
      {isExpired ? "expired" : timeLeft}
    </Button>
  );
};
