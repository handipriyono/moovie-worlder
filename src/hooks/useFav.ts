import movieStore from "@/stores/movies";
import { useShallow } from "zustand/react/shallow";

export default function useFav() {
  const { movies, setMovie, removeMovie } = movieStore(
    useShallow((state) => ({
      movies: state.movies,
      setMovie: state.setMovie,
      removeMovie: state.removeMovie,
    }))
  );

  return {
    removeMovie,
    setMovie,
    rawMovie: movies,
    movies: Object.values(movies),
  };
}
