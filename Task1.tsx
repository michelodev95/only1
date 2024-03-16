export type Addresses = {
  [key: string]: string | { address: keyof Addresses };
};

function addresses(input: Addresses): void {}
