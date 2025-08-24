import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import BackgroundSlider from 'react-background-slider';
import styled from 'styled-components';
import Image1 from '../../images/restaurant.jpg';
import Image2 from '../../images/restaurant-hero-img.jpg';
import Image3 from '../../images/Aboutgallery3.jpg';
import CarouselCont from '../../components/carousel/carousel';
import Icon from '../../components/icon';
import { useProductsContext } from 'context/products_context';
import Footer from 'components/footer';

function Restaurant() {
    const { setHeaderThemeName } = useProductsContext();

    useEffect(() => {
    setHeaderThemeName('transparent');
    return () => {
      setHeaderThemeName('');
    }
  }, []); // eslint-disable-line
  
  return (
  <>
    <RestaurantWrapper>
      <div className="restaurant__container">
        <BackgroundSlider
          images={[Image1, Image2, Image3]}
          duration={2}
          transition={1}
        />
        <CarouselCont className="check1" />
        <div className="restaurant__order">
          <h2 className="restaurant__order-text">
            BEGIN YOUR TAKEOUT ORDER BELOW
          </h2>
        </div>
        <section className="cta">
          <div className="outside">
            {/* <div className='inside pr'> */}
            <Link className="inside-route pr" to="/restaurant/ordertakeout">
              <p>Order Food</p>
              <span>
                <div className="check">
                  <Icon Name="Utensils" colour="transparent" />
                </div>
              </span>
            </Link>
            {/* </div> */}
          </div>

          <div className="outside">
            {/* <div className='inside pl'> */}
            <Link to="/restaurant/takeoutdine" className="inside-route pl">
              <p>View Menu</p>
              <span>
                <div className="check">
                  <Icon Name="ListBullet" colour="transparent" />
                </div>
              </span>
            </Link>
          </div>
          {/* </div> */}
        </section>
      </div>
    </RestaurantWrapper>
      <Footer />
    </>
  );
}

const RestaurantWrapper = styled.div`
  width: 100%;
  height: 80rem;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(9, 1fr);
  grid-row-gap: 2.4rem;
  grid-column-gap: 2.4rem;
  font-family: "Space Grotesk", sans-serif;

  @media only screen and (max-width: 749px) {
    height: 98.4rem;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(14, 1fr);
  }

  @media only screen and (max-width: 450px) {
    height: 98.4rem;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(14, 1fr);
  }

  .restaurant {
    &__container {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
      grid-column: 1/13;
      grid-row: 1/10;
      height: 80rem;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: repeat(9, 1fr);
      grid-row-gap: 2.4rem;
      grid-column-gap: 2.4rem;
      font-family: "Space Grotesk", sans-serif;

      &#ReactBackgroundSlider figure {
        height: 80rem;
      }

      @media only screen and (max-width: 749px) {
        height: 98.4rem;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(14, 1fr);

        &#ReactBackgroundSlider figure {
          height: 98.4rem;
        }
      }

      @media only screen and (max-width: 450px) {
        height: 98.4rem;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(14, 1fr);

          & #ReactBackgroundSlider figure {
          height: 98.4rem;
        }
      }
    }

    &__order {
      grid-column: 1/13;
      grid-row: 5/6;
      margin-left: 4rem;
      margin-right: 4rem;
      padding-top: 9rem;
      margin-bottom: -4rem;
      &-text {
        font-family: "Montserrat", sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 1.3rem;
        line-height: 1.6rem;
        text-transform: uppercase;
        color: #ffffff;

        @media only screen and (max-width: 450px) {
          padding-top: 4rem;
        }
      }
      @media only screen and (max-width: 749px) {
        grid-column: 1/6;
        margin-left: 1.6rem;
        margin-right: 1.6rem;
        padding-top: 4rem;
      }

      @media only screen and (max-width: 450px) {
        grid-column: 1/6;
        margin-left: 1.6rem;
        margin-right: 1.6rem;
        padding-top: 4rem;
      }
    }
  }

  .cta {
    grid-column: 1/13;
    grid-row: 6/10;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* padding-bottom: 12rem; */

    @media only screen and (max-width: 450px) {
      display: grid;
      grid-column: 1/6;
      grid-row: 7/14;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 2.4rem;
    }

    @media only screen and (max-width: 749px) {
      display: grid;
      grid-column: 1/6;
      grid-row: 7/14;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 2.4rem;
      /* margin-top: 4rem; */
    }
  }
  .outside {
    width: 76rem;
    border-top: #dfc09a 1px solid;
    border-bottom: #dfc09a 1px solid;
    text-decoration: none;
    @media only screen and (min-width: 1200px) and (max-width: 1290px) {
      width: 64rem;
    }
    @media only screen and (max-width: 749px) {
      width: 37.5rem;
    }

    @media only screen and (max-width: 450px) {
      width: 37.5rem;
    }
    @media (min-width: 800px) {
      // width: 600rem;
      // background: red;
    }

    @media (max-width: 1920px) {
      width: 100%;
    }

    @media (min-width: 1920px) {
      width: 100%;
    }
  }

  .inside {
    &-route {
      border-left: #dfc09a 1px solid;
      border-right: #dfc09a 1px solid;
      width: 70.6rem;
      height: 24.3rem;
      margin: 0 auto;
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(6, 1fr);
      grid-column-gap: 2.4rem;
      grid-row-gap: 6rem;
      background: rgba(178, 154, 123, 0.2);
      /* box-shadow: 1px 0px 0px #dfc09a, -1px 0px 0px #dfc09a; */

      :hover {
        background: rgba(178, 154, 123, 0.4);
        .check {
          background: #dfc09a;
        }
      }

      @media (min-width: 1201px) {
        width: 90%;
      }

      @media only screen and (max-width: 1200px) {
        width: 90%;
      }

      @media only screen and (max-width: 1024px) {
        width: 90%;
      }

      @media only screen and (max-width: 768px) {
        width: 90%;
        :hover {
          background: rgba(178, 154, 123, 0.4);
          .check {
            background: #dfc09a;
          }
        }
      }
      @media only screen and (max-width: 480px) {
        width: 90%;
        :hover {
          background: rgba(178, 154, 123, 0.4);
          .check {
            background: #dfc09a;
          }
        }
      }

      p {
        padding-top: 3rem;
        grid-column: 1/5;
        height: 6.8rem;
        font-family: "Space Grotesk", sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 4rem;
        line-height: 6.8rem;
        margin-left: 4rem;
        color: #fff;

        @media (max-width: 768px) {
          // width: 100%;
          font-size: 3rem;
        }
      }

      span {
        grid-column: 6/7;
        grid-row: 2/3;
      }
    }
  }

  .check {
    width: 5rem;
    height: 5rem;
    border: 2px solid #dfc09a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-left: -2.4rem;
    margin-top: -2rem;
    color: #fff;
  }

  .check1 {
    grid-row: 2/3;
    grid-column: 1/13;
  }
`;

export default Restaurant;
