import React from "react";
// Swiper React 컴포넌트 임포트
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// 필요하다면 Swiper 스타일 임포트
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore from "swiper";
SwiperCore.use([Pagination, Navigation]);

const MySwiperComponent = () => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={50}
      slidesPerView={3}
      Navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide style={{ height: "300px", background: "#ccc" }}>
        Slide 1
      </SwiperSlide>
      <SwiperSlide style={{ height: "300px", background: "#ccc" }}>
        Slide 2
      </SwiperSlide>
      <SwiperSlide style={{ height: "300px", background: "#ccc" }}>
        Slide 3
      </SwiperSlide>
      <SwiperSlide style={{ height: "300px", background: "#ccc" }}>
        Slide 4
      </SwiperSlide>{" "}
    </Swiper>
  );
};

export default MySwiperComponent;
