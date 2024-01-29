import ImageRenderer from "../ImageRender/ImageRenderer";

type LostGamePops = {
  hasWon: boolean;
  index: number;
};

export default function LostGame({ hasWon, index }: LostGamePops) {
  return (
    <>
      <ImageRenderer images={[]} indexOfImages={index} hasWon={hasWon} />
      <h1 className="text-5xl font-medium py-4">You lost!</h1>
    </>
  );
}
