'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import {Region} from "../enums/Region.enum";
import styles from './MapContainer.module.css';

interface City {
    coordinates: { lat: number; lng: number }[];
    engName: string;
    korName: string;
    enumName: Region;
}

interface GraphProps {
    regionSupporters: { count: number; region: Region }[];
    totalEventCount: number;
}

const Map = ({regionSupporters, totalEventCount}: GraphProps) => {
    const mapRef = useRef(null);
    const [cities, setCities] = useState<City[]>([]);
    const [isDataReady, setIsDataReady] = useState(false);

    useEffect(() => {
        fetch('./city.json')
            .then((res) => res.json())
            .then((data) => {
                const cityData = data.features.map((feature: { geometry: { coordinates: [any, any][][]; }; properties: { CTP_ENG_NM: any; CTP_KOR_NM: any; }; }) => ({
                    coordinates: feature.geometry.coordinates[0].map(([lng, lat]) => ({ lat, lng })),
                    engName: feature.properties.CTP_ENG_NM,
                    korName: feature.properties.CTP_KOR_NM,
                    enumName: Object.values(Region).find(region => region === feature.properties.CTP_KOR_NM) || Region.UNKNOWN,
                }));
                setCities(cityData);
                setIsDataReady(true);
            });
    }, []);

     useEffect(() => {
        if (isDataReady && regionSupporters.length > 0) {
            initMap();
        }
    }, [isDataReady, regionSupporters]);

    const initMap = async () => {
        console.log(cities);
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
            version: "weekly",
        });

        const google = await loader.load();

        const position = { lat: 36.674108, lng: 127.961290 };
        const mapOptions = {
            center: position,
            zoom: 7.0,
            mapId: 'YOUR_MAP_ID_HERE',
            disableDefaultUI: true,
            zoomControl: false
        };

        const map = new google.maps.Map(mapRef.current, mapOptions);
        const topRegions = regionSupporters.slice(0, 3).map(rs => Region[rs.region as unknown as keyof typeof Region]);
        const colors = ['#FFD700', '#585858', '#CD7F32'];
        console.log(topRegions);

        cities.forEach((city) => {
            const regionIndex = topRegions.indexOf(city.enumName);
            let color;
            let opacity;
            if (regionIndex !== -1) {
                color = colors[regionIndex];
                opacity = 0.77;
            } else {
                color = '#0040FF';
                opacity = 0.1;
            }
            const cityPolygon = new google.maps.Polygon({
                paths: city.coordinates,
                strokeColor: color,
                strokeOpacity: opacity,
                strokeWeight: 4,
                fillColor: color,
                fillOpacity: opacity,
                map: map,
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `<h3>${city.korName}</h3>`,
            });

            // 폴리곤 클릭 이벤트 리스너 추가
            cityPolygon.addListener('click', (event: { latLng: any; }) => {
                infoWindow.setPosition(event.latLng);
                infoWindow.open(map);
            });
        });
    };

    return (
        <div className={styles.container}>
            <div style={{ height: '100%', width: '100%' }} ref={mapRef} />
        </div>
    );

};


export default Map;
