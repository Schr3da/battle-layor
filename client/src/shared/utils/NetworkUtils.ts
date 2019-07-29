export interface IRestData<T> {
  status: number;
  data: T;
}

declare const __FIXED_PORT_9000__;

export const post = <T, K>(url: string, data: T): Promise<K | null> => {
  const config: any = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(url, config)
    .then(response => response.json())
    .then(data => {
      if (data.status < 200 || data.status >= 300) {
        return null;
      }
      return data;
    });
};

export const getHost = (): string =>  {
	if (__FIXED_PORT_9000__) {
		return  window.location.hostname + ":9000";
	}
	return window.location.host;
};

export const getOrigin = (): string => {
	if (__FIXED_PORT_9000__) {
		return "http://" + window.location.hostname + ":9000"; 
	}
	
	return window.location.origin
};

export const isJson = (data: string): boolean => {
  
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};
