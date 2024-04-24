import React from 'react';

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

const styleClass = rankStyles[rank] || 'h-20 md:h-40 bg-gray-200';
const rankNumberStyle = rankNumberStyles[rank] || 'text-gray-800';

  return (
    <div className="w-20 md:w-32 flex flex-col items-center mb-4">
      <span className="font-bold text-black-800 md:text-xl text-xs mb-2">{regionName}</span>
      <div className={`${styleClass} w-20 md:w-32 rounded-t-lg relative`}></div>
      <div className={`w-18 mt-2 text-center md:w-28 bg-gradient-to-r ${rankNumberStyle} text-white font-bold py-1.5 px-6 rounded-lg shadow-lg text-shadow`}>
        {rank}
      </div>
    </div>
  );
};

export default Region;
