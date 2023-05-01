import { useState, useEffect } from "react";

function useImageSlider(
  images: string[],
  auto: boolean
): [string, () => void, () => void] {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (auto) {
      interval = setInterval(() => {
        setCurrentImageIndex(
          (currentImageIndex) => (currentImageIndex + 1) % images.length
        );
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [auto, images.length]);

  function handlePrevImage(): void {
    setCurrentImageIndex(
      (currentImageIndex) =>
        (currentImageIndex + images.length - 1) % images.length
    );
  }

  function handleNextImage(): void {
    setCurrentImageIndex(
      (currentImageIndex) =>
        (currentImageIndex + images.length + 1) % images.length
    );
  }

  const currentImage: string = images[currentImageIndex];

  return [currentImage, handlePrevImage, handleNextImage];
}

export default useImageSlider;
