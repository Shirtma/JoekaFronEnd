import React from 'react';
import styled from 'styled-components';

function CarouselCont() {
  return (
    <CarouselWrapper>
      <h3 className="carousel__title">Spoil your taste buds</h3>

      <p className="carousel__paragraph">
        Treat yourself to the 'IRRESISTIBLE' from our cuisine. Come next door
        and state your desires with our ever growing seasonal menu
      </p>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.div`
  display: grid;
  grid-column: 1/13;
  grid-row: 2/5;
  margin-left: 4rem;
  margin-right: 4rem;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 2.4rem;
  grid-column-gap: 2.4rem;

  @media only screen and (max-width: 768px) {
    grid-column: 1/6;
    grid-row: 2/6;
    margin-left: 1.6rem;
    margin-right: 1.6rem;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(4, 1fr);
    height: 26rem;
  }

  @media only screen and (max-width: 480px) {
    grid-column: 1/6;
    grid-row: 2/6;
    margin-left: 1.6rem;
    margin-right: 1.6rem;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(4, 1fr);
    height: 26rem;
  }

  .carousel {
    &__title {
      grid-column: 1/7;
      grid-row: 1/2;
      font-style: normal;
      font-weight: normal;
      font-size: 6.4rem;
      line-height: 8.8rem;
      color: #dfc09a;

      @media only screen and (max-width: 768px) {
        grid-column: 1/13;
        grid-row: 1/3;
        font-size: 4rem;
        line-height: 5.6rem;
      }

      @media only screen and (max-width: 480px) {
        grid-column: 1/7;
        grid-row: 1/3;
        font-size: 4rem;
        line-height: 5.6rem;
      }
    }

    &__paragraph {
      grid-column: 1/5;
      grid-row: 2/3;
      font-family: "Montserrat", sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 1.6rem;
      line-height: 3.2rem;
      color: #ffffff;

      // @media only screen and (min-width: 1200px) {
      //   grid-column: 1/7;
      //   grid-row: 2/5;
      //   font-size: 2rem;
      //   line-height: 3.8rem;
      // }

      @media only screen and (max-width: 1024px) {
        grid-column: 1/10;
        grid-row: 3/5;
        font-size: 2rem;
        line-height: 2.8rem;
      }

      @media only screen and (max-width: 768px) {
        grid-column: 1/12;
        grid-row: 3/5;
        font-size: 1.6rem;
        line-height: 2.8rem;
      }
      @media only screen and (max-width: 480px) {
        grid-column: 1/6;
        grid-row: 3/5;
        font-size: 1.6rem;
        line-height: 2.8rem;
      }
    }
  }
`;

export default CarouselCont;
