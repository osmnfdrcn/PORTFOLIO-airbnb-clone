"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

const uploadPreset = "yu4jqpqr";

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const [images, setImages] = useState<string[]>([]);

  const handleUpload = useCallback(
    (result: any) => {
      const updatedImages = [...images, result.info.secure_url];
      setImages(updatedImages);
      onChange(updatedImages);
    },
    [onChange, images]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFileSize: 1024000,
        maxFiles: 10,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70             transition border-dashed border-2 p-20              border-neutral-300 flex flex-col justify-center               items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value[0] || "/images/imageUpload.png"}
                  alt=""
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
