import { useEffect, useState, useCallback } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (endpoint) => {
    const [data, setData] = useState();

    const makeApiCall = useCallback(async () => {
        try {
            const res = await fetchDataFromApi(endpoint);
            setData(res);
        } catch (error) {
            setData(null); 
        }
    }, [endpoint]);

    useEffect(() => {
        makeApiCall();
    }, [makeApiCall]);

    return { data };
};

export default useFetch;
