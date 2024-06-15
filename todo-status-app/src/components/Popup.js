import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Popup = ({ show, onClose }) => {
  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center ${show ? 'visible' : 'invisible'}`}>
      <div className="bg-green-800 text-white rounded-lg p-8 shadow-lg flex items-center justify-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <FontAwesomeIcon icon={faCheck} className="text-white text-4xl mr-4" />
        <p className="text-white">Group Added Successfully!</p>
      </div>
    </div>
  );
};

export default Popup;
