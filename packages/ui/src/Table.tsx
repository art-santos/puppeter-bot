import { ChakraProvider } from "@chakra-ui/react";
import { FormatTableRow } from "./tableRow";
import { TableHeader } from "./tableHead";
import moment from "moment";

//@ts-ignore
const m = moment();
//@ts-ignore

const date = m.toISOString();
//@ts-ignore
// convert the date to moment and add ten minutes to it
const tenMinutesFromNow = m.add(10, "minutes").toISOString();

//@ts-ignore
const people = [
  {
    phone_number: "11987654321",
    code: "12345678-ABCD-1234-EFGH-56789012IJKL",
    generation_date: date,
    expires_in: tenMinutesFromNow, // 10 minutes later
    payment_status: "Pending",
    regenerate: "Regenerate",
  },
  {
    phone_number: "21965432198",
    code: "87654321-ZYXW-8765-VUTS-43210987RQPO",
    generation_date: date, // Equivalent to 2023-03-25 00:00:00 UTC
    expires_in: tenMinutesFromNow, // 10 minutes later
    payment_status: "Completed",
    regenerate: "Regenerate",
  },
  {
    phone_number: "31976549876",
    code: "45678912-HGFD-5678-QWAS-12345678TYUI",
    generation_date: date, // Equivalent to 2023-04-05 00:00:00 UTC
    expires_in: tenMinutesFromNow, // 10 minutes later
    payment_status: "Failed",
    regenerate: "Regenerate",
  },
  // Add more people as needed...
];

export const Table = () => {
  return (
    <ChakraProvider>
      <div className="mt-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Códigos Gerados
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Acompanhe os códigos gerados para o para os clientes
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="divide-x divide-gray-200">
                    {/* Dynamically create table headers based on keys */}
                    {people.length > 0 &&
                      Object.keys(people[0]).map((key) => (
                        <TableHeader keyVal={key} />
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person, index) => (
                    <tr key={index} className="divide-x divide-gray-200">
                      {Object.keys(person).map((key) => {
                        return (
                          //@ts-ignore
                          <FormatTableRow
                            keyVal={key}
                            value={person[key]}
                            person={person}
                          />
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};
