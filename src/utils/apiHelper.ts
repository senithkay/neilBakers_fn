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

export const sendGet = async (endpoint:string, params: Params[]): Promise<void> => {
    const paramsString = getPrams(params)
    alert(`${BASE_URL}${endpoint}${paramsString}`)
    fetch(`${BASE_URL}${endpoint}${paramsString}`, {credentials: 'include'})
        .then((result) => {
            return result.json();
        })
}