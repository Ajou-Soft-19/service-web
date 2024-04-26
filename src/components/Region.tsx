import React from 'react';
import GoldMedal from './img/Gold-Medal.svg'
import SilverMedal from './img/Silver-Medal.svg'
import BronzeMedal from './img/Bronze-Medal.svg'
import { StaticImageData } from 'next/image';

import Image from 'next/image';

interface RegionProps {
  rank: string;
  regionName: string;
}

const Region: React.FC<RegionProps> = ({ rank, regionName }) => {
const rankStyles: { [key: string]: string } = {
    '1st': 'h-32 md:h-64 bg-gradient-to-t from-yellow-400 to-yellow-300 shadow-lg',
    '2nd': 'h-24 md:h-48 bg-gradient-to-t from-gray-300 to-gray-200 shadow-md',
    '3rd': 'h-20 md:h-40 bg-gradient-to-t from-orange-400 to-orange-300 shadow'
};

const rankNumberStyles: { [key: string]: string } = {
    '1st': 'from-yellow-400 to-yellow-300',
    '2nd': 'from-gray-300 to-gray-200',
    '3rd': 'from-orange-400 to-orange-300'
};

const rankMedalImage: {[key: string]: StaticImageData } = {
    '1st': GoldMedal,
    '2nd': SilverMedal,
    '3rd': BronzeMedal
};

const styleClass = rankStyles[rank] || 'h-20 md:h-40 bg-gray-200';
const rankNumberStyle = rankNumberStyles[rank] || 'text-gray-800';
const medalImage = rankMedalImage[rank] || GoldMedal;

  return (
    <div className="w-20 md:w-32 flex flex-col items-center mb-4">
      <span className="font-bold text-black-800 md:text-xl text-black text-xs mb-2">{regionName}</span>
      <div className={`${styleClass} w-20 md:w-32 rounded-t-lg relative`}>
        <div className='flex justify-center mt-5'>
        <Image src={medalImage} alt="medal" className="w-8 h-8 md:w-16 md:h-16" />
        </div>
      </div>
      <div className={`w-18 mt-2 text-center md:w-28 bg-gradient-to-r ${rankNumberStyle} text-white font-bold py-1.5 px-6 rounded-lg shadow-lg text-shadow`}>
        {rank}
      </div>
    </div>
  );
};

export default Region;
