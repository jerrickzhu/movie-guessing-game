import React from "react";
import ImageRenderer from "../ImageRender/ImageRenderer";

type WinningGameProps = {
  hasWon: boolean;
  images: string[];
  index: number;
};

export default function WinningGame({
  hasWon,
  index,
  images,
}: WinningGameProps) {
  return (
    <>
      <ImageRenderer images={images} indexOfImages={index} hasWon={hasWon} />
      <h1 className="text-4xl">You won!</h1>
    </>
  );
}
