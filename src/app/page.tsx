'use client'
import React, { useEffect, useState, useRef } from 'react';
import styles from "./page.module.css";
import Link from 'next/link';
import Graph from "../components/Graph";
import Map from '../components/Map';
import TopRegions from '../components/TopRegion';
import { Region } from "../enums/Region.enum";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export interface RegionCountInterface {
  region: Region;
  count: number;
  percent: number;
}

export interface CountResultInterface {
  regionSupporters: RegionCountInterface[];
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
  const currentMonth: number = currentDate.getMonth() + 1;

  const [countData, setCountData] = useState(initCountData);
  const swiperRef = useRef<any>(null);

  const requestURL = `https://ajou-epas.xyz:7001/api/supporter/count?year=${currentYear}&month=${currentMonth}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(requestURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setCountData(jsonData.data);
        if (swiperRef.current?.swiper) {
          swiperRef.current.swiper.updatePagination();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentYear, currentMonth]);

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
          <Swiper
            autoHeight={true}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
                clickable: true,
            }}
            modules={[Navigation, Pagination]}
            ref={swiperRef}
          >
            <SwiperSlide>
              <TopRegions countData={countData} />
              <Graph regionSupporters={countData.regionSupporters} totalEventCount={countData.totalEventCount} />
            </SwiperSlide>
            <SwiperSlide>
              <div className="mt-[32px]">
                <div className="bg-white rounded-lg shadow-md p-6 mb-12">
                    <h2 className="text-2xl font-bold mb-4 text-black">🗺 Top 3 Supporters</h2>
                    <div className="flex justify-center" style={{ alignItems: "end" }}>
                      <Map regionSupporters={countData.regionSupporters} totalEventCount={countData.totalEventCount}/>
                    </div>
                  </div>
                </div>
            </SwiperSlide>
            </Swiper>
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
