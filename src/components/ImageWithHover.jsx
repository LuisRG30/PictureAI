import React from 'react';

const ImageWithHover = ({ src, name }) => {

  function downloadImage() {
    const link = document.createElement('a');
    link.href = src;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    }

  return (
    <div className="relative inline-block group" onClick={downloadImage}>
      <img 
        src={src} 
        alt={name} 
        className="w-64 h-auto transition duration-300 ease-in-out transform group-hover:filter group-hover:brightness-50 group-hover:blur-sm" 
      />
      <div className="absolute bottom-0 left-0 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <p className="text-lg font-bold">{name}</p>
      </div>
    </div>
  );
};

export default ImageWithHover;
