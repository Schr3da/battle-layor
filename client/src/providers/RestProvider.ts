import { IRestData, post, getOrigin } from "../shared/utils/NetworkUtils";
import { handleError } from "../actions/UIActions";

const REST_PREFIX = "rest";

export interface IRegisterPlayerDto {
  id: string;
  pseudoID: string;
}

const handleUnexpectedResult = () => {
  // if get store is called here reducers are not properly initialized
  const store = window.store;
  if (store == null) {
    return;
  }
  store.dispatch(handleError());
};

export const registerNewPlayer = async (name: string | null) => {
  const host = getOrigin();
  const data = await post<
    { name: string | null },
    IRestData<IRegisterPlayerDto>
  >(host + "/" + REST_PREFIX + "/player/register/", { name });

  if (data == null) {
    handleUnexpectedResult();
  }

  return data;
};

export const unregisterPlayer = async (id: string | null) => {
  const host = getOrigin();
  return await post<{ id: string | null }, IRestData<null>>(
    host + "/" + REST_PREFIX + "/player/unregister/",
    { id }
  );
};
