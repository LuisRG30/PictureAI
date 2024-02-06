import React from "react";

export const Preferences = ({ setGender, toggleSelectHairColor, setVaryFacialHair }) => {
  return (
    <div className="md:w-full w-[90%]">
      <p className="mt-2">Choose a prefered gender</p>
      <div className="flex flex-row gap-5">
        <div>
          <input type="radio" id="man" name="gender" value="man" onClick={() => setGender("man")} />
          <label className="text-white text-[15px] pl-1" for="man">
            Man
          </label>
        </div>
        <div>
          <input type="radio" id="woman" name="gender" value="woman" onClick={() => setGender("woman")} />
          <label className="text-white text-[15px] pl-1" for="woman">
            Woman
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="non-binary"
            name="gender"
            value="uninon-binary"
            onClick={() => setGender("non-binary")}
          />
          <label className="text-white text-[15px] pl-1" for="unisex">
            Do not specify
          </label>
        </div>
      </div>
      <p className="mt-2">Choose one or more of these hair colors</p>
      <div className="flex flex-row gap-3 flex-wrap">
        <div>
          <input
            type="checkbox"
            id="blonde"
            name="hair"
            value="blonde"
            onClick={() => toggleSelectHairColor("blonde")}
          />
          <label className="text-white text-[15px] pl-1" for="blonde">
            Blonde
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="brown"
            name="hair"
            value="brown"
            onClick={() => toggleSelectHairColor("brown")}
          />
          <label className="text-white text-[15px] pl-1" for="brown">
            Brown
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="black"
            name="hair"
            value="black"
            onClick={() => toggleSelectHairColor("black")}
          />
          <label className="text-white text-[15px] pl-1" for="black">
            Black
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="red"
            name="hair"
            value="red"
            onClick={() => toggleSelectHairColor("red")}
          />
          <label className="text-white text-[15px] pl-1" for="red">
            Red
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="grey"
            name="hair"
            value="grey"
            onClick={() => toggleSelectHairColor("grey")}
          />
          <label className="text-white text-[15px] pl-1" for="grey">
            Grey
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="white"
            name="hair"
            value="white"
            onClick={() => toggleSelectHairColor("white")}
          />
          <label className="text-white text-[15px] pl-1" for="white">
            White
          </label>
        </div>
      </div>
      <p className="mt-2">Would you like us to create pictures with varied facial hair styles?</p>
      <div className="flex flex-row gap-3">
        <div>
          <input
            type="radio"
            id="yes"
            name="facialHair"
            value={true}
            onClick={() => setVaryFacialHair(true)}
          />
          <label className="text-white text-[15px] pl-1" for="yes">
            Yes
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="no"
            name="facialHair"
            value={false}
            onClick={() => setVaryFacialHair(false)}
          />
          <label className="text-white text-[15px] pl-1" for="no">
            No
          </label>
        </div>
      </div>
    </div>
  );
};
