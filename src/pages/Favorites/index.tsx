import Navigation from "@/components/Nav";
import MovieItem from "@/components/MovieItem";
import useFav from "@/hooks/useFav";
import useSearch from "@/hooks/useSearch";
import { TMovieItem } from "@/types";
import { getGenre } from "@/lib/utils";

export default function Favorites() {
  const { moviesSearch, search, onHandleSearch, genres } = useSearch();
  const { movies, setMovie, removeMovie, rawMovie } = useFav();

  return (
    <div className="bg-[#141414] min-h-screen">
      <div className="top-0 left-0 w-full fixed">
        <Navigation onHandleSearch={onHandleSearch} search={search} />
      </div>

      <div className="bg-[#141414]">
        <div className=" flex flex-col min-h-[400px] pt-[85px] bg-[#141414]">
          <h2 className="text-white pl-5 text-center text-2xl py-5">
            {search ? `Search for: ${search}` : "Favourites"}
          </h2>
          <div className="pt-2 bg-transparent grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-1 gap-y-2 w-full text-white px-3 md:px-16 bg-[#141414]">
            {(search ? moviesSearch : movies)?.map((item: TMovieItem) => (
              <div key={item?.id}>
                <MovieItem
                  item={item}
                  movies={rawMovie}
                  setMovie={setMovie}
                  removeMovie={removeMovie}
                  genreText={getGenre(item?.genre_ids, genres)}
                  isFavePage
                />
              </div>
            ))}
          </div>
        </div>
        <div className="shadow-banner text-white" />
      </div>

      <div className="bg-[#141414] h-auto overflow-hidden pb-10">--</div>
    </div>
  );
}
