import React from 'react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay,EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// import styles bundle
import 'swiper/css/bundle'
import Image from 'next/image';

// Initialize Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay,EffectFade]);

export const Slider = ({ data }) => {
  const imageCount = data.slider_image;
  const slides = [];

  for (let i = 0; i < imageCount; i++) {
    const imageUri = data[`slider_image_${i}_image`].url;
    const imageWidth = data[`slider_image_${i}_image`].width;
    const imageHeight = data[`slider_image_${i}_image`].height;
    const imageTitle = data[`slider_image_${i}_image`].title;
    slides.push(
      <SwiperSlide key={i}>
        <Image className="slide-image" src={imageUri} height={imageHeight} width={imageWidth} alt={imageTitle} />
      </SwiperSlide>
    );
  }
  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      effect={'fade'}
      autoplay={{ delay: 3000 }}
      className="mySwiper"
    >
      {slides}
    </Swiper>
  );
};

