import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { CirclePlus, Play } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { TMovieItem } from "@/types";

const origUrl = "https://image.tmdb.org/t/p/original";

type TMovieItemProps = {
  item: TMovieItem;
  movies: Record<number | string, TMovieItem>;
  setMovie: (movieId: number | string, movieData: TMovieItem) => void;
  removeMovie: (movieId: number | string) => void;
  isFavePage?: boolean;
};

function MovieItem({
  item,
  movies,
  setMovie,
  removeMovie,
  isFavePage,
}: TMovieItemProps) {
  const onFaved = (id: string | number, data: TMovieItem) => {
    try {
      if (movies?.[id]) {
        if (isFavePage) {
          document?.getElementById("closeDialog")?.click();
        }
        removeMovie(id);
      } else {
        setMovie(id, data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getReleaseDate = (it = "") => {
    return it?.split("-")?.[0];
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          key={item?.id}
          className="group bg-[#1f1f1f] relative transition-transform hover:opacity-60 hover:border hover:border-gray-200 duration-300 hover:scale-105 hover:z-2 flex h-[151px] bg-no-repeat bg-cover bg-center rounded-xl overflow-hidden mx-1 cursor-pointer"
          style={{
            zIndex: 1,
            backgroundImage: `url(${origUrl}${item?.poster_path})`,
          }}
        >
          <div className="hidden group-hover:flex flex-col px-2 absolute bottom-1 left-1 text-white pb-3 z-50">
            <h1 className="text-sm font-semibold hover:opacity-100 group-hover:bg-black group-hover:text-white group-hover:p-2 group-hover:opacity-100 group-hover:transition-transform">
              {item?.original_title}
            </h1>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="min-h-[300px] h-[calc(100vh-200px)] md:w-[650px] px-0 mx-0 bg-[#141414] border-0 overflow-auto">
        <DialogHeader>
          <DialogDescription>
            <div
              style={{
                backgroundImage: `url(${origUrl}${item?.poster_path})`,
              }}
              className={`mt-[-20px] h-[300px] flex bg-cover bg-blend-difference bg-[#141414] bg-center `}
            />

            <div className="shadow-banner text-white" />
            <div className="mt-[-50px] pb-20 px-7">
              <div className="flex md:flex-row gap-y-2 md:gap-y-1">
                <Button className="h-10 w-32 bg-red-600 text-white text-lg flex flex-row gap-x-2 hover:bg-red-600/60">
                  <Play fill="#fff" size={18} />
                  Play
                </Button>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button className=" text-white text-xl gap-x-3 bg-transparent hover:bg-transparent">
                      <CirclePlus
                        id="fav"
                        className=""
                        size={35}
                        fill={movies[item?.id] ? "orange" : "transparent"}
                        onClick={() => {
                          if (!movies?.[item?.id]) {
                            const resizableDiv =
                              document?.getElementById("fav");
                            resizableDiv?.classList?.add("animate-bounce");
                            setTimeout(() => {
                              resizableDiv?.classList?.remove("animate-bounce");
                            }, 3200);
                          }
                          onFaved(item?.id, item);
                        }}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white">
                    {movies?.[item?.id]
                      ? "Remove from Favorite list"
                      : "Add to Favorite List"}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="text-white px-5 gap-y-5">
              <p className="text-3xl pb-5 font-bold">{item?.title}</p>
              <div>{item?.overview}</div>
              <Separator className="my-5 bg-gray-400" />
              <span className="flex gap-x-3">
                <p className="text-gray-400">Genres:</p>Crime, Sci-Fi & Fantasy
              </span>
              <span className="flex gap-x-3">
                <p className="text-gray-400">Vote Average:</p>
                {item?.vote_average}
              </span>
              <span className="flex gap-x-3">
                <p className="text-gray-400">Release Date:</p>
                {getReleaseDate(item?.release_date)}
              </span>
              <span className="flex gap-x-3">
                <p className="text-gray-400">Original Language:</p>
                {item?.original_language}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MovieItem;
