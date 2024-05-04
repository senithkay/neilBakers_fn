import {history} from "./common.ts";

const BASE_URL = "http://localhost:3000";

interface Params {
    key: string;
    value: string | number | undefined;
}

const getPrams = (params: Params[]) => {
    let paramString = ''
    params.forEach((param)=>{
        paramString = paramString + '/' +param.value
    })
    return paramString;
}

export const sendGET = async (endpoint: string, params: Params[]) => {
    const paramsString = getPrams(params);
    try {
        const response = await fetch(`${BASE_URL}${endpoint}${paramsString}`, { credentials: 'include' });
        if (response.status === 401) {
            history.navigate('/signin')
            return {
                data : []
            };
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const sendPOST = async (endpoint: string, payload: any) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        });
        if (response.status === 401) {
            history.navigate('/signin')
            return [];
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const sendPOSTFORMDATA = async (endpoint: string, payload: any) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            body: payload,
            credentials :'include'
        });
        if (response.status === 401) {
            history.navigate('/signin')
            return [];
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export const sendDELETE = async (endpoint: string, params: Params[]) => {
    const paramsString = getPrams(params);
    try {
        const response = await fetch(`${BASE_URL}${endpoint}${paramsString}`, { credentials: 'include', method :'DELETE' });
        if (response.status === 401) {
            history.navigate('/signin')
            return [];
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};