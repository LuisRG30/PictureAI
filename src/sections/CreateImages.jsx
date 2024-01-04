const CreateImages = () => {
  return (
    <div className={`xPaddings py-4 relative`}>
      <div className={`mx-auto flex justify-between gap-8 max-width`}>
        <div className="flex flex-row justify-center items-center gap-3">
          <div className="flex flex-1 flex-col">
            <div className="flex flex-col">
              <p>Create Stunning Images</p>
              <p>WITH AI</p>
            </div>

            <div className="flex flex-col max-w-[80%]">
              <p className="sub-text">
                Experience the power of AI-generated images with our
                user-friendly platform .Our technology enables you to easily
                create stunning visuals that are entirely unique. Say goodbye to
                stock photos and hello to a world of endless possibilities
              </p>
            </div>
          </div>

          <div className="flex flex-[0.75]"></div>
        </div>
      </div>
    </div>
  );
};

export { CreateImages };
