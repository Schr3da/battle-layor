const REST_PREFIX = "rest";

export interface IRestData<T> {
    status: number;
    data: T;
}

const post = <T, K>(url: string, data: T): Promise<K | null> => {
    const config: any = {
        method: "POST",
        mode: "cors", 
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
    }; 
    
    return fetch(url, config)
        .then(response => response.json())
        .then((data) => {
            if(data.status < 200 || data.status >= 300) {
                return null;
            }
            return data;
        });
}

export const getHost = (): string => window.location.host;

export const getOrigin = (): string => window.location.origin;

export const isJson = (data: string): boolean => {
    try {
        JSON.parse(data);
        return true;
    } catch {
        return false;
    }
}

export const registerNewPlayer = async (name: string | null) => {
    const host = getOrigin();
    const data = await post<{name: string | null}, IRestData<{id: string}>>
        (host + "/" + REST_PREFIX +"/player/register/", { name });
    return data;        
}

export const unregisterPlayer = async (id: string | null) => {
    const host = getOrigin();
    return await post<{id: string | null}, IRestData<null>>
        (host + "/" + REST_PREFIX +"/player/unregister/", { id });
}
