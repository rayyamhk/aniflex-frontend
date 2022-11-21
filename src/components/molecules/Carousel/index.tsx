import Image, { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useStyle from '../../../hooks/useStyles';
import styles from './carousel.module.css';

type CarouselType = {
  className?: string,
  imgs: (string|StaticImageData)[];
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
      {props.imgs.map((src, idx) => (
        <SwiperSlide className={css('wrapper', props.className)} key={idx}>
          <Image
            src={src}
            alt=''
            fill
            sizes='100vw'
            placeholder='blur'
            className={css('img')}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}