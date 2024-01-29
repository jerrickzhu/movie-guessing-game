import Image from 'next/image';

type RowProps = {
  rotateDirection?: boolean;
  imageArray: string[]
}

export default function ImageRow({ rotateDirection, imageArray }: RowProps) {
  return (
    <div className="flex">
      {imageArray.map((file: string, index: number) => (
        <Image 
          key={index}
          fill={false}
          src={`/images/${file.substring(2)}`}
          alt={`${file}-${index}`}
          width={400}
          height={1000}
          className="mr-2 w-4 h-8"
        />
      ))}
    </div>
  )
}