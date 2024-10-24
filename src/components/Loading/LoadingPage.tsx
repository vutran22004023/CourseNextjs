// components/Loading.js
import React from 'react';
import Image from 'next/image'
import bgImage from '@/../public/brain_background.gif'
const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="absolute inset-0 flex items-center justify-center z-50 bg-[#171722] p-5 ">
        <Image
          className="w-48 h-48"
          src={bgImage}
            width={192}
            height={192}
            alt='123'
        />
      </div>
    </div>
  );    
};

export default LoadingPage;
