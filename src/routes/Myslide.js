import React, { useEffect, useState, useRef } from 'react';
// Swiper React 컴포넌트 임포트
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
// 필요하다면 Swiper 스타일 임포트
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import SwiperCore from 'swiper';
import axios from 'axios';
import PostingBox from '../components/js/posting/postingBox';
SwiperCore.use([Pagination, Navigation, Autoplay]);

const MySwiperComponent = () => {
  const API = process.env.REACT_APP_API_KEY;
  const token = sessionStorage.getItem('accessToken');
  const [post, setPost] = useState([]);
  const swiperRef = useRef(null);

  console.log(API);

  useEffect(() => {
    axios
      .get(`${API}/api/v1/post`, {
        params: 0,
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
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
    <>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={3}
        navigation={true}
        autoplay={{
          delay: 2500, // Continuous movement
          disableOnInteraction: false,
          loop: true,
          speed: 5000, // Smooth, slow transition
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {post.map(
          (
            item,
            index // post 배열을 매핑하여 SwiperSlide 생성
          ) => (
            <SwiperSlide key={index} className='my-swiper-slide'>
              <div
                style={{
                  marginLeft: `${3 - 10 * index}vw`,
                  marginTop: '200px',
                }}
              >
                <PostingBox param={item} />
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
};

export default MySwiperComponent;
