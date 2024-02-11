import { Button } from "@/src/components";
import { useRouter } from "next/navigation";

const MysteryBox = () => {
  const navigate = useRouter();
  return (
    <div className={`xPaddings yPaddings relative`}>
      <div
        className={`mx-auto flex flex-col justify-center
       items-center gap-8 max-width `}
      >
        <h1
          className="sm:text-[55px] text-[35px] 
              font-bold p-0 leading-none"
        >
          MYSTERY BOXES
        </h1>
        <div
          className="flex md:flex-row flex-col mt-20 justify-between
          w-[300px] md:w-full gap-10"
        >
          <div className="flex flex-col justify-center items-center gap-6">
            <img src="/assets/images/mystery-box-s.png" width={229} height={248} />
            <Button
              onClick={() => navigate.push("/products")}
              text="MYSTERY BOX S"
              classes=" w-full max-w-full cursor-pointer"
            />
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
            <img src="/assets/images/mystery-box-m.png" className="w-100px" />
            <Button
              onClick={() => navigate.push("/products")}
              text="MYSTERY BOX M"
              classes="w-full max-w-full bg-purple-gradient"
            />
            <div
              className="border border-1 rounded-md p-4 bg-black-purple w-full"
              style={{
                background: "linear-gradient(180deg, rgba(203, 88, 250, 0.00) 0%, #8348F0 100%)",
              }}
            >
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
            <img src="/assets/images/mystery-box-l.png" width={229} height={248} />
            <Button
              onClick={() => navigate.push("/products")}
              text="MYSTERY BOX L"
              classes="w-full max-w-full"
            />
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
            <img src="/assets/images/mystery-box-xl.png" className="w-100px" />
            <Button
              onClick={() => navigate.push("/products")}
              text="MYSTERY BOX XL"
              classes="w-full max-w-full bg-purple-gradient"
            />
            <div
              className="border border-1 rounded-md p-4 bg-black-purple w-full"
              style={{
                background: "linear-gradient(180deg, rgba(203, 88, 250, 0.00) 0%, #8348F0 100%)",
              }}
            >
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
    </div>
  );
};

export default MysteryBox;
