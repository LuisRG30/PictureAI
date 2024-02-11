import Link from "next/link";

const Footer = () => {
  return (
    <div className={`xPaddings py-4 relative mt-20`}>
      <div className={`mx-auto flex md:flex-row flex-col justify-between gap-8 max-width`}>
        <div className="flex flex-col justify-start items-start gap-4 md:max-w-[70%]">
          <div className="flex flex-row justify-center items-center gap-3">
            <img
            src="/assets/images/logo.png"
            alt="logo-icon"
            className="w-[160px] h-[68px] object-contain"
          />
          </div>

          <div className="flex flex-col md:max-w-[70%] max-w-[100%]">
            <p className="sub-text">
              Experience the power of AI-generated images with our user-friendly
              platform. Our technology enables you to easily create stunning
              visuals that are entirely unique.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <p className="font-bold text-[20px]">Terms & Conditions</p>
          </div>

          <div className="flex flex-row gap-6">
            <Link href="https://www.tiktok.com/@visageverse" className="flex items-center">
              <img
                src="/assets/svgs/tiktok-logo.svg"
                alt="arrow-icon"
                className="w-[20px] h-[20px] object-contain"
              />
            </Link>

            <Link href="https://twitter.com/visageverse" className="flex items-center">
              <img
                src="/assets/svgs/x-logo.svg"
                alt="arrow-icon"
                className="w-[20px] h-[20px] object-contain"
              />
            </Link>

            <Link href="https://www.instagram.com/thevisageverse/" className="flex items-center">
              <img
                src="/assets/svgs/instagram-logo.svg"
                alt="arrow-icon"
                className="w-[20px] h-[20px] object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
