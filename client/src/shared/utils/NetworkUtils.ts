export interface IRestData<T> {
    status: number;
    data: T;
}

export const post = <T, K>(url: string, data: T): Promise<K | null> => {
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
