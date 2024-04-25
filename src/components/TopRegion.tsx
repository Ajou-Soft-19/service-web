import React from 'react';
import Region from './Region';

interface CountData {
  regionSupporters: { region: string }[];
}

interface TopRegionsProps {
  countData: CountData;
}

const TopRegions: React.FC<TopRegionsProps> = ({ countData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-black mb-4">🏆 Top Supporters</h2>
      <div className="flex justify-center" style={{ alignItems: "end" }}>
        <Region rank="2nd" regionName={countData.regionSupporters[1].region} />
        <Region rank="1st" regionName={countData.regionSupporters[0].region} />
        <Region rank="3rd" regionName={countData.regionSupporters[2].region} />
      </div>
    </div>
  );
};

export default TopRegions;
