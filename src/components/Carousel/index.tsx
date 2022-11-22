import Image, { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import Box from '@mui/material/Box';
import 'swiper/css';
import 'swiper/css/pagination';

type CarouselType = {
  imgs: (string|StaticImageData)[];
};

export default function Carousel(props: CarouselType) {
  return (
    <Box sx={{
      paddingBottom: '33.333%',
      position: 'relative',
      '& > div': {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    }}>
      <Swiper
        pagination={{ clickable: true }}
        navigation={{ enabled: true }}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Pagination, Autoplay]}
      >
        {props.imgs.map((src, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={src}
              alt=''
              fill
              sizes='100vw'
              placeholder='blur'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}