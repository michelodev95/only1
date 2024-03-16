// Reiterate the Addresses type from Task 1
// type Addresses = {
//   [key: string]: string | { address: keyof Addresses };
// };

import { Addresses } from "./Task1";

// Define the type for the accounts within instructions
type AccountInstruction = {
  id: string;
  signer?: true;
  address?: keyof Addresses;
};

// Define the type for the instructions part of the input
type InstructionsInput = {
  addresses: Addresses;
  instructions: {
    [key: string]: {
      accounts: AccountInstruction[];
    };
  };
};

// Implement the instructions function
function instructions(input: InstructionsInput) {
  // A utility function to resolve the address string recursively
  const resolveAddress = (
    address: string | { address: keyof Addresses }
  ): string => {
    if (typeof address === "string") {
      return address;
    } else {
      const nextAddress = input.addresses[address.address];
      return resolveAddress(nextAddress);
    }
  };

  // Iterate through the instructions and accounts to resolve addresses
  const resolvedInstructions = Object.fromEntries(
    Object.entries(input.instructions).map(
      ([instructionKey, instructionValue]) => {
        const accounts = instructionValue.accounts.map((account) => {
          if (account.address) {
            const resolvedAddress = resolveAddress(
              input.addresses[account.address]
            );
            return { ...account, address: resolvedAddress };
          }
          return account;
        });
        return [instructionKey, { ...instructionValue, accounts }];
      }
    )
  );

  // Return the modified instructions with resolved addresses
  return { ...input, instructions: resolvedInstructions };
}
