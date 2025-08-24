import styled from 'styled-components';
import colours from '../../lib/colours';
import { Link } from 'react-router-dom';

export const CtaButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 261px;
  height: 48px;
  color: #fff;
  background-color: ${colours.primarygrey900};
  font-size: 14px;
  padding: 0 16px;
  text-decoration: none;
  &:hover {
    color: ${colours.primarygold600};
  }
`;

const IndividualContainer = styled.div`
  background-color: #fcf9f5;
  .hero {
    display: grid;
    grid-template: repeat(3, auto) / repeat(12, 1fr);

    &__name {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
      font-family: 'Space Grotesk';
      font-style: normal;
      font-weight: 700;
      font-size: 48px;
      line-height: 56px;
      color: #000000;
      padding: 40px 24px;
      will-change: font-size;
      text-transform: uppercase;
      /* "The" prefix before space name */
      @media (min-width: 1024px) {
        grid-column: 1 / 9;
        font-weight: 700;
        font-size: 64px;
        line-height: 88px;
      }
      &-pronoun {
        display: block;
        @media (min-width: 1024px) {
          display: inline-block;
        }
      }
      /* Space actual name */
      &-noun {}
    }

    &__poster {
      grid-column: 1 / -1;
      grid-row: 2 / 3;
      height: 270px;

      @media (min-width: 1024px) {
        grid-column: 1 / 9;
        margin-top: -120px;
        height: 640px;
      }
    }

    &__block {
      display: none;
      background-color: ${colours.primarygold200};
      transform: translateY(-73px);
      @media (min-width: 1024px) {
        display: block;
        grid-column: 9 / 13;
        height: 270px;
      }
    }

    &__description {
      margin-top: 40px;
      grid-column: 1 / -1;
      position: relative;
      p {
        font-weight: 300;
        font-size: 16px;
        line-height: 32px;
        color: #000000;
        margin-bottom: 24px;
      }

      @media (min-width: 1024px) {
        grid-column: 9 / 13;
        margin: -30px 0 0;
      }
      &-more {
        display: none;
        align-items: center;
        width: fit-content;
        margin-top: 150px;
        font-weight: 400;
        font-size: 14px;
        color: inherit;
        svg {
          height: 40px;
          width: 40px;
          border-radius: 56px;
          color: #FFF;
          border: 1px solid #E5CDAE;
          margin-right: 16px;
          transform: rotate(90deg);
        }
        @media (min-width: 1024px) {
          display: flex;
          position: absolute;
          bottom: 64px;
        }
      }
    }

    @media (min-width: 1024px) {
      grid-template-rows: 2 auto;
      grid-column-gap: 24px;
    }
  }

  img {
    height: 100%;
    width: 100%;
  }

  .gallery {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    padding: 0 16px;

    @media (min-width: 1024px) {
      display: grid;
      grid-template: repeat(2, auto) / repeat(12, 1fr);
      gap: 40px;
    }
    &__img {
      width: 100%;
      object-fit: fill;
      margin-bottom: 16px;
      img {
        height: 100%;
        width: 100%;
      }
      &.img1 {
        height: 249px;
        @media (min-width: 1024px) {
          grid-column: 1 / 5;
        }
      }
      &.img2 {
        height: 578px;
        @media (min-width: 1024px) {
          grid-column: 5 / 9;
        }
      }
      &.img3 {
        height: 423px;
        @media (min-width: 1024px) {
          grid-column: 9 / -1;
        }
      }
      &.img4 {
        height: 249px;
        @media (min-width: 1024px) {
          grid-column: 5 / 9;
          grid-row: 2 / 3;
        }
      }
      &.img5 {
        height: 249px;
        @media (min-width: 1024px) {
          grid-column: 9 / -1;
          grid-row: 2 / 3;
          transform: translateY(-150px);
        }
      }
      &.img6 {
        height: 248.21px;
        border-color: #f00;
        @media (min-width: 1024px) {
          grid-column: 9 / -1;
          grid-row: 2 / 3;
          transform: translateY(160px);
        }
      }
    }

    &__intro {
      @media (min-width: 1024px){
        grid-row: 2 / 3;
        grid-column: 1 / 5;
        transform: translateY(-350px);
      }
      &-heading {
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 300;
        font-size: 40px;
        line-height: 48px;
        color: #000000;
        margin-bottom: 40px;
      }
      &-subheading {
        font-family: 'Space Grotesk';
        font-weight: 600;
        font-size: 16px;
        line-height: 32px;
        color: #000000;
        padding-right: 24px;
      }
      &-items {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
        margin-top: 24px;
        &--item {
          display: flex;
          align-items: flex-start;
          font-family: 'Montserrat';
          font-weight: 300;
          font-size: 16px;
          line-height: 32px;
          color: #000000;
          svg {
            margin-right: 12px;
          }
        }
        @media (min-width: 1024px) {
          padding-right: 32px;
        }
      }
    }
  }

  .note {
    margin: 80.43px 0 120.36px;
    padding: 0 16px;
    grid-column: 1 / -1;
    @media (min-width: 1024px) {
      grid-row: 3 / 4;
      margin: 0;
      display: grid;
      height: 0px; // reduces the height to ensure accurate margin
      grid-template: repeat(1, auto) / repeat(12, 1fr);

      & > div {
        transform: translateY(-280px);
        grid-column: 4 / 8;
        padding-left: 24px;
      }
    }

    &__primary {
      font-family: "Space Grotesk", sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 3.2rem;
    }

    &__secondary {
      font-family: Space Grotesk;
      font-style: normal;
      font-weight: normal;
      font-size: 2rem;
      line-height: 2.8rem;
      color: #000000;
    }

    &__button {
      margin-top: 24px;
    }
  }
    .cta {
      display: grid;
      grid-template: repeat(2, minmax(50px, auto)) / repeat(12, 1fr);
      grid-row-gap: 24px;
      margin-bottom: 120px;
      @media (min-width: 1024px) {
        grid-template-rows: 1 auto;
      }
      .outside {
        height: 243px;
        grid-column: 1 / -1;
        padding: 0 16px;
        border-top: 1px solid ${colours.primarygold900};
        border-bottom: 1px solid ${colours.primarygold900};
        @media (min-width: 1024px) {
        grid-column: 1 / 7;
        &:nth-of-type(2){
          grid-column: 7 / 13;
        }
        }

        .inside {
          cursor: pointer;
          border: none;
          border-right: 1px solid ${colours.primarygold900};
          border-left: 1px solid ${colours.primarygold900};
          height: 100%;
          width: 95%;
          margin: 0 auto;
          padding: 39px 40px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          background-color: ${colours.primarygold100};
          &.pad-left {
            .check {
              align-self: flex-start;
              transform: rotate(180deg);
            }
          }
          &.pad-right {
            p {
              align-self: flex-start;
            }
          }
            @media (min-width: 1024px) {
              &.pad-left {
                margin-left: 25px;
              }
              &.pad-right {
                margin-right: 25px;
              }
            }
          p {
            margin-bottom: 48px;
            font-family: 'Space Grotesk';
            font-style: normal;
            font-weight: 400;
            font-size: 32px;
            line-height: 44px;
            color: ${colours.primarygold900};
          }

          .check {
            width: 72px;
            height: 72px;
            border: 1px solid #000000;
            border-radius: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000000;
          }
          &:hover {
            background-color: ${colours.primarygold200};
            .check {
              border-color: ${colours.primarygold600};
              background-color: ${colours.primarygold600};
              color: #FFF;
            }
          }
        }
      }
    }
`;

export default IndividualContainer;
