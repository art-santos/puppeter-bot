import { Form } from "@repo/ui/form";
import { Table } from "@repo/ui/table";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const result = await fetch(`${API_HOST}/message/${name}`);
  //     const response = await result.json();
  //     setResponse(response);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Unable to fetch response");
  //   }
  // };

  return (
    <div className="self-center mx-auto border-red-300 w-[90%] p-5">
      <Form />
      <Table />
    </div>
  );
}
