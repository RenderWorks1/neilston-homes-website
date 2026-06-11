import Image from 'next/image';

export function PhotoGallery({ images, alt }: { images: string[]; alt: string }) {
  if (!images.length) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
      {images.map((src, i) => (
        <div
          key={i}
          className="relative aspect-[4/3] bg-grey-light overflow-hidden group"
        >
          <Image
            src={src}
            alt={`${alt} — photo ${i + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
