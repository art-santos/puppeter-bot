"use client";

import { Form } from "@repo/ui/form";
import { useEffect, useState } from "react";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  const [name, setName] = useState<string>("");
  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setResponse(null);
    setError(undefined);
  }, [name]);

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
      <Form
        onSubmit={() => {
          console.log("a");
        }}
      />
      {error && (
        <div>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
