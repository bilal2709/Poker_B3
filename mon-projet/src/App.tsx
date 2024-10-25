// src/App.tsx

import React, { useState } from 'react';
import { Value, createDeck, shuffleDeck, Card } from './deck';
import CardComponent from './components/carte';
import './App.css';

const App: React.FC = () => {
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [computerHand, setComputerHand] = useState<Card[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [winner, setWinner] = useState<string>('');
  const [isShuffling, setIsShuffling] = useState(false);

  const valueRanks: { [key in Value]: number } = {
    '7': 1,
    '8': 2,
    '9': 3,
    '10': 4,
    'J': 5,
    'Q': 6,
    'K': 7,
    'A': 8,
  };

  const startGameWithShuffle = () => {
    setShowMenu(false);
    setIsShuffling(true);

    const interval = setInterval(() => {
      const deck = shuffleDeck(createDeck());
      setPlayerHand(deck.slice(0, 4));
      setComputerHand(deck.slice(4, 8));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsShuffling(false);
      setGameStarted(true);
    }, 1500);
  };

  const restartGame = () => {
    setIsShuffling(true);
    setWinner(''); 
  
    const interval = setInterval(() => {
      const deck = shuffleDeck(createDeck());
      setPlayerHand(deck.slice(0, 4));
      setComputerHand(deck.slice(4, 8));
    }, 100);
  
    setTimeout(() => {
      clearInterval(interval);
      setIsShuffling(false);
      setGameStarted(true);
    }, 1500);
  };

  const quitGame = () => {
    setPlayerHand([]);
    setComputerHand([]);
    setGameStarted(false);
    setWinner('');
    setShowMenu(true);
  };

  const evaluateHands = () => {
    const playerScore = evaluateHand(playerHand);
    const computerScore = evaluateHand(computerHand);

    if (playerScore.rank > computerScore.rank) {
      setWinner(`Vous avez gagné avec un ${playerScore.combination} de ${playerScore.highCard.value} !`);
    } else if (playerScore.rank < computerScore.rank) {
      setWinner(`L’ordinateur a gagné avec un ${computerScore.combination} de ${computerScore.highCard.value}.`);
    } else {
      if (valueRanks[playerScore.highCard.value] > valueRanks[computerScore.highCard.value]) {
        setWinner(`Vous avez gagné avec un ${playerScore.combination} de ${playerScore.highCard.value} !`);
      } else if (valueRanks[playerScore.highCard.value] < valueRanks[computerScore.highCard.value]) {
        setWinner(`L’ordinateur a gagné avec un ${computerScore.combination} de ${computerScore.highCard.value}.`);
      } else {
        setWinner(`Égalité avec un ${playerScore.combination} de ${playerScore.highCard.value} !`);
      }
    }
  };

  const evaluateHand = (hand: Card[]): { rank: number; combination: string; highCard: Card } => {
    const counts: { [key in Value]?: number } = {};
    hand.forEach((card) => {
      counts[card.value] = (counts[card.value] || 0) + 1;
    });

    const sortedCounts = Object.entries(counts).sort(
      ([valueA, countA], [valueB, countB]) =>
        countB - countA || valueRanks[valueB as Value] - valueRanks[valueA as Value]
    );

    let rank = 0;
    let combination = 'Carte haute';
    let highCard = hand[0];

    if (sortedCounts[0][1] === 4) {
      rank = 5;
      combination = 'Carré';
      highCard = hand.find((card) => card.value === sortedCounts[0][0])!;
    } else if (sortedCounts[0][1] === 3) {
      rank = 4;
      combination = 'Brelan';
      highCard = hand.find((card) => card.value === sortedCounts[0][0])!;
    } else if (sortedCounts[0][1] === 2 && sortedCounts[1] && sortedCounts[1][1] === 2) {
      rank = 3;
      combination = 'Double Paire';
      highCard = hand.find((card) => card.value === sortedCounts[0][0])!;
    } else if (sortedCounts[0][1] === 2) {
      rank = 2;
      combination = 'Paire';
      highCard = hand.find((card) => card.value === sortedCounts[0][0])!;
    } else {
      rank = 1;
      highCard = hand.reduce((highest, card) =>
        valueRanks[card.value] > valueRanks[highest.value] ? card : highest
      );
    }

    return { rank, combination, highCard };
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Simple Poker</h1>

      {showMenu ? (
        <button onClick={startGameWithShuffle} className="start-button">
          Commencer le jeu
        </button>
      ) : (
        <>
          <div className="hand-container">
            <h2 className="hand-title">Main de l’ordinateur</h2>
            <div className={`card-row ${isShuffling ? 'shuffling' : ''}`}>
              {computerHand.map((card, index) => (
                <CardComponent key={index} card={card} flipped={true} />
              ))}
            </div>
          </div>

          <div className="hand-container">
            <h2 className="hand-title">Votre main</h2>
            <div className={`card-row ${isShuffling ? 'shuffling' : ''}`}>
              {playerHand.map((card, index) => (
                <CardComponent key={index} card={card} flipped={true} />
              ))}
            </div>
          </div>

          {/* Affichage du message de victoire au-dessus des boutons */}
          {winner && <div className="winner-message">{winner}</div>}

          <div className="button-container">
            <button onClick={evaluateHands} className="evaluate-button" disabled={isShuffling}>
              Évaluer les mains
            </button>
            <button onClick={restartGame} className="restart-button" disabled={isShuffling}>
              Recommencer la partie
            </button>
            <button onClick={quitGame} className="quit-button">
              Quitter
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
