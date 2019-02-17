const REST_PREFIX = "rest";

export interface IRestData<T> {
    status: number;
    data: T;
}

const post = <T, K>(url: string, data: T): Promise<K> => {
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
    
    return fetch(url, config).then(response => response.json());
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

export const registerNewPlayer = async (name: string) => {
    const host = getOrigin();
    return await post<{name: string}, IRestData<{id: string}>>
        (host + "/" + REST_PREFIX +"/player/register/", { name });
}

export const unregisterPlayer = async (id: string | null) => {
    if (id == null) {
        return;
    }

    const host = getOrigin();
    return await post<{id: string}, IRestData<null>>
        (host + "/" + REST_PREFIX +"/player/unregister/", { id });
}



