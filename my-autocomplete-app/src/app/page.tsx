"use client";
import AutocompleteInput from "@/components/Autocomplete";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-3xl mb-10 font-bold">ONLY1</h1>
        <AutocompleteInput />
      </main>
    </QueryClientProvider>
  );
}
