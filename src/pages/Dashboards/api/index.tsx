import { axiosAPI } from "@/lib/utils";
const REACT_APP_API_KEY = import.meta.env.VITE_APP_API_KEY;

export const getPopularMovies = async () => {
  try {
    const data = await axiosAPI.get("/movie/popular?language=en-US", {
      params: {
        api_key: REACT_APP_API_KEY,
      },
    });

    return data?.data?.results || [];
  } catch (error) {
    return [];
  }
};

export const getNowPlaying = async () => {
  try {
    const data = await axiosAPI.get("/movie/now_playing?language=en-US", {
      params: {
        api_key: REACT_APP_API_KEY,
      },
    });

    return data?.data?.results || [];
  } catch (error) {
    return [];
  }
};

export const getUpcomingMovies = async () => {
  try {
    const data = await axiosAPI.get("/movie/upcoming?language=en-US", {
      params: {
        api_key: REACT_APP_API_KEY,
      },
    });

    return data?.data?.results || [];
  } catch (error) {
    return [];
  }
};

export const getTopRatedMovies = async () => {
  try {
    const data = await axiosAPI.get("/movie/top_rated?language=en-US", {
      params: {
        api_key: REACT_APP_API_KEY,
      },
    });

    return data?.data?.results || [];
  } catch (error) {
    return [];
  }
};
