"use client";

import { useRentModal } from "@/app/hooks";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../../../../base/Button";

interface AirBnbYourHomeModalContainerProps {
  reset: () => void;
  children: React.ReactNode;
}

const AirBnbYourHomeModalContainer = ({
  reset,
  children,
}: AirBnbYourHomeModalContainerProps) => {
  const { isOpen, onClose } = useRentModal();
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => setShowModal(isOpen), [isOpen]);

  const handleCloseModal = useCallback(() => {
    reset();
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="
          flex justify-center items-center 
          overflow-x-hidden overflow-y-auto 
          fixed inset-0 z-50 
          outline-none focus:outline-none 
          bg-neutral-800/70 

        "
      >
        <div
          className="
            relative 
            w-full md:w-4/6 lg:w-3/6 xl:w-2/5 
            my-6 mx-auto 
            h-full md:h-auto lg:h-auto 
          "
        >
          {/* CONTENT */}
          <div
            className={`
              translate duration-300 h-full 
              ${showModal ? "translate-y-0" : "translate-y-full"}
              ${showModal ? "opacity-100" : "opacity-0"}
            `}
          >
            <div
              className="
                relative flex flex-col 
                border-0 rounded-lg shadow-lg 
                w-full bg-white outline-none 
                h-full md:h-auto lg:h-auto 
                focus:outline-none
                translate  
              "
            >
              {/* HEADER */}
              <div
                className="
                  flex items-center justify-center  
                  p-6 rounded-t relative border-b-[1px]
                "
              >
                <button
                  onClick={handleCloseModal}
                  className="
                    absolute left-9
                    p-1 border-0 
                    hover:opacity-70 
                    transition
                  "
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">
                  {"AirBnb Your Home"}
                </div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AirBnbYourHomeModalContainer;
