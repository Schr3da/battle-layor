import { IRestData, post, getOrigin } from "../shared/utils/NetworkUtils" 

const REST_PREFIX = "rest";

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
