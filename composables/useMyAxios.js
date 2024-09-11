import axios from "axios";

export const useMyAxios = () => {
  const config = useRuntimeConfig();
  const { api: baseURL } = config.public;
  return axios.create({
    baseURL,
  });
};
