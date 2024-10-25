// src/types.ts

export type Suit = 'H' | 'D' | 'C' | 'S'; // Hearts (Cœurs), Diamonds (Carreaux), Clubs (Trèfles), Spades (Piques)
export type Value = '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A'; // T pour 10 (Ten)

export interface Card {
  value: Value;
  suit: Suit;
  svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

