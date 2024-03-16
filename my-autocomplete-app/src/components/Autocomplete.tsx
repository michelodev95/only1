// use client
import { TextField } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";

const fetchResults = async (query: string) => {
  if (!query) return [];
  const response = await fetch(
    `https://randomuser.me/api/?results=5&inc=name,email,login&nat=us,ca,gb`
  );
  const data = await response.json();
  return data.results.map((user: any) => ({
    id: user.login.uuid,
    label: `${user.name.first} ${user.name.last}`,
    value: user.email,
  }));
};

const AutocompleteInput = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchResults(query),
    enabled: query.length > 1,
  });

  useEffect(() => {
    if (query.length > 1) setShowResults(true);
    else setShowResults(false);
  }, [query]);

  return (
    <div className="relative">
      <TextField.Root>
        <TextField.Input
          placeholder="Search people"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
          value={query}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 100)}
          onChange={(e) => setQuery(e.target.value)}
        />
      </TextField.Root>

      {showResults && (
        <ul className="absolute z-10 shadow-lg max-h-60 overflow-auto bg-white w-full mt-1 rounded-lg border-2 border-gray-100">
          {isLoading ? (
            <li className="p-4 text-gray-700 text-sm">Loading...</li>
          ) : (
            data?.map((item: any) => (
              <li
                key={item.id}
                className="p-4 hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
                onClick={() => setQuery(item.label)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {item.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;

// "use client";
// import { useQuery } from "@tanstack/react-query";
// import * as Autocomplete from "@radix-ui/react-popover";

// import { useState, useEffect } from "react";
// import { SelectItem, TextFieldInput } from "@radix-ui/themes";

// interface SearchResult {
//   id: string;
//   label: string;
//   value: string;
// }

// interface SearchResults {
//   results: SearchResult[];
// }

// const fetchResults = async (query: string) => {
//   const response = await fetch("https://randomuser.me/api/?results=50"); // Obtiene más usuarios para filtrar
//   const data = await response.json();
//   const filteredResults = data.results.filter(
//     (user: any) =>
//       `${user.name.first} ${user.name.last}`
//         .toLowerCase()
//         .includes(query.toLowerCase()) ||
//       user.email.toLowerCase().includes(query.toLowerCase())
//   );
//   return filteredResults.map((user: any) => ({
//     id: user.login.uuid,
//     label: `${user.name.first} ${user.name.last}`, // Combina nombre y apellido
//     value: user.email, // Usa el email como valor
//   }));
// };

// const AutocompleteInput = () => {
//   const [query, setQuery] = useState("");
//   const { data, isLoading } = useQuery({
//     queryKey: ["search", query],
//     queryFn: () => fetchResults(query),
//     enabled: query.length > 1,
//   });

//   console.log("QUERY ", query);

//   return (
//     <Autocomplete.Root>
//       <TextFieldInput
//         className="border p-2"
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       {/* <Autocomplete.Portal> */}
//       <Autocomplete.Content className="shadow-md max-h-60 overflow-auto">
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : (
//           data?.map((item: any) => (
//             // <SelectItem
//             //   key={item.id}
//             //   value={item.value}
//             //   className="p-2 hover:bg-gray-200"
//             // >
//             //   {item.label}
//             // </SelectItem>
//             <div>{item.id}</div>
//           ))
//         )}
//       </Autocomplete.Content>
//       {/* </Autocomplete.Portal> */}
//     </Autocomplete.Root>
//   );
// };

// export default AutocompleteInput;
