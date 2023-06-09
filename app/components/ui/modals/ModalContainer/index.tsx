"use client";

import { Button } from "@/app/components/base";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionText: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionText?: string;
}

const ModalContainer = (props: ModalProps) => {
  const {
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionText,
    disabled,
    secondaryAction,
    secondaryActionText,
  } = props;

  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => setShowModal(isOpen), [isOpen]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none    bg-neutral-800/70">
        <div className="relative w-full md:w-[400px] my-6 mx-auto  md:h-auto lg:h-auto">
          {/* CONTENT */}
          <div
            className={`
              translate duration-300 h-full 
              ${showModal ? "translate-y-0" : "translate-y-full"}
              ${showModal ? "opacity-100" : "opacity-0"}
            `}
          >
            <div className="relative flex flex-col border-0 rounded-lg shadow-lg  w-full bg-white outline-none h-full md:h-auto lg:h-auto focus:outline-none translate">
              {/* HEADER */}
              <div className="flex items-center justify-center                  p-6 rounded-t relative border-b-[1px]">
                <button
                  onClick={handleCloseModal}
                  className="absolute left-9 p-1 border-0                   hover:opacity-70 transition"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title} </div>
              </div>
              {/* BODY */}
              <div className="relative p-6 ">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center w-full gap-4">
                  {secondaryAction && secondaryActionText && (
                    <Button
                      outline
                      onClick={handleSecondaryAction}
                      text={secondaryActionText}
                      disabled={disabled}
                    />
                  )}
                  <Button
                    onClick={handleSubmit}
                    text={actionText}
                    disabled={disabled}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalContainer;
