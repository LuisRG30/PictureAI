import { useState } from 'react';
import { Button } from '.';

const UploadImage = ({ setUploadedImage, clearUploadedImage }) => {
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check if the file type is either an image or a video
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImage(reader.result);
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // Handle invalid file type
        alert('Invalid file type. Please upload an image.');
      }
    }
  };

  const handleRemoveImage = () => {
    clearUploadedImage();
    setPreview(null);
  };

  return (
    <div className="flex flex-col w-full md:pt-[50px] pt-3 items-center gap-0">
      <div className="border border-dashed border-gray-800 h-[300px] rounded-2xl p-4 flex flex-col gap-3 w-full">
        <div
          className="border-[0.5px] h-[80%] rounded-xl border-gray-800 flex items-center justify-center relative"
          style={{ background: 'rgba(222, 41, 226, 0.08)' }}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-full max-w-full w-full" />
          ) : (
            <p className="text-[20px] text-center">Preview</p>
          )}
          {preview && (
            <div
              className="rounded-full border border-[#511010] px-4 text-[#511010]
                absolute top-3 right-3 w-[32px] h-[32px] cursor-pointer"
              onClick={handleRemoveImage}
            >
              <div className="border border-[#511010] w-[13px] absolute top-[14px] right-[10px]" />
            </div>
          )}
        </div>
        <div className="flex flex-row justify-end gap-2">
          <label className="relative overflow-hidden">
            <Button text="Upload" image="/assets/svgs/Isolation_Mode.svg" />
            <input
              type="file"
              accept="image/*, video/*"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </label>
          <Button text="Generate" />
        </div>
      </div>
    </div>
  );
};

export { UploadImage };
