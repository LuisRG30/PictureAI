import Link from "next/link";

const Header = () => {
  return (
    <div className={`xPaddings py-4 relative gradient-01`}>
      <div className="absolulte gradient-03 inset-0" />
      <div className={`mx-auto flex justify-between gap-8 max-width`}>
        <div className="flex flex-row justify-center items-center gap-3">
          <img
            src="/assets/svgs/logo.svg"
            alt="logo-icon"
            className="w-[34px] h-[34px] object-contain"
          />
          <h1 className="font-bold">logo</h1>
        </div>
        <div className="flex gap-5">
          <Link href="/" className="flex items-center">
            <p className="">Home</p>
          </Link>
          <div className="flex flex-row gap-0.5 cursor-pointer items-center">
            <p className="text-gray-400">Products</p>
            <img
              src="/assets/images/down-arrow.png"
              alt="arrow-icon"
              className="w-[20px] h-[20px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export {Header};
