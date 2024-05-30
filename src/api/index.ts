import { axiosAPI } from "@/lib/utils";
const REACT_APP_API_KEY = import.meta.env.VITE_APP_API_KEY;

export const getSearchMovies = async (query: string) => {
  try {
    const data = await axiosAPI.get("search/multi?language=en-US", {
      params: { query, api_key: REACT_APP_API_KEY },
    });

    return data?.data?.results || [];
  } catch (error) {
    //
  }
};

export const getGenre = async () => {
  try {
    const data = await axiosAPI.get("genre/movie/list?language=en-US", {
      params: { api_key: REACT_APP_API_KEY },
    });

    return data?.data?.genres || [];
  } catch (error) {
    //
  }
};
