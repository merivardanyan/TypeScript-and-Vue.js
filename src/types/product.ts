export interface Choice {
  text: string;
  value: string;
}

export interface Option {
  type: string;
  choices: Choice[];
}

