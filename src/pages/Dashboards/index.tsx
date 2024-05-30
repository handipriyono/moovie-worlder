import Navigation from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Info, Play } from "lucide-react";
import useGetMovies from "./hooks/useGetMovies";
import SlidderWrapper from "@/components/SlidderWrapper";
import MovieItem from "@/components/MovieItem";
import movieStore from "@/stores/movies";
import { useShallow } from "zustand/react/shallow";
import { TMovieItem } from "@/types";
import { getGenre } from "@/lib/utils";
import "./style.css";

export default function Dashboards() {
  const { movies, setMovie, removeMovie } = movieStore(
    useShallow((state) => ({
      movies: state.movies,
      setMovie: state.setMovie,
      removeMovie: state.removeMovie,
    }))
  );

  const {
    popularMovies,
    search,
    onHandleSearch,
    nowPlayingMovies,
    upcomingMovies,
    topRatedMovies,
    moviesSearch,
    genres,
  } = useGetMovies();

  return (
    <div className="bg-[#141414] min-h-screen">
      <div className="top-0 left-0 w-full">
        <Navigation search={search} onHandleSearch={onHandleSearch} />
      </div>

      {search ? (
        <div className="bg-[#141414]">
          <div className="text-white text-center text-2xl pt-5">
            {`Search for: ${search}`}{" "}
          </div>
          <div className=" flex min-h-[400px] pt-[85px] bg-[#141414]">
            <div className="pt-2 bg-transparent grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-1 gap-y-2 w-full text-white px-3 md:px-16 bg-[#141414]">
              {moviesSearch?.map((item: TMovieItem) => (
                <>
                  <MovieItem
                    item={item}
                    movies={movies}
                    setMovie={setMovie}
                    genreText={getGenre(item?.genre_ids, genres)}
                    removeMovie={removeMovie}
                    isFavePage
                  />
                </>
              ))}
            </div>
          </div>
          <div className="shadow-banner text-white" />
        </div>
      ) : (
        <>
          <div>
            <div className=" flex bg-cover bg-blend-difference bg-[#141414] bg-center min-h-[400px] h-[calc(100vh-200px)] bg-[url('https://image.tmdb.org/t/p/original//gD830J0sf5gEeZvzkRVPdGxJmSR.jpg')]">
              <div className="bg-transparent flex w-full text-white items-center px-3 md:px-16">
                <div className="flex flex-col">
                  <div className="flex flex-col max-w-[550px] gap-y-6">
                    <h2 className="white font-bold text-3xl">
                      ATYPICAL FAMILY
                    </h2>
                    <div>
                      Once blessed with unique superpowers, a family loses their
                      abilities due to modern day problems - until a mysterious
                      woman changes everything
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-x-5 mt-5 gap-y-3 md:gap-y-2">
                    <Button className="h-10 w-32   bg-red-600 text-white text-xl flex flex-row gap-x-2 hover:bg-red-600/60">
                      <Play fill="#fff" color="white" />
                      Play
                    </Button>
                    <Button className="h-10 w-40 bg-[#4f4f51] text-white text-xl gap-x-3 hover:bg-[#3a3a3c]">
                      <Info />
                      More Info
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-banner text-white" />
          </div>

          <div className="bg-[#141414] h-auto overflow-hidden pb-10">
            <SlidderWrapper
              genres={genres}
              title="Popular Movies"
              data={popularMovies}
            />
            <SlidderWrapper
              genres={genres}
              title="Now Playing"
              data={nowPlayingMovies}
            />
            <SlidderWrapper
              genres={genres}
              title="Upcoming Movies"
              data={upcomingMovies}
            />
            <SlidderWrapper
              genres={genres}
              title="Top Rated Movies"
              data={topRatedMovies}
            />
          </div>
        </>
      )}
    </div>
  );
}
