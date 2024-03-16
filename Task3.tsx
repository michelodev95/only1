interface AccountInstruction {
  id: string;
  signer?: true;
  address?: string;
}

type ExampleAccounts = [
  { id: "admin_id"; signer: true },
  { id: "program_id"; address: "staking_program_id" }
];

type ExtractIDsWithoutAddress<T extends AccountInstruction[]> = {
  [K in keyof T]: T[K] extends { address: string } ? never : T[K]["id"];
}[number];

type IDsWithoutAddress = ExtractIDsWithoutAddress<ExampleAccounts>; // Should resolve to "admin_id"
