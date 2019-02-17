const REST_PREFIX = "rest";

const post = <T>(url: string, data: T) => {
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

export const RegisterNewPlayer = async (name: string) => {
    const host = getOrigin();
    await post(host + "/" + REST_PREFIX +"/player/register/", { name });
}
