const Button = ({ text, image, styles, isSelected = false,
   classes = "",textClasses="", onClick }) => {
  return (
    <button
      className={`cursor-pointer md:p-2 p-1 md:px-6 px-4 rounded-3xl border hover:border-[1px]
          border-gray-500 min-w-[100px] max-w-[190px] 
          overflow-hidden flex flex-row justify-center items-center ${
            isSelected
              ? "bg-[#DE29E233] hover:bg-[#DE29E244]"
              : "hover:bg-[#DE29E233]"
          } ${classes}`
      }
      onClick={onClick}
      style={styles}
    >
      <p
        className={`md:text-[15px] text-[13px] 
        whitespace-nowrap overflow-ellipsis ${textClasses}`}
      >
        {text}
      </p>
      {image && (
        <img
          src={image}
          alt="Button Image"
          className="w-6 h-6 ml-2 inline-block"
        />
      )}
    </button>
  );
};

export { Button };
