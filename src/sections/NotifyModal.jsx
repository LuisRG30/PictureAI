import React from "react";
import { Button, Modal } from "@/src/components";
import { errorModalData, successModalData } from "@/src/utils/constants";

const NotifyModal = ({ isOpen, onClose, error, OnSuccess }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="flex justify-center items-center flex-col min-w-[300px] w-full gap-5" style={{ padding: 50 }}>
        <div className="h-[70px] w-[70px]">
          <img src={`/assets/svgs/${error ? errorModalData.img : successModalData.img}`} alt="modal-icon" />
        </div>
        <p className="text-gray-600 font-bold text-[20px]">
          {error ? errorModalData.title : successModalData.title}
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 font-bold text-[16px] text-center">
            {error ? errorModalData.subTitle : successModalData.subTitle}
          </p>
          <p className="text-gray-600 font-bold text-[16px] text-center">
            {error ? errorModalData.subTitle2 : successModalData.subTitle2}
          </p>
          <p className="text-gray-600 text-[16px] text-center">
            {error ? errorModalData.message : successModalData.message}
          </p>
        </div>
        <Button
          text={error ? errorModalData.buttonText : successModalData.buttonText}
          classes="border-none"
          styles={{
            backgroundColor: error ? errorModalData.color : successModalData.color,
            paddingLeft: 50,
            paddingRight: 50,
          }}
          onClick={()=>{
            console.log("btn click")
            onClose();
            OnSuccess();
        }}
        />
      </div>
    </Modal>
  );
};

export {NotifyModal};
