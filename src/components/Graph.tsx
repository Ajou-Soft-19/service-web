import React, {useEffect, useState} from 'react';
import {Region, RegionCountInterface} from "@/app/page";

export interface GraphProps {
    regionSupporters : RegionCountInterface[];
    totalEventCount: number;
}

const Graph = ({regionSupporters, totalEventCount}: GraphProps) => {
    const [maxValue, setMaxValue] = useState(0);
    const [graphData, setGraphData] = useState(regionSupporters);

    useEffect(() => {
        const data: number[] = [];
        /* maxValue Setting */
        regionSupporters.forEach((v) => data.push(v.count));
        setMaxValue(Math.max(...data));

        /* percentData setting */
        const percentData = data.map(value => (value / maxValue) * 100);
        regionSupporters.forEach((data: RegionCountInterface, idx: number ) => {
            data.percent = percentData[idx];
        });

        /* graphData setting */
        setGraphData(regionSupporters);
    }, [regionSupporters]);

    return (
        <>
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Regions by Count</h2>
            <div className="grid grid-cols-1 gap-4">
                {graphData.map((data: RegionCountInterface, index) => (
                    <div key={index} className="flex items-center">
                        <div className="w-20 mr-10 text-gray-600">{data.region}</div>
                        <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#0016A6] rounded-full"
                                style={{ width: `${data.percent}%`, borderRadius: `${data.percent === 100 ? 'full' : 'rounded'}` }}
                            ></div>
                        </div>
                        <div className="w-20 ml-4 font-bold">{data.count}</div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Graph;
