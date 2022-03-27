import type { SwiperProps } from 'swiper/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { ReactElement } from 'react'
import { Children } from 'react'
import { Navigation, A11y } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'

import * as S from './styled'

interface SliderLayout extends SwiperProps {
  children: ReactElement[]
}

export function SliderLayout({ children, ...rest }: SliderLayout) {
  return (
    <S.SwiperContainer>
      <Swiper modules={[Navigation, A11y]} {...rest}>
        {Children.toArray(
          children?.map((item, index) => (
            <SwiperSlide key={index}>{item}</SwiperSlide>
          ))
        )}
      </Swiper>
    </S.SwiperContainer>
  )
}
