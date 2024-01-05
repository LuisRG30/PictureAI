import SearchBar from "../components/SearchBar";

const CreateImages = () => {
  return (
    <div className={`xPaddings relative`}>
      <div className={`mx-auto flex justify-between gap-8 max-width`}>
        <div className="flex xl:flex-row flex-col justify-center items-center gap-0 yPaddings">
          <div className="flex xl:flex-1 flex-col md:gap-5 gap-10 h-full justify-evenly">
            <div className="flex flex-col">
              <p className="sm:text-[55px] text-[35px] 
              font-bold p-0 leading-none">
                Create Stunning Images
              </p>
              <p className="text-gradient sm:text-[64px]
               text-[38px] font-extrabold p-0 leading-none mt-1">
                WITH AI
              </p>
            </div>

            <div className="flex flex-col md:max-w-[70%] max-w-[100%] md:pt-6 pt-0">
              <p className="sub-text">
                Experience the power of AI-generated images with our
                user-friendly platform .Our technology enables you to easily
                create stunning visuals that are entirely unique. Say goodbye to
                stock photos and hello to a world of endless possibilities
              </p>
            </div>

            <SearchBar />

            <div className="flex md:flex-row flex-col w-full md:h-[260px]
             h-full gap-5 md:items-start items-center">
              <img 
                src="/assets/images/astro.png"
                alt="astro-img"
                className="md:w-[175px] w-[250px] md:h-full h-[350px]"
              />
              <img 
                src="/assets/images/robot.png"
                alt="robo-img"
                className="md:w-[175px] w-[250px] md:h-full h-[350px]"
              />
              <div
                className="md:min-w-[175px] min-w-[250px] md:h-full h-[350px] border border-white rounded-[18px]
                 bg-purple-gradient flex flex-col items-center md:justify-start justify-center"
              >
                <img 
                    src="/assets/images/mystery-box.png"
                    alt="atro-img"
                    className="w-[195px] h-[190px] mt-"
                />
                <p className="font-bold text-[17px] w-full text-center">
                    MYSTERY BOX
                </p>
              </div>
            </div>
          </div>

          <div className="flex xl:flex-[0.75] xl:mt-0 mt-20">
            <img
              src="/assets/images/planet-girl.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateImages };
