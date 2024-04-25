'use client'
import styles from "./page.module.css";
import Chart from "react-apexcharts";
import React, {useEffect, useState} from 'react';
import Map from './components/map';


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
      <div className={styles.mapInnerBox}>
          <div className={styles.titleBox}>
            <h3>지도</h3>
          </div>
        </div>
        <div className={styles.mapBox}>
            <Map />
        </div>
    </main>
    <footer className="bg-[#3346BD] text-white py-3">
      <div className="container mx-auto text-center">
        <p>© 2024 EPAS. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

// //             <div className={styles.highBox}>
// //               <div className={styles.highInnerBox}>
// //                 <div className={styles.titleBox}>
// //                   <h3>2024년 상위 3개 월</h3>
// //                 </div>
// //                 <div className={styles.podiumBox}>
// //                   <div className={styles.podiumContainer}>
// //                     <div className={styles.podiumTarget}>{top3Data.options.xaxis.categories[1]}</div>
// //                     <div className={`${styles.podium} ${styles.podium2}`}>
// //                       <span>2</span>
// //                     </div>
// //                   </div>

// //                   <div className={styles.podiumContainer}>
// //                     <div className={styles.podiumTarget}>{top3Data.options.xaxis.categories[0]}</div>
// //                     <div className={`${styles.podium} ${styles.podium1}`}>
// //                       <span>1</span>
// //                     </div>
// //                   </div>

// //                   <div className={styles.podiumContainer}>
// //                     <div className={styles.podiumTarget}>{top3Data.options.xaxis.categories[2]}</div>
// //                     <div className={`${styles.podium} ${styles.podium3}`}>
// //                       <span>3</span>
// //                     </div>
// //                   </div>
// //                   {/*<Chart*/}
// //                   {/*    options={top3Data.options}*/}
// //                   {/*    series={top3Data.series}*/}
// //                   {/*    type="bar"*/}
// //                   {/*    height="100%"*/}
// //                   {/*    width="100%"*/}
// //                   {/*/>*/}
// //                 </div>
// //               </div>
// //             </div>

// //         <div className={styles.contour} />
// //         <div className={styles.monthBox}>
// //           <div className={styles.monthInnerBox}>
// //             <div className={styles.titleBox}>
// //               <h3>2024년 월별</h3>
// //             </div>
// //             <div className={styles.charBox}>
// //               <Chart
// //                   options={viewData.options}
// //                   series={viewData.series}
// //                   type="bar"
// //                   height="100%"
// //                   width="100%"
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       <div className={styles.contour} />
// //         <div className={styles.mapInnerBox}>
// //           <div className={styles.titleBox}>
// //             <h3>지도</h3>
// //           </div>
// //         </div>
// //         <div className={styles.mapBox}>
// //             <Map />
// //         </div>

// //       </main>
  );
}


