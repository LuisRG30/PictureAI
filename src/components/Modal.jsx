import React, { useRef, useEffect } from 'react';

export const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleBodyOverflow = () => {
      document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    handleBodyOverflow();

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      handleBodyOverflow(); // Revert body overflow on component unmount
    };
  }, [onClose, isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 overflow-y-hidden">
          <div className="absolute w-full h-full bg-gray-800 bg-opacity-50" onClick={onClose}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              ref={modalRef}
              className="bg-white p-6 rounded shadow-md sm:min-w-96 w-full h-80vh max-h-full overflow-y-auto z-10"
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
