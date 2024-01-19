import { Button } from "@/src/components";
import { useState } from "react";

const FileDownloadPage = () => {

  return (
    <div className={`xPaddings yPaddings relative`}>
      <div className={`mx-auto flex flex-col justify-center
       items-center gap-8 max-width `}
      style={{height:500}}>
        <div className="flex md:flex-row flex-col gap-5 p-8" >
            <div className="h-[250px] w-[300px] border border-dashed
             border-gray-300 rounded-2xl flex justify-center items-center"
             style={{padding:5}}>
                <img 
                    src="assets/images/file.png"
                    className="w-100 h-100"
                    style={{width:'300px', height:'250px'}}
                />
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-[24px]">FILE NAME: photo 1</p>
                <p className="text-[24px]">SIZE: 100 mb</p>
                <Button text="Start Download" image="/assets/svgs/Isolation_Mode.svg" isSelected/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FileDownloadPage;
