import React from "react";

export const Preferences = ({ setGender, hairColorMap, hairColors, toggleSelectHairColor, setVaryFacialHair }) => {
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
        {
          Array.from(hairColorMap).map(([key, value]) => (
            <div key={key}>
              <input
                type="checkbox"
                id={key}
                name={key}
                value={key}
                onClick={() => toggleSelectHairColor(key)}
                checked={hairColors.includes(key)}
              />
              <label className="text-white text-[15px] pl-1" for={key}>
                {value}
              </label>
            </div>
          ))
        }
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
