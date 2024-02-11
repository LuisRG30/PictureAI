import { useState } from "react";

const Button = ({
  text,
  image,
  styles,
  isSelected = false,
  classes = "",
  textClasses = "",
  onClick,
  showDelBtn,
  delBtnClick
}) => {
  const [isViewDelBtn, setIsViewDelBtn] = useState(false);
  return (
    <button
      className={`cursor-pointer md:p-2 p-1 md:px-6 px-4 rounded-3xl border hover:border-[1px]
          border-gray-500 min-w-[100px] max-w-[195px] 
          overflow-hidden flex flex-row justify-center items-center ${
            isSelected
              ? "bg-[#DE29E233] hover:bg-[#DE29E244]"
              : "hover:bg-[#DE29E233]"
          } ${classes}`}
      onClick={onClick}
      onMouseEnter={()=> {setIsViewDelBtn(true)}}
      onMouseLeave={()=> {setIsViewDelBtn(false)}}
      style={styles}
    >
      <div className="flex items-center"> {/* Wrap content in a flex container */}
        <p
          className={`md:text-[14px] text-[13px] 
          whitespace-nowrap overflow-ellipsis ${textClasses} overflow-hidden max-w-[130px]`}
        >
          {text}
        </p>
        {showDelBtn && isViewDelBtn &&(
          <img
            src={"/assets/svgs/trash.svg"}
            alt="Button Image"
            className="w-3 h-3 top-[4px] right-3 absolute"
            onClick={delBtnClick}
          />
        )}
        {image && (
          <img
            src={image}
            alt="Button Image"
            className="w-6 h-6 ml-2 inline-block"
          />
        )}
      </div>
    </button>
  );
};

export { Button };