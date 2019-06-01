import { IRestData, post, getOrigin } from "../shared/utils/NetworkUtils";
import { getStore } from '../stores/Store';
import { handleError } from '../actions/UIActions';

const REST_PREFIX = "rest";

export interface IRegisterPlayerDto {
  id: string;
  pseudoID: string;
}

const handleUnexpectedResult = () => {
	const store = getStore();
	store.dispatch(handleError());
}

export const registerNewPlayer = async (name: string | null) => {
  const host = getOrigin();
  const data = await post<
    { name: string | null },
    IRestData<IRegisterPlayerDto>
  >(host + "/" + REST_PREFIX + "/player/register/", { name });

	if (data == null) {
		handleUnexpectedResult()
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
