import { useMyAxios } from "~/composables/useMyAxios";

export const getProducts = async ({ fts, limit, offset }) => {
  try {
    const { data } = await useMyAxios().get(
      `/products?fts=${fts}&limit=${limit}&offset=${offset}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
