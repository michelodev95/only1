// Assuming a static structure similar to Task 2's input:
interface AccountInstruction {
  id: string;
  signer?: true;
  address?: string;
}

// Example static type representing the structure of the accounts in the instruction
type ExampleAccounts = [
  { id: "admin_id"; signer: true },
  { id: "program_id"; address: "staking_program_id" }
];

// Utility type to extract IDs of AccountInstructions without an address specified
type ExtractIDsWithoutAddress<T extends AccountInstruction[]> = {
  [K in keyof T]: T[K] extends { address: string } ? never : T[K]["id"];
}[number];

// Using the utility type with the ExampleAccounts
type IDsWithoutAddress = ExtractIDsWithoutAddress<ExampleAccounts>; // Should resolve to "admin_id"
