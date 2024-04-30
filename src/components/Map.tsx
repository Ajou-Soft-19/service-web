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
        console.log(regionSupporters);
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
            version: "weekly",
        });

        const google = await loader.load();

        const position = { lat: 36.674108, lng: 127.961290 };
        const mapOptions = {
            center: position,
            zoom: 6.6,
            mapId: 'YOUR_MAP_ID_HERE',
            disableDefaultUI: true,
            zoomControl: false
        };

        const map = new google.maps.Map(mapRef.current!, mapOptions);
        const regionsList = regionSupporters.map(rs => Region[rs.region as unknown as keyof typeof Region]);
        const colors = ['#FFD700', '#585858', '#CD7F32'];
        const opacities = [0.8, 0.9, 0.9];
        console.log(regionsList);

        cities.forEach((city) => {
            const regionIndex = regionsList.indexOf(city.enumName);
            let color;
            let opacity;
            if (regionIndex !== -1 && regionIndex < 3) {
                color = colors[regionIndex];
                opacity = opacities[regionIndex];
            } else if(regionIndex !== -1 && regionIndex >= 3 && regionIndex < 6) {
                color = '#0040FF';
                opacity = 0.7;
            }
            else {
                color = '#1CA4B7';
                opacity = 0.3;
            }

            const cityPolygon = new google.maps.Polygon({
                paths: city.coordinates,
                strokeColor: color,
                strokeOpacity: 0.5,
                strokeWeight: 3,
                fillColor: color,
                fillOpacity: opacity,
                map: map,
            });
            let supporterCount = 0;
            if(regionIndex !== -1) {
                supporterCount = regionSupporters[regionIndex].count ?? 0;
            }
            const infoWindow = new google.maps.InfoWindow({
                content: `<div style="color: #333; font-family: 'Arial', sans-serif; padding: 10px;">
                            <h3 style="color: #007BFF; margin-top: 0; font-size: 20px;">${city.engName}</h3>
                            <p style="font-size: 16px; margin-bottom: 0;">Supporters: <span style="font-weight: bold;">${supporterCount}</span></p>
                          </div>`,
            });
            

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
