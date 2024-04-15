'use client'
import styles from "./page.module.css";
import Chart from "react-apexcharts";
import React, { useEffect, useState } from 'react'


const props =  {
  options: {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const TITLE = 'EPAS';

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
      <main className={styles.main}>
        <div className={styles.header}>
          <h2>{TITLE}</h2>
        </div>

        {isClient && (
            <div className={styles.highBox}>
              <div className={styles.highInnerBox}>
                <div>
                  <h3>4월 상위 3개 지역</h3>
                </div>
                <div className={styles.charBox}>
                  <Chart
                      options={props.options}
                      series={props.series}
                      type="bar"
                      height="100%"
                      width="100%"
                  />
                </div>
              </div>
            </div>
        )}

        <div className={styles.monthBox}>
          <div className={styles.monthInnerBox}>
            <div>
              <h3>4월 지역별 배려 차량 수</h3>
            </div>
            <div className={styles.charBox}>
              <Chart
                  options={props.options}
                  series={props.series}
                  type="bar"
                  height="100%"
                  width="100%"
              />
            </div>
          </div>
        </div>
      </main>
  );
}
