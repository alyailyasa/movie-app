import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    return (
      <>
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-10">
            <div className="bg-[#fafafac9] p-6 rounded-md flex flex-col justify-start">
                <div className="mb-10 flex justify-end">
                    <button className="mt-4 flex items-end justify-items-end justify-end" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-red-600 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
          </div>
        )}
      </>
    );
};

export default Modal