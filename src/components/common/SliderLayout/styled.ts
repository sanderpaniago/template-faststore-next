import styled from 'styled-components'

export const SwiperContainer = styled.div`
  .swiper-button-next,
  .swiper-button-prev {
    background: #fff;
    border-radius: 100%;

    width: 50px;
    height: 50px;

    &::after {
      color: #000;
      font-size: 1.25rem;
    }
  }
`
