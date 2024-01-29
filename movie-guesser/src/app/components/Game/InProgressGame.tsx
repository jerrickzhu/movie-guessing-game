import React from "react";
import Hints from "../Hints/Hints";
import ImageRenderer from "../ImageRender/ImageRenderer";
import Input from "../InputGuesser/Input";

type InProgressGameProps = {
  guesses: number;
  currentGuess: string;
  images: string[];
  numberOfHints: number;
  genre: string;
  synopsis: string;
  year: string;
  hasWon: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClickHint: React.MouseEventHandler<HTMLButtonElement>;
};

export default function InProgressGame({
  guesses,
  currentGuess,
  images,
  numberOfHints,
  onChange,
  onClick,
  onKeyDown,
  onClickHint,
  synopsis,
  genre,
  year,
  hasWon,
}: InProgressGameProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{`You have ${5 - guesses} guesses left. Guess wisely!`}</h1>
      <ImageRenderer images={images} indexOfImages={guesses} hasWon={hasWon} />
      <div className="flex flex-row justify-around py-4 w-6/12">
        <Input
          value={currentGuess}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onClick={onClick}
        />
        <button
          className="border-2 border-black rounded-md p-2 shadow-md hover:bg-gray-300"
          onClick={onClickHint}
        >
          Need a hint?
        </button>
      </div>
      {numberOfHints !== 0 && (
        <Hints
          genre={genre}
          synopsis={synopsis}
          year={year}
          hintNumber={numberOfHints}
        />
      )}
    </div>
  );
}
