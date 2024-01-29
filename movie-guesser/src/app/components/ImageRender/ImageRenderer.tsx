import React, { useState, useEffect } from "react";
import Image from "next/image";
import Oppy from "../../../../public/Oppenheimer-64.jpg";
import FallenAngels from "../../../../public/fallen.jpeg";

type ImageProps = {
  images: string[];
  indexOfImages: number;
  hasWon: boolean;
};

type browseImageType = number;

export default function ImageRenderer({
  images,
  indexOfImages,
  hasWon,
}: ImageProps) {
  const [browseImageIndex, setBrowseImageIndex] = useState<browseImageType>(0);
  const TOTAL_NUMBER_OF_IMAGES: number = 5;
  let componentToRender;

  useEffect(() => {
    setBrowseImageIndex(indexOfImages);
  }, [indexOfImages]);

  const handleClick = (direction: string): void => {
    if (direction === "left" && browseImageIndex !== 0) {
      setBrowseImageIndex((prevIndex) => prevIndex - 1);
    } else if (
      direction === "right" &&
      browseImageIndex < TOTAL_NUMBER_OF_IMAGES &&
      browseImageIndex < indexOfImages
    ) {
      setBrowseImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (hasWon) {
    componentToRender = (
      <Image src={FallenAngels} alt="fallen angels" width={1000} height={600} />
    );
  } else if (!hasWon && browseImageIndex < TOTAL_NUMBER_OF_IMAGES) {
    componentToRender = (
      <>
        <Image
          src={images[browseImageIndex]}
          alt={`image-${browseImageIndex}`}
          width={1000}
          height={600}
        />
        <div className="flex justify-around">
          <button onClick={() => handleClick("left")}>Left</button>
          <button onClick={() => handleClick("right")}>Right</button>
        </div>
      </>
    );
  } else {
    componentToRender = (
      <Image src={Oppy} alt="Oppenheimer lost" width={1000} height={600} />
    );
  }
  return <div className="">{componentToRender}</div>;
}
