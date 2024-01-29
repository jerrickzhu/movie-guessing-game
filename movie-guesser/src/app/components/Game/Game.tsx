"use client";
import ImageRenderer from "../ImageRender/ImageRenderer";
import Input from "../InputGuesser/Input";
import Hints from "../Hints/Hints";
import WinningGame from "./WinningGame";
import InProgressGame from "./InProgressGame";
import LostGame from "./LostGame";
import React, { useState, useEffect } from "react";

type GameProps = {
  images: string[];
  genre: string;
  synopsis: string;
  year: string;
  title: string[];
};

type GamePlayData = {
  guesses: number;
  currentGuess: string;
  inputGuess: string[];
  hasWon: boolean;
};

type HintType = number;

export default function Game({
  images,
  genre,
  synopsis,
  year,
  title,
}: GameProps) {
  const [gamePlayData, setGamePlayData] = useState<GamePlayData>({
    guesses: 0,
    currentGuess: "",
    inputGuess: [],
    hasWon: false,
  });
  const [numberOfHints, setNumberOfHints] = useState<HintType>(0);

  const handleGuess = (didWin: boolean): void => {
    if (didWin) {
      setGamePlayData((prevData) => {
        return {
          ...prevData,
          guesses: gamePlayData.guesses + 1,
          currentGuess: prevData.currentGuess,
          hasWon: !prevData.hasWon,
        };
      });
    } else {
      setGamePlayData((prevData) => {
        return {
          ...prevData,
          guesses: gamePlayData.guesses + 1,
          currentGuess: "",
          hasWon: prevData.hasWon,
        };
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setGamePlayData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      gamePlayData.currentGuess === title[1] && gamePlayData.hasWon !== true
        ? handleGuess(true)
        : handleGuess(false);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    gamePlayData.currentGuess === title[1] && gamePlayData.hasWon !== true
      ? handleGuess(true)
      : handleGuess(false);
  };

  const handleClickForHint = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setNumberOfHints((prevNumber) => prevNumber + 1);
  };

  let componentToRender;

  if (gamePlayData.hasWon) {
    componentToRender = (
      <WinningGame
        hasWon={gamePlayData.hasWon}
        index={gamePlayData.guesses}
        images={images}
      />
    );
  } else if (gamePlayData.guesses === 5) {
    componentToRender = (
      <LostGame index={gamePlayData.guesses} hasWon={gamePlayData.hasWon} />
    );
  } else {
    componentToRender = (
      <InProgressGame
        guesses={gamePlayData.guesses}
        currentGuess={gamePlayData.currentGuess}
        images={images}
        numberOfHints={numberOfHints}
        genre={genre}
        synopsis={synopsis}
        year={year}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onClickHint={handleClickForHint}
        hasWon={gamePlayData.hasWon}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-medium py-4">Guess the Movie!</h1>
      {componentToRender}
    </div>
  );
}
