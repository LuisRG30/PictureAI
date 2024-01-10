const Button = ({ text, image, styles }) => {
    return (
      <button
        className="md:p-2 p-1 md:px-6 px-4 rounded-3xl border hover:border-[1px]
          border-gray-500 w-max max-w-[190px] hover:bg-[#DE29E233]
          overflow-hidden flex flex-row justify-center"
          style={styles}
      >
        <p className="md:text-[15px] text-[13px] 
        whitespace-nowrap overflow-ellipsis">{text}</p>
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
  