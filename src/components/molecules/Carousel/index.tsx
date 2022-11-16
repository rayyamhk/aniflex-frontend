import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useStyle from '../../../hooks/useStyles';
import styles from './carousel.module.css';

type CarouselType = {
  className?: string,
  imgUrls: string[];
};

export default function Carousel(props: CarouselType) {
  const css = useStyle(styles);

  return (
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
      modules={[Pagination, Navigation, Autoplay]}
    >
      {props.imgUrls.map((url, idx) => (
        <SwiperSlide className={css('wrapper', props.className)} key={idx}>
          <Image
            src={url}
            alt=""
            fill
            sizes="100vw"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}