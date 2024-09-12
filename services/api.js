import { useMyAxios } from "~/composables/useMyAxios";
import { objectToQueryString } from "~/utils";

export const getProducts = async (query) => {
  try {
    const { data } = await useMyAxios().get(
      `/products?${objectToQueryString(query)}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
