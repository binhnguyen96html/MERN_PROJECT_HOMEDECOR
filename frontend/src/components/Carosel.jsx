import Spinner from "./Spinner";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Alert from "./Alert";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import SwiperCore from "swiper";

const Carosel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <Alert color="red" content={error} />
  ) : (
    <Swiper
      slidesPerView={1}
      navigation
      pagination={{ type: "progressbar" }}
      effect="fade"
      modules={[EffectFade]}
      autoplay={{ delay: 3000 }}
      className="relative"
    >
      {products.map((product) => (
        <SwiperSlide key={product._id} className="bg-orange-900">
          <div
            className="h-96 w-1/2 overflow-hidden"
            style={{
              background: `url(${product.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div 
          className="absolute bottom-0 left-0 right-0 h-24 pt-3
          bg-black text-white text-5xl text-center opacity-50">
            {`${product.name} ($${product.price})`}
        </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carosel;
