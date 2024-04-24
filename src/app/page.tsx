'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import Graph from "../components/Graph";
import {Region} from "../enums/Region.enum";
import TopRegions from '../components/TopRegion';

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
    <header className="bg-[#3346BD] text-white py-3 px-6">
      <div className="container mx-0 px-0">
        <Link href="/">
          <h1 className=":hover cursor-pointer text-xl font-bold">{TITLE}</h1>
        </Link>
      </div>
    </header>
    <main className="flex-1 bg-gray-100 py-8">
      <div className="container mx-auto">
        <div>
          <TopRegions countData={countData} />
        </div>
        <Graph regionSupporters={countData.regionSupporters} totalEventCount={countData.totalEventCount} />
      </div>
    </main>
    <footer className="bg-[#3346BD] text-white py-3">
      <div className="container mx-auto text-center">
        <p>© 2024 EPAS. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

}


