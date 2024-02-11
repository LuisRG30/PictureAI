import Link from "next/link";
import SearchBar from "../components/SearchBar";
import BeforeAndAfter from "../components/BeforeAndAfter";
import { useState } from "react";
import { useRouter } from 'next/router';

const CreateImages = () => {
  const router = useRouter();

  return (
    <div className={`xPaddings relative`}>
      <div className={`mx-auto flex justify-between gap-8 max-width`}>
        <div className="flex xl:flex-row flex-col justify-center items-center gap-0 yPaddings">
          <div className="flex xl:flex-1 flex-col md:gap-5 gap-10 h-full justify-evenly">
            <div className="flex flex-col">
              <p
                className="sm:text-[55px] text-[35px] 
              font-bold p-0 leading-none"
              >
                Create Stunning Images
              </p>
              <p
                className="text-gradient sm:text-[64px]
               text-[38px] font-extrabold p-0 leading-none mt-1"
              >
                WITH AI
              </p>
            </div>

            <div className="flex flex-col md:max-w-[70%] max-w-[100%] md:pt-6 pt-0">
              <p className="sub-text text-[20px]">
                Upload a photo of yourself and create unique images with our
                powerful AI technology. Select the concepts you would like to create directly or try your
                luck with our reasonably priced mystery boxes.
              </p>
            </div>  

            <div
              className="flex md:flex-row flex-col w-full md:h-[260px]
             h-full gap-5 md:items-start items-center"
            >
              <img
                src="/assets/images/got.jpeg"
                alt="astro-img"
                className="md:w-[175px] w-[250px] md:h-full h-[350px] cursor-pointer rounded-lg"
                onClick={()=> {router.push("/products")}}
              />
              <img
                src="/assets/images/janissary.jpeg"
                alt="robo-img"
                className="md:w-[175px] w-[250px] md:h-full h-[350px] cursor-pointer rounded-lg"
                onClick={()=> {router.push("/products")}}
              />
              <div
                className="md:min-w-[175px] min-w-[250px] md:h-full h-[350px] border border-white rounded-[18px]
                 bg-purple-gradient flex flex-col items-center md:justify-start justify-center cursor-pointer"
                 onClick={()=> {router.push("/products")}}
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
            <img src="/assets/images/planet-girl.png" />
          </div>
        </div>
      </div>
      <div className="w-screen mt-20 grid lg:grid-cols-2 lg:grid-rows-1 md:grid-rows-2 gap-4" style={{ flex: 1}}>
        <div>
          <div className="mt-20">
            <p
              className="sm:text-[42px] text-[25px] 
            font-bold p-0 leading-none"
            >
              Unlock the 
            </p>
            <p
                  className="text-gradient sm:text-[48px]
                text-[28px] font-extrabold p-0 leading-none mt-1"
                >
                  VisageVerse
            </p>
            <p
              className="sm:text-[42px] text-[25px] 
            font-bold p-0 leading-none"
            >
              with a single selfie
            </p>
          </div>
          <div className="mt-12">
            <p className="sub-text text-[20px] text-justify">
              VisageVerse is a powerful AI tool that can transform your selfie
              into stunning pieces of art. Our technology is designed to
              enhance your natural beauty and create a unique visual experience
              that is entirely your own. With VisageVerse, you can unlock a
              universe of possibilities and create images that are truly
              one-of-a-kind.
            </p>
          </div>
        </div>
        <div>
          <BeforeAndAfter />
        </div>
      </div>
      <div className="mt-10">
        <button
              className="flex w-64 h-14 justify-center items-center self-center md:p-2 p-1 md:px-6 px-4 rounded-3xl border hover:border-[1px]
          border-gray-500  "
              style={{
                background:
                  "linear-gradient(90deg, #E85EFF 0%, #6843EC 108.39%)",
              }}
              onClick={() => router.push("/products", { scroll: false })}
            >
              <p className="text-[18px] font-bold font-san">Start Now</p>
            </button>
      </div>
    </div>
  );
};

export { CreateImages };
