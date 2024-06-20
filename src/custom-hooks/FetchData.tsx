// FetchData.tsx

import { useState, useEffect } from 'react';
import { server_calls } from '../api/server';

interface WineData {
    id: string;
    name: string;
    country: string;
    region: string;
    vintage: string;
    taste: string;
    nose: string;
    price: string;
    img: string; // Add image URL field
}

export const useGetData = () => {
    const [wineData, setWineData] = useState<WineData[]>([]);

    async function handleDataFetch() {
        try {
            const result = await server_calls.get();
            const transformedData = result.map((item: any) => ({
                id: item.id,
                name: item.name,
                country: item.country,
                region: item.region,
                vintage: item.vintage,
                taste: item.taste,
                nose: item.nose,
                price: item.price,
                img: item.img, // Ensure img field is correctly mapped from your API response
            }));
            setWineData(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        handleDataFetch();
    }, []);

    return { wineData, getData: handleDataFetch };
};
