import React from "react";
import { useRouter } from "next/router";
import { Button, Footer, ImageGallery } from "@/src/components";

const FulfillmentPage = () => {
  const router = useRouter();

  const { pi } = router.query;

  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    const getFullfilment = async () => {
      try {
        const response = await fetch(`/api/fulfillment/${pi}`);
        const fulfillment = await response.json();
        setImages(fulfillment.images);
      } catch (err) {
        console.log(err);
      }
    };
    if (pi) {
      getFullfilment();
    }
  }, [pi]);

  async function downloadAll() {
    const response = await fetch(`/api/zip/${pi}`);
    const data = await response.json();
    const zips = data.zips;
    if (zips.length > 0) {
      const zip = zips[0];
      const link = document.createElement("a");
      link.href = zip.url;
      link.download = zip.Key;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <div>
    <div className={`xPaddings yPaddings relative`}>
      <div
        className={`mx-auto flex flex-col justify-center
       items-center gap-8 max-width `}
        style={{ height: 500 }}
      >
        <div className="flex md:flex-row flex-col gap-5 p-8">
          <div
            className="h-[250px] w-[300px] border border-dashed
             border-gray-300 rounded-2xl flex justify-center items-center"
            style={{ padding: 5 }}
          >
            <img
              src="/assets/images/file.png"
              className="w-100 h-100"
              style={{ width: "300px", height: "250px" }}
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-[16px]">Download All Images</p>
            <Button
              onClick={downloadAll}
              text="Start Download"
              image="/assets/svgs/Isolation_Mode.svg"
              isSelected
            />
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className="flex flex-col w-full py-4 gap-4 h-[100%]  justify-center items-center space-y-4">
          <p className=" text-xl font-bold text-center leading-4 text-white">
            Images Preview
          </p>
          <div className="w-[100%] ">
            <ImageGallery
              ImageSources={images}
              handleImageSelection={() => {}}
              isSelectedImage={false}
              isFulfillment={true}
            />
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default FulfillmentPage;
