import React, {useEffect, useState} from 'react';
import {RegionCountInterface} from "../app/page";

export interface GraphProps {
    regionSupporters : RegionCountInterface[];
    totalEventCount: number;
}

const Graph = ({regionSupporters, totalEventCount}: GraphProps) => {
    const [maxValue, setMaxValue] = useState(0);
    const [graphData, setGraphData] = useState(regionSupporters);

    const rankColorStyles: { [key: string]: string } = {
        '1st': 'from-yellow-400 to-yellow-300',
        '2nd': 'from-gray-300 to-gray-200',
        '3rd': 'from-orange-400 to-orange-300'
    };

    useEffect(() => {
    const data: number[] = [];
    regionSupporters.forEach((v) => data.push(v.count));
        const newMaxValue = Math.max(...data, 1); // 최소값을 1로 설정하여 0으로 나누는 것을 방지
        setMaxValue(newMaxValue);
    }, [regionSupporters]);

    useEffect(() => {
        if (maxValue > 0) { 
            const percentData = regionSupporters.map(value => (value.count / maxValue) * 100);
            const updatedRegionSupporters = regionSupporters.map((data, idx) => ({
                ...data,
                percent: percentData[idx],
            }));
            setGraphData(updatedRegionSupporters);
        }
    }, [maxValue, regionSupporters]);


    return (
        <>
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">👏 Supporters Count</h2>
            <div className="grid grid-cols-1 gap-4">
                {graphData.map((data: RegionCountInterface, index) => (
                    <div key={index} className="flex items-center">
                        <div className="w-20 mr-5 text-gray-600">{data.region}</div>
                        <div className="flex-1 h-8 bg-white-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full shadow ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-300' : index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-200' : index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-300' : 'bg-gradient-to-r from-sky-400 to-sky-300'}`}
                                style={{ width: `${data.percent}%` }}
                            >
                            </div>
                        </div>
                        <div className="w-11 text-right font-bold">{data.count}</div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Graph;
