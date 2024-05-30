import Slider from "react-slick";
import { useShallow } from "zustand/react/shallow";
import MovieItem from "./MovieItem";
import movieStore from "@/stores/movies";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TMovieItem } from "@/types";

type TArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

function NextArrow(props: TArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "transparent",
        width: "100px",
        paddingRight: 30,
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props: TArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "transparent",
        paddingLeft: 30,
        width: "100px",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

function SlidderWrapper({ title, data }: { title: string; data: any }) {
  const { movies, setMovie, removeMovie } = movieStore(
    useShallow((state) => ({
      movies: state.movies,
      setMovie: state.setMovie,
      removeMovie: state.removeMovie,
    }))
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    useCSS: true,
    arrow: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
    ],
  };
  return (
    <div style={{ zIndex: 1 }} className="slider-container ml-1 md:ml-10 mb-10">
      <h1 className="text-white text-xl font-semibold pr-5 py-3">{title}</h1>
      <Slider {...settings}>
        {data?.map((item: TMovieItem) => (
          <div key={item?.id}>
            <MovieItem
              item={item}
              movies={movies}
              setMovie={setMovie}
              removeMovie={removeMovie}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlidderWrapper;
