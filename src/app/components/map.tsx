'use client'

import React, { useEffect, useState, useRef } from 'react';
import {Loader} from '@googlemaps/js-api-loader';

function Map() {
    const mapRef = useRef(null);
    const [cities, setCities] = useState<any[]>([]);

    useEffect(() => {
        fetch('./city.json')
            .then((res) => res.json())
            .then((data) => {
                const cityData = data.features.map((feature: { geometry: { coordinates: [number, number][][]; }; properties: { CTP_ENG_NM: any; CTP_KOR_NM: any; }; }) => ({
                    coordinates: feature.geometry.coordinates[0].map(([lng, lat] : [number, number]) => ({ lat, lng })),
                    engName: feature.properties.CTP_ENG_NM,
                    korName: feature.properties.CTP_KOR_NM,
                }));
                setCities(cityData as any);
            });
    }, []);

    useEffect(() => {
        if (cities.length > 0) {
            initMap();
        }
    }, [cities]); // cities 상태가 변경될 때마다 initMap 함수 실행

    const initMap = async () => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
            version: "weekly"
        });

        const google = await loader.load();

        const position = { lat: 36.674108, lng: 127.961290 };
        const mapOptions = {
            center: position,
            zoom: 7,
            mapId: 'MY_NEXTJS_MAPID'
        };

        const map = new google.maps.Map(mapRef.current as unknown as HTMLDivElement, mapOptions);
        
        cities.forEach((city) => {
            new google.maps.Polygon({
                paths: city.coordinates,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map: map, // map 객체에 직접 설정
            });

            console.log(city.engName, city.korName);
        });
    };
    
    return (
        <div style={{ height: '80vh', width: '100%' }} ref={mapRef} />
    );
}

export default Map;

