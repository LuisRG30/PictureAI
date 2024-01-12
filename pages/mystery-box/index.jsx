import { Button } from "@/src/components";

const MysteryBox = () => {

  return (
    <div
      className="flex flex-col items-center justify-center 
      min-h-screen yPaddings max-width xPaddings"
    >
      <h1
        className="sm:text-[55px] text-[35px] 
              font-bold p-0 leading-none"
      >
        MYSTERY PACKAGES
      </h1>
      <div className="flex md:flex-row flex-col mt-20 justify-between
      max-w-[300px] md:w-full gap-10">
        <div className="flex flex-col justify-center items-center gap-6">
          <img src="/assets/svgs/silver-box.svg" width={229} height={248} />
          <Button text="SILVER $10" classes=" w-full max-w-full" />
          <div className="border border-1 rounded-md p-4 w-full">
            <p>
              You may get: <br />

              <br />
              1. Lorem Ipsum dolor <br />
              2. Lorem Ipsum dolor <br />
              3. Lorem Ipsum dolor{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6">
        <img src="/assets/svgs/gold-box.svg" className="w-100px" />
          <Button text="GOLD $40" classes="w-full max-w-full bg-purple-gradient"/>
          <div className="border border-1 rounded-md p-4 bg-black-purple w-full"
          style={{background: "linear-gradient(180deg, rgba(203, 88, 250, 0.00) 0%, #8348F0 100%)"}}>
            <p>
              You may get: <br />
              <br />
              1. Lorem Ipsum dolor <br />
              2. Lorem Ipsum dolor <br />
              3. Lorem Ipsum dolor{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6">
          <img src="/assets/svgs/diamond-box.svg" width={229} height={248} />
          <Button text="DIAMOND $80" classes="w-full max-w-full"/>
          <div className="border border-1 rounded-md p-4 w-full">
            <p>
              You may get: <br />
              <br />
              1. Lorem Ipsum dolor <br />
              2. Lorem Ipsum dolor <br />
              3. Lorem Ipsum dolor{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MysteryBox;