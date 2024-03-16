# Only1 Developer Task

You are given 1 day max to complete the tasks below. The tasks below should generally take only 1 to 2 hours max however.

## TypeScript

You are to implement the following 3 tasks completely in TypeScript. You are NOT allowed to use `any` or to attempt to ignore the type safety of any parts of your submissions code.

### Task 1

```ts
addresses({
  staking_program_id: "5XDdQrpNCD89LtrXDBk5qy4v1BW1zRCPyizTahpxDTcZ",
  system_program_id: "11111111111111111111111111111111",
  locked_token_mint_id: "3bRTivrVsitbmCTGtqwp7hxXPsybkjn4XLNtPsHqa3zR",
});
```

In the example above, you have the function `addresses`.

`addresses` takes in a single record whose type is `Addresses`.

`Addresses` is a record type that maps strings to the type `string | { address: keys of Addresses }`, such that if you were to type the following code into the input that is of type `Addresses` to `addresses({ ... })` in the example above:

```ts
reward_token_mint_id: { address: "locked_token_mint
```

Your IDE should auto-complete your input above to:

```ts
reward_token_mint_id: { address: "locked_token_mint_id" },
```

Your first task is to type the declaration of the `addresses` function. In other words, you do NOT need to implement the body of `addresses`.

### Task 2

```ts
instructions({
  addresses: {
    staking_program_id: "5XDdQrpNCD89LtrXDBk5qy4v1BW1zRCPyizTahpxDTcZ",
    locked_token_mint_id: "3bRTivrVsitbmCTGtqwp7hxXPsybkjn4XLNtPsHqa3zR",
    reward_token_mint_id: { address: "locked_token_mint_id" },
    system_program_id: "11111111111111111111111111111111",
  },
  instructions: {
    admin_init: {
      accounts: [
        { id: "admin_id", signer: true },
        { id: "program_id", address: "staking_program_id" },
        { id: "locked_token_mint_id", address: "locked_token_mint_id" },
        { id: "reward_token_mint_id", address: "reward_token_mint_id" },
        { id: "system_program_id", address: "system_program_id" },
      ],
    },
  },
});
```

Building on top of Task 2, you are to implement the `instructions` function above. It accepts a single record `input` that contains two keys: `addresses`, and `instructions`.

`addresses` is of the same format as `Addresses` in Task 1.

`instructions` maps to a record of arbitrary string keys to values of type:

```ts
{ accounts: Record<string, { id: string, signer?: true, address?: keys of Addresses }
```

What the function `instructions` does is return `input.instructions`, but:

For all `entry: { id: string, address: keys of Addresses }` entries in `instructions[keyof typeof instructions]["accounts"]`, the value of `address` is to be replaced with `input.addresses[entry.address]` if `input.addresses[entry.address]` points to a string.

If `input.addresses[entry.address]` points to a record of type `{ address: keys of Addresses }`, you are to recursively resolve for the string value of `address`.

### Task 3

You are given an arbitrary record `input` for the function `instructions(...)` in Task 2, and a `keyof typeof input`.

Write a helper utility type that returns the ids for all entries in `accounts` that do no have an `address` specified. In the example given in Task 2, this type helper should only return "admin_id".

## React

You are to implement an accessible autocomplete input using Shadcn, Radix UI, and Tailwind CSS. You may optionally use cmdk as well.

You must use either Remix or Next.js, TypeScript, and React Query v5 to implement your example project that demonstrates that your autocomplete input component works as intended.

The example project must demonstrate that the autocomplete input performs queries via. HTTP requests managed by React Query v5 against a request handler you define in your example project.

When a query is specified to the autocomplete input, a dropdown list should immediately show with the closest matches to the query specified. Some sort of loading indicator (i.e. a spinner or skeleton) should be shown in the dropdown list while any queries are being performed.

## Bonus

Any additional work outside of the scope of the tasks above will be given additional bonus points. i.e. tests, additional type helpers, etc.
