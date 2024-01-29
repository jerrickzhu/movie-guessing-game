import ImageRow from "./ImageRow";

export default function LoadingScreen() {
    const imagesContext = require.context("../../../../public/images", false, /\.(jpeg)$/);
    const imageFilenames: string[] = imagesContext.keys()
    const rows: string[][] = [imageFilenames.slice(0, 15), imageFilenames.slice(15, 30)];
    return (
    <div>
      <ImageRow rotateDirection={true} imageArray={rows[0]}/>
      <ImageRow rotateDirection={false} imageArray={rows[1]}/>
    </div>
  )
};