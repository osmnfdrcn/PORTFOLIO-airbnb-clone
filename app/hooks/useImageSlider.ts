import { useState, useEffect } from "react";
import { boolean } from "yup";

function useImageSlider(
  images: string[],
  auto: boolean
): [string, () => void, () => void] {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  auto &&
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (currentImageIndex) => (currentImageIndex + 1) % images.length
        );
      }, 5000);

      return () => clearInterval(interval);
    }, [images.length, currentImageIndex]);

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
