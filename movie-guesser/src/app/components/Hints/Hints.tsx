"use client";

type HintsProps = {
  genre: string;
  synopsis: string;
  year: string;
  hintNumber: number;
};

export default function Hints({
  genre,
  synopsis,
  year,
  hintNumber,
}: HintsProps) {
  return (
    <div className="w-6/12 flex flex-col">
      <ul>
        {hintNumber >= 1 && <li>{genre}</li>}
        {hintNumber >= 2 && <li>{year}</li>}
        {hintNumber >= 3 && <li>{synopsis}</li>}
      </ul>
    </div>
  );
}
