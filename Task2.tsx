import { Addresses } from "./Task1";

type AccountInstruction = {
  id: string;
  signer?: true;
  address?: keyof Addresses;
};

type InstructionsInput = {
  addresses: Addresses;
  instructions: {
    [key: string]: {
      accounts: AccountInstruction[];
    };
  };
};

function instructions(input: InstructionsInput) {
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

  return { ...input, instructions: resolvedInstructions };
}
