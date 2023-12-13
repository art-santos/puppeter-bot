import { HStack, Stack, Stat, StatHelpText, StatLabel } from "@chakra-ui/react";
import React from "react";

export default function Stats(props: {
  Firstname:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
  Lastname:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
  Password:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <Stat mt={5}>
      <Stack
        p={4}
        borderWidth="3px"
        borderRadius="md"
        direction="column"
        align="flex-start"
      >
        <HStack>
          <StatLabel>Name: {props.Firstname}</StatLabel>
          <StatLabel>{props.Lastname}</StatLabel>
        </HStack>
        <StatHelpText>Password: {props.Password}</StatHelpText>
      </Stack>
    </Stat>
  );
}
