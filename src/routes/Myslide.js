import React, { useEffect, useState } from "react";
// Swiper React 컴포넌트 임포트
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// 필요하다면 Swiper 스타일 임포트
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore from "swiper";
import axios from "axios";
import PostingBox from "../components/js/posting/postingBox";
SwiperCore.use([Pagination, Navigation]);

const MySwiperComponent = () => {
  const API = process.env.REACT_APP_API_KEY;
  const token = sessionStorage.getItem("accessToken");
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/api/v1/post`, {
        params: 0,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPost(res.data.posts);
        console.log(res.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(post[0]);
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      slidesPerView={3}
      Navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div style={{ marginLeft: "8vw" }}>
          <PostingBox param={post[0]} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div style={{ marginLeft: "8vw" }}>
          <PostingBox param={post[1]} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div style={{ marginLeft: "8vw" }}>
          <PostingBox param={post[2]} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div style={{ marginLeft: "8vw" }}>
          <PostingBox param={post[3]} />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default MySwiperComponent;
