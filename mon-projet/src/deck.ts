// src/deck.ts
import React from 'react';
import { ReactComponent as AH } from './components/svg/AH.svg';
import { ReactComponent as AC } from './components/svg/AC.svg';
import { ReactComponent as AD } from './components/svg/AD.svg';
import { ReactComponent as AS } from './components/svg/AS.svg';
import { ReactComponent as SeptC } from './components/svg/7C.svg';
import { ReactComponent as SeptD } from './components/svg/7D.svg';
import { ReactComponent as SeptH } from './components/svg/7H.svg';
import { ReactComponent as SeptS } from './components/svg/7S.svg';
import { ReactComponent as HuitC } from './components/svg/8C.svg';
import { ReactComponent as HuitD } from './components/svg/8D.svg';
import { ReactComponent as HuitH } from './components/svg/8H.svg';
import { ReactComponent as HuitS} from './components/svg/8S.svg';
import { ReactComponent as NeufC } from './components/svg/9C.svg';
import { ReactComponent as NeufD } from './components/svg/9D.svg';
import { ReactComponent as NeufH } from './components/svg/9H.svg';
import { ReactComponent as NeufS } from './components/svg/9S.svg';
import { ReactComponent as DixC } from './components/svg/TC.svg';
import { ReactComponent as DixD } from './components/svg/TD.svg';
import { ReactComponent as DixH} from './components/svg/TH.svg';
import { ReactComponent as DixS } from './components/svg/TS.svg';
import { ReactComponent as JC} from './components/svg/JC.svg';
import { ReactComponent as JD } from './components/svg/JD.svg';
import { ReactComponent as JH } from './components/svg/JH.svg';
import { ReactComponent as JS} from './components/svg/JS.svg';
import { ReactComponent as QC } from './components/svg/QC.svg';
import { ReactComponent as QD } from './components/svg/QD.svg';
import { ReactComponent as QH } from './components/svg/QH.svg';
import { ReactComponent as QS } from './components/svg/QS.svg';
import { ReactComponent as KC } from './components/svg/KC.svg';
import { ReactComponent as KD} from './components/svg/KD.svg';
import { ReactComponent as KH } from './components/svg/KH.svg';
import { ReactComponent as KS } from './components/svg/KS.svg';
import { ReactComponent as Back } from './components/svg/front-back.svg';

// Types avec abréviations
export type Suit = 'H' | 'D' | 'C' | 'S';
export type Value = '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  value: Value;
  suit: Suit;
  svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export function createDeck(): Card[] {
  const suits: Suit[] = ['H', 'D', 'C', 'S'];
  const values: Value[] = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  const deck: Card[] = [];

  suits.forEach((suit) => {
    values.forEach((value) => {
      const svg = getCardSvg(value, suit);
      deck.push({ value, suit, svg });
    });
  });
  console.log('Deck créé :', deck); // Ajoutez ceci
  return deck;
}


export function shuffleDeck(deck: Card[]): Card[] {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
}

const cardSvgMap: { [key in Value]: { [key in Suit]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } } = {
  '7': {
    H: SeptH,
    D: SeptD,
    C: SeptC,
    S: SeptS,
  },
  '9': {
    H: NeufH,
    D: NeufD,
    C: NeufC,
    S: NeufS,
  },
  '10': {
    H: DixH,
    D: DixD,
    C: DixC,
    S: DixS,
  },
  'J': {
    H: JH,
    D: JD,
    C: JC,
    S: JS,
  },
  'Q': {
    H: QH,
    D: QD,
    C: QC,
    S: QS,
  },
  'K': {
    H: KH,
    D: KD,
    C: KC,
    S: KS,
  },
  '8': {
    H: HuitH,
    D: HuitD,
    C: HuitC,
    S: HuitS,
  },
  'A': {
    H: AH,
    D: AD,
    C: AC,
    S: AS,
  },
};

function getCardSvg(
  value: Value,
  suit: Suit
): React.FunctionComponent<React.SVGProps<SVGSVGElement>> {
  console.log(`Recherche du SVG pour la carte ${value} de ${suit}`);
  const svg = cardSvgMap[value]?.[suit];
  if (!svg) {
    console.error(`SVG non trouvé pour la carte ${value} de ${suit}`);
    throw new Error(`SVG non trouvé pour la carte ${value} de ${suit}`);
  }
  return svg;
}
