"use client";
import Image from "next/image";
import { useState } from "react";

const videoIndex = 12;
const mediaItems = Array.from({ length: 12 }, (_, i) => {
  const index = i + 1;
  return {
    type: index === videoIndex ? "video" : "image", // 예시: videoIndex번째는 mp4로 처리
    src:
      index === videoIndex
        ? `/image/gallery/gallery (${i + 1}).mp4`
        : `/image/gallery/gallery (${i + 1}).jpg`,
  };
});

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevImage = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setCurrentIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );
  };

  const nextImage = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  return (
    <section className="px-4 py-20 relative">
      <div className="flex items-center justify-center mb-5">
        <div className="w-1/4 border-t border-deep-green opacity-30"></div>
        <span className="mx-3 text-gray-500">GALLERY</span>
        <div className="w-1/4 border-t border-deep-green opacity-30"></div>
      </div>
      {/* 갤러리 리스트 */}{" "}
      <div className="flex gap-4 overflow-x-auto snap-x snap-proximity">
        {mediaItems.map((item, i) => (
          <div
            key={i}
            className="relative w-72 h-48 flex-shrink-0 snap-center cursor-pointer"
            onClick={() => openLightbox(i)}
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={`이미지 ${i + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            ) : (
              <video
                src={item.src}
                className="object-cover w-full h-full rounded-lg"
                muted
                autoPlay
                loop
              />
            )}
          </div>
        ))}
      </div>
      {/* 라이트박스 */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-100"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-3xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {mediaItems[currentIndex].type === "image" ? (
              <Image
                src={mediaItems[currentIndex].src}
                alt={`이미지 ${currentIndex + 1}`}
                width={800}
                height={600}
                className="object-contain rounded"
              />
            ) : (
              <video
                src={mediaItems[currentIndex].src}
                controls
                autoPlay
                className="max-w-full max-h-[80vh] rounded"
              />
            )}

            {/* 좌측 하단 이미지 위치 표시 */}
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
              {currentIndex + 1} / {mediaItems.length}
            </div>

            {/* 이전 버튼 */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 p-3 bg-opacity-100 text-white text-6xl hover:bg-opacity-70"
            >
              &#8249;
            </button>

            {/* 다음 버튼 */}
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 p-3 bg-opacity-100 text-white text-6xl hover:bg-opacity-70"
            >
              &#8250;
            </button>

            {/* 닫기 버튼 */}
            <button
              onClick={closeLightbox}
              className="absolute top-0 right-2 p-2 font-bold bg-opacity-100 text-white text-2xl hover:bg-opacity-70"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
