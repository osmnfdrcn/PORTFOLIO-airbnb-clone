import { useState, useEffect, useRef } from "react";

function useImageSlider(
  images: string[],
  auto: boolean
): [string, () => void, () => void] {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (auto) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(
          (currentImageIndex) => (currentImageIndex + 1) % images.length
        );
      }, 3000);
    }

    return () => clearInterval(intervalRef.current);
  }, [auto, images.length]);

  function handlePrevImage(): void {
    setIsPaused(true);
    setCurrentImageIndex(
      (currentImageIndex) =>
        (currentImageIndex + images.length - 1) % images.length
    );
  }

  function handleNextImage(): void {
    setIsPaused(true);
    setCurrentImageIndex(
      (currentImageIndex) =>
        (currentImageIndex + images.length + 1) % images.length
    );
  }

  const currentImage: string = images[currentImageIndex];

  useEffect(() => {
    if (isPaused && auto) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(
          (currentImageIndex) => (currentImageIndex + 1) % images.length
        );
      }, 3000);
      setIsPaused(false);
    }
  }, [isPaused, auto, images.length]);

  return [currentImage, handlePrevImage, handleNextImage];
}

export default useImageSlider;
