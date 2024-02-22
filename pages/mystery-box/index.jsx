import { Button, Footer } from "@/src/components";
import { useRouter } from "next/navigation";

const MysteryBox = () => {
  const navigate = useRouter();
  return (
    <div>
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
              text="Mystery Box S"
              classes=" w-full max-w-full cursor-pointer"
            />
            <div className="border border-1 rounded-md p-4 w-full">
              <p>
                Price: $2.99 <br />
                Includes: <br />
                <br />
                5 concepts, 2 images each (10 images in total)  <br />
                Luck Multiplier*: 1x{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-6">
            <img src="/assets/images/mystery-box-m.png" className="w-100px" />
            <Button
              onClick={() => navigate.push("/products")}
              text="Mystery Box M"
              classes="w-full max-w-full"
            />
            <div
              className="border border-1 rounded-md p-4 bg-black-purple w-full"
              style={{
                background: "linear-gradient(180deg, rgba(203, 88, 250, 0.00) 0%, #8348F0 100%)",
              }}
            >
              <p>
                Price: $5.99 <br />
                Includes: <br />
                <br />
                12 concepts, 2 images each (24 images in total)  <br />
                Luck Multiplier: 4x{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-6">
            <img src="/assets/images/mystery-box-l.png" width={229} height={248} />
            <Button
              onClick={() => navigate.push("/products")}
              text="Mystery Box L"
              classes="w-full max-w-full"
            />
            <div className="border border-1 rounded-md p-4 w-full">
              <p>
              Price: $9.99 <br />
                Includes: <br />
                <br />
                25 concepts, 2 images each (50 images in total)  <br />
                Luck Multiplier: 8x{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-6">
            <img src="/assets/images/mystery-box-xl.png" className="w-100px" />
            <Button
              onClick={() => navigate.push("/products")}
              text="Mystery Box XL"
              classes="w-full max-w-full"
            />
            <div
              className="border border-1 rounded-md p-4 bg-black-purple w-full"
              style={{
                background: "linear-gradient(180deg, rgba(203, 88, 250, 0.00) 0%, #8348F0 100%)",
              }}
            >
              <p>
                Price: $19.99 <br />
                Includes: <br />
                <br />
                50 concepts, 2 images each (100 images in total)  <br />
                Luck Multiplier: 16x{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default MysteryBox;
