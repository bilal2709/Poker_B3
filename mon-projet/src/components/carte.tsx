// src/components/Card.tsx

import React from 'react';
import { Card as CardType } from '../deck';
import { ReactComponent as CardBack } from './svg/front-back.svg';
import '../carte.css';

interface CardProps {
  card: CardType;
  flipped: boolean;
  className?: string; // Prop optionnelle pour la taille
}

const CardComponent: React.FC<CardProps> = ({ card, flipped, className }) => {
  const { svg: FrontSvg } = card;

  return (
    <div className={`relative border-2 border-white rounded-lg ${className}`}>
      <div className="absolute inset-0">
        {flipped ? (
          <FrontSvg className="w-full h-full object-contain" />
        ) : (
          <CardBack className="w-full h-full object-contain" />
        )}
      </div>
    </div>
  );
};

export default CardComponent;








