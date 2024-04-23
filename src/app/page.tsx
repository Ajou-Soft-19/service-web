'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import Graph from "../components/Graph";
import {Region} from "../enums/Region.enum";

export interface RegionCountInterface {
  region: Region;
  count: number;
  percent: number;
}
export interface CountResultInterface {
  regionSupporters : RegionCountInterface[];
  totalEventCount: number;
}

const initCountData: CountResultInterface = {
  "regionSupporters": [
    {
      "region": Region.UNKNOWN,
      "count": 0,
      "percent": 0
    },
    {
      "region": Region.UNKNOWN,
      "count": 0,
      "percent": 0
    },
    {
      "region": Region.UNKNOWN,
      "count": 0,
      "percent": 0
    },
  ],
  "totalEventCount": 0
}


export default function Home() {
  const TITLE = 'EPAS';
  const currentDate: Date = new Date();
  const currentYear: number = currentDate.getFullYear();
  const currentMonth: number = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 해줍니다.

  const [countData, setCountData] = useState(initCountData);

  const requestURL = `https://ajou-epas.xyz:7001/api/supporter/count?year=${currentYear}&month=${currentMonth}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(requestURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        // console.log(jsonData)
        setCountData(jsonData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  useEffect(() => {

  },[countData]);

  return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-[#0016A6] text-white py-4 px-6">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/">
              <h1 className=":hover cursor-pointer text-2xl font-bold">{TITLE}</h1>
            </Link>
          </div>
        </header>
        <main className="flex-1 bg-gray-100 py-8">
          <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Top 3 Regions</h2>
              <div className="flex justify-center"
                style={{
                  alignItems: "end"
                }}>

                <div className="w-20 md:w-32 flex flex-col items-center">
                  {/*<div className="bg-[#0016A6] text-white font-bold py-2 px-4 rounded-t-lg">2nd</div>*/}
                  <span className={"font-bold text-blue-800 md:text-xl text-xs mb-2"}>{countData.regionSupporters[1].region}</span>
                  <div className="w-20 h-[80px] md:w-32 md:h-[200px] bg-[#0016A6] rounded-t-lg relative">
                    {/*<div className="absolute bottom-0 w-full h-4/5 bg-[#0016A6]" />*/}
                  </div>
                  <div className="w-18  mt-2 text-center md:w-28 bg-[#0016A6] text-white font-bold py-2 px-4 rounded-lg">2nd</div>

                  {/*<span className={"font-bold text-blue-800 text-xl"}>ew</span>*/}
                </div>

                <div className="w-20 md:w-32 flex flex-col items-center">
                  {/*<div className="bg-[#0016A6] text-white font-bold py-2 px-4 rounded-t-lg">1st</div>*/}
                  <span className={"font-bold text-blue-800 md:text-xl text-xs mb-2"}>{countData.regionSupporters[0].region}</span>
                  <div className="w-20 h-[100px] md:w-32 md:h-[300px] bg-[#0016A6] rounded-t-lg relative">
                    {/*<div className="absolute bottom-0 w-full h-full bg-[#0016A6]" />*/}
                  </div>
                  <div className="w-18  mt-2 text-center md:w-28 bg-[#0016A6] text-white font-bold py-2 px-4 rounded-lg">1st</div>

                  {/*<span className={"font-bold text-blue-800 text-xl"}>ew</span>*/}
                </div>

                <div className="w-20 md:w-32 flex flex-col items-center">
                  {/*<div className="bg-[#0016A6] text-white font-bold py-2 px-4 rounded-t-lg">3rd</div>*/}
                  <span className={"font-bold text-blue-800 md:text-xl text-xs mb-2"}>{countData.regionSupporters[2].region}</span>
                  <div className="w-20 h-[50px] md:w-32 md:h-[150px] bg-[#0016A6] rounded-t-lg relative">
                    {/*<div className="absolute bottom-0 w-full h-3/4 bg-[#0016A6]" />*/}
                  </div>
                  <div className="w-18 mt-2 text-center md:w-28 bg-[#0016A6] text-white font-bold py-2 px-4 rounded-lg">3rd</div>
                  {/*<span className={"font-bold text-blue-800 text-xl"}>ew</span>*/}
                </div>
              </div>
            </div>
            <Graph regionSupporters={countData.regionSupporters} totalEventCount={countData.totalEventCount} />

          </div>
        </main>
        <footer className="bg-[#0016A6] text-white py-4">
          <div className="container mx-auto text-center">
            <p>© 2023 EPAS. All rights reserved.</p>
          </div>
        </footer>
      </div>
  );
}


