'use client'
import styles from "./page.module.css";
import Chart from "react-apexcharts";
import React, {useEffect, useState} from 'react'

export interface BarChartProps {
  options: {
    chart: {
      id: string;
    },
    xaxis: {
      categories: number[];
      // tickPlacement: 'on';
    },
    // title: string;
    noData: {
      text: string;
    }
  },
  series: [
    {
      name: string;
      data: number[];
    }
  ],
  plotOptions: {
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '42px';
        colors: ['#333'];
      },
      offsetX: 30;
    },
  },
}
interface dataProps {
  "year": number,
  "month": number,
  "count": number
}

const data: BarChartProps =  {
  options: {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [],
      // tickPlacement: 'on',
    },
    noData: {
      text: 'Loading...'
    }
    // title: ''
  },
  series: [
    {
      name: "series-1",
      data: []
    }
  ],
  plotOptions: {
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '42px',
        colors: ['#333']
      },
      offsetX: 30
    },
  },
};

const serverData: dataProps[] = [
  {
    "year": 2024,
    "month": 1,
    "count": 35,
  },
  {
    "year": 2024,
    "month": 2,
    "count": 325,
  },
  {
    "year": 2024,
    "month": 3,
    "count": 125,
  },
  {
    "year": 2024,
    "month": 4,
    "count": 523,
  },
]

export default function Home() {
  const TITLE = 'EPAS';
  const [top3Data, setTop3Data] = useState(data);
  const [viewData, setViewData] = useState(data);

  useEffect(() => {
    /* API Request */
    let datas: number[][] = [];
    serverData.map((d) => {
      datas.push([d.month, d.count]);
    });

    let categories: number[] = [];
    let series_data: number[] = [];

    datas.forEach((d) => {
      categories.push(d[0]);
      series_data.push(d[1]);
    })

    data.options.xaxis.categories = categories;
    data.series[0].data = series_data;
    setViewData(data);

    datas.sort((a, b) => {
      return b[1] - a[1];
    });

    const datas2: number[][] = datas.slice(0, 3);

    const temp = datas2[0];
    datas2[0] = datas2[1];
    datas2[1] = temp;

    categories = [];
    series_data = [];

    datas2.forEach((d) => {
      categories.push(d[0]);
      series_data.push(d[1]);
    })

    const data2 = JSON.parse(JSON.stringify(data));

    data2.options.xaxis.categories = categories;
    data2.series[0].data = series_data
    setTop3Data(data2);
    }, [])

  return (
      <main className={styles.main}>
        <div className={styles.header}>
          <h2>{TITLE}</h2>
        </div>

            <div className={styles.highBox}>
              <div className={styles.highInnerBox}>
                <div className={styles.titleBox}>
                  <h3>2024년 상위 3개 월</h3>
                </div>
                <div className={styles.podiumBox}>
                  <div className={styles.podiumContainer}>
                    <div className={styles.podiumTarget}>{top3Data.options.xaxis.categories[1]}</div>
                    <div className={`${styles.podium} ${styles.podium2}`}>
                      <span>2</span>
                    </div>
                  </div>

                  <div className={styles.podiumContainer}>
                    <div className={styles.podiumTarget}>{top3Data.options.xaxis.categories[0]}</div>
                    <div className={`${styles.podium} ${styles.podium1}`}>
                      <span>1</span>
                    </div>
                  </div>

                  <div className={styles.podiumContainer}>
                    <div className={styles.podiumTarget}>{top3Data.options.xaxis.categories[2]}</div>
                    <div className={`${styles.podium} ${styles.podium3}`}>
                      <span>3</span>
                    </div>
                  </div>
                  {/*<Chart*/}
                  {/*    options={top3Data.options}*/}
                  {/*    series={top3Data.series}*/}
                  {/*    type="bar"*/}
                  {/*    height="100%"*/}
                  {/*    width="100%"*/}
                  {/*/>*/}
                </div>
              </div>
            </div>

        <div className={styles.contour} />
        <div className={styles.monthBox}>
          <div className={styles.monthInnerBox}>
            <div className={styles.titleBox}>
              <h3>2024년 월별</h3>
            </div>
            <div className={styles.charBox}>
              <Chart
                  options={viewData.options}
                  series={viewData.series}
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
