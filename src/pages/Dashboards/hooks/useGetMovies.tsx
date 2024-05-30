import {
  getPopularMovies,
  getNowPlaying,
  getUpcomingMovies,
  getTopRatedMovies,
} from "../api/index";
import { useQuery } from "@tanstack/react-query";
import useSearch from "@/hooks/useSearch";

export default function useGetMovies() {
  const { moviesSearch, search, onHandleSearch, genres } = useSearch();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["list-popular-movies"],
    queryFn: getPopularMovies,
  });
  const { data: nowPlaying, isLoading: isLoadingNowPlaying } = useQuery({
    queryKey: ["list-now-playing-movies"],
    queryFn: getNowPlaying,
  });

  const { data: upcomingMovies } = useQuery({
    queryKey: ["list-upcoming-movies"],
    queryFn: getUpcomingMovies,
  });

  const { data: topRatedMovies } = useQuery({
    queryKey: ["list-top-rated-movies"],
    queryFn: getTopRatedMovies,
  });

  return {
    popularMovies: data,
    isLoadingPopularMovies: isLoading || isFetching,
    nowPlayingMovies: nowPlaying,
    upcomingMovies,
    topRatedMovies,
    isLoadingNowPlaying,
    search,
    onHandleSearch,
    moviesSearch,
    genres,
  };
}
