// generated by 'actions-kit'
        import "@actions/core";

        
declare global {
  export const ACTION_INPUTS: {
  "type": "type",
  "who-to-greet": "who-to-greet"
};
}

declare module "@actions/core" {

  type InputNames = "type" | "who-to-greet";

  export function getInput(name: InputNames, options?: InputOptions): string;
}