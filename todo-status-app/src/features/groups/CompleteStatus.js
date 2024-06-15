import React from 'react';

const CompleteStatus = ({ isComplete }) => {
  return (
    <div className="relative">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isComplete ? 'bg-gray-200' : 'bg-green-500'}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${isComplete ? 'text-white' : 'text-gray-200'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
};

export default CompleteStatus;
