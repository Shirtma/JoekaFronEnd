import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import restaurant from '../../images/restaurant.jpg';
import spaces from '../../images/spaces.jpg';
import playlist from '../../images/our-playlist-image.jpg';
import Icon from '../../components/icon';
import colours from '../../lib/colours';
import LinkButton from '../../components/linkButton';

function Homepage() {
  const [hover, setIsHover] = useState(false);
  const [orderHover, setOrderHover] = useState(false);
  const [reserveHover, setReserveHover] = useState(false);
  const [hover1, setIsHover1] = useState(false);
  const [hover2, setIsHover2] = useState(false);
  const changeHoverOn = () => {
    setIsHover(true);
  };

  const changeHoverOff = () => {
    setIsHover(false);
  };

  const changeHoverOn1 = () => {
    setIsHover1(true);
  };

  const changeHoverOff1 = () => {
    setIsHover1(false);
  };

  const changeHoverOn2 = () => {
    setIsHover2(true);
  };

  const changeHoverOff2 = () => {
    setIsHover2(false);
  };

  useEffect(() => {}, [hover]);

  return (
    <HomeContainer>
      <div className="hero">
        <h1>Joeka Inc.</h1>
        {/* <div className="video-box">
        <video
          controls={false}
          autoPlay={true}
          preload="auto"
          loop
            muted
            data-testid='video'
        >
          <source
            src="https://res.cloudinary.com/dgkltr/video/upload/v1638463488/THE%20HOUSE/the-house-vid-max_sd9gdm.mp4"
            type="video/mp4"
          />
        </video>
        </div> */}
      </div>

      <div className="about__subsection">
        <h2 className="">Social house in the heart of Lagos</h2>
          <LinkButton
          to="/about"
          label="READ ABOUT US"
          className="link-btn"
        />

        <div className="about__subsection-into">
          <p>
            THE HOUSE is a unique concept that provides an alternative way of
            socialising by artfully blending elements of fine dining, good music
            and hearty entertainment.
          </p>
          <p>
            Simply put we are a social house! A home away from home for the
            vintage and the contemporary, the quirky and the orthodox, the green
            and the seasoned.
          </p>
          <p>
            We seeks to bring people from all cultures together into a vibrant
            melting pot, where guests come to meet friends, do business and
            relax.
          </p>
        </div>
      </div>

      <section className="explore">
        <h3>Explore The House</h3>
          <div className="explore_tab home-1">
            <img
              src={restaurant}
              alt="House 1"
              className="explore_tab__img img"
              loading='lazy'
          />
          <LinkButton
            to="/restaurant"
            label="RESTAURANT"
            endIcon="RArrow"
            className="explore_tab__name"
            endIconColor={`${hover ? 'white' : 'black'}`}
            style={{ width: '256px' }}
            labelStyle={{color: `${hover ? 'white' : 'black'}`}}
            onMouseOver={changeHoverOn}
            onMouseLeave={changeHoverOff}
          />
          </div>

          <div className="explore_tab home-2">
          <img src={spaces} alt="House 1" className="explore_tab__img img" loading='lazy' />
          <LinkButton
            to="/rooms"
            label="OUR SPACES"
            endIcon="RArrow"
            className="explore_tab__name"
            endIconColor={`${hover1 ? 'white' : 'black'}`}
            style={{ width: '256px' }}
            labelStyle={{color: `${hover1 ? 'white' : 'black'}`}}
            onMouseOver={changeHoverOn1}
            onMouseLeave={changeHoverOff1}
          />
          </div>

          <div className="explore_tab home-3">
            <img
              src={playlist}
              alt="House 1"
            className="explore_tab__img img"
            loading='lazy'
          />
          <LinkButton
            to="#"
            label="OUR PLAYLIST &amp; EVENTS"
            endIcon="RArrow"
            className="explore_tab__name disabled"
            endIconColor={`${hover2 ? 'white' : 'black'}`}
            style={{ width: '256px' }}
            labelStyle={{color: `${hover2 ? 'white' : 'black'}`}}
            onMouseOver={changeHoverOn2}
            onMouseLeave={changeHoverOff2}
            disabled
          />
          </div>
      </section> 

      <div className="hold">
        <section className="cta">
          <div className="outside">
            <Link to="/restaurant">
              <div
                onMouseEnter={() => setOrderHover(true)}
                onMouseLeave={() => setOrderHover(false)}
                className="inside pad-left"
              >
                <p>Order a Takeout</p>
                <span className="check">
                    <Icon
                      Name={orderHover ? 'ArrowRightWhite' : 'RArrow'}
                    colour={orderHover ? 'white' : 'black'}
                    height='40px'
                    width='40px'
                    />
                </span>
              </div>
            </Link>
          </div>
          <div className="outside">
            <Link to="/reserve">
              <div
                onMouseEnter={() => setReserveHover(true)}
                onMouseLeave={() => setReserveHover(false)}
                className="inside pad-right"
              >
                <p>Reserve a space</p>
                <span className="check">
                  <Icon
                    Name={reserveHover ? 'ArrowRightWhite' : 'RArrow'}
                    colour={reserveHover ? 'white' : 'black'}
                    height='40px'
                    width='40px'
                  />
                </span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      transition: all 0.3s ease-in-out;
    }
    .hero {
      margin-top: 216.95px;
      display: grid;
      grid-template: repeat(2, auto) / repeat(12, 1fr);
        h1 {
          grid-column: 1 / 4;
          font-weight: 300;
          font-size: 56px;
          line-height: 64px;
          font-family: Space Grotesk;
          padding: 0 16px;
          @media (min-width: 1024px) {
            grid-column: 1 / 8;
            font-size: 120px;
            line-height: 120px;
            margin-left: 40px;
          }
        }

        .video-box {
          grid-column: 1 / 13;
          grid-row: 2 / 3;
          height: 100%;
          margin-top: 40px;
          video {
            width: 100%;
            height: 100%;
          }
      }
    }
    .about__subsection {
      padding: 0 16px;
      display: grid;
      grid-template: repeat(3, minmax(50px, auto)) / repeat(12, 1fr);

      h2 {
        grid-column: 1 / -1;
        font-family: Space Grotesk;
        font-weight: 300;
        font-size: 40px;
        line-height: 40px;
        padding-right: 16px;
        margin: 40px 0;
        @media (min-width: 1024px) {
          grid-column: 1 / 5;
          grid-row: 1 / 2;
          font-size: 64px;
          line-height: 68px;
          margin: 0;
        }
        @media (min-width: 1280px) {
          height: 204px;
        }
      }
      &-into {
        grid-row: 2 / 3;
        grid-column: 1 / -1;
        @media (min-width: 1024px) {
          grid-column: 6 / 12;
          grid-row: 1 / 3;
        }

        @media (min-width: 1280px) {
          grid-column: 7 / 11;
        }

        p {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 300;
          font-size: 16px;
          line-height: 32px;
          margin-bottom: 40px;
        }
      }
      .link-btn {
        width: 156px;
        height: 48px;
        font-family: Montserrat;
        line-height: 17px;
        border: 1px solid #000000;
        background-color: unset;
        .LinkButton__text {
          color: #111827;
        }
        &:hover {
          background-color: ${colours.primarygrey900};
          .LinkButton__text {
            color: #ffffff;
          }
        } 
        @media (min-width: 1024px) {
          grid-row: 2 / 3;
          grid-column: 1 / 7;
        }
        @media (min-width: 1345px) {
          margin-top: -60px;
        }
      }
      @media (min-width: 1024px) {
        margin-top: 120px;
        padding: 0 40px;
      }
    }

    .explore {
      margin: 120px 0;
      display: grid;
      grid-template: repeat(4, auto) / repeat(12, 1fr);
      grid-row-gap: 40px;
      padding: 0 16px;

      @media (min-width: 1024px){
        grid-template-rows: 3 auto;
        grid-column-gap: 25px;
        padding: 0 40px;
        margin: 0;
      }
      h3 {
        grid-column: 1 / -1;
        font-family: Space Grotesk;
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 44px;
      }

      &_tab {
        .img {
          height: 100%;
          width: auto;
          @media (min-width: 467px) {
            height: 100%;
            width: 100%;
          }
          @media (min-width: 1024px) {
            height: 100%;
            width: auto;
          }
          @media (min-width: 1440px) {
            height: auto;
            width: 100%;
          }
          @media (min-width: 1920px) {
            height: auto;
            width: 100%;
          }
          
          &.disabled {
            background-color: #cccccc;
            color: #c0c0c0;
          }
        }
        &.home-1{
          grid-column: 1 / -1;
          grid-row: 2 / 3;
          height: 540px;
          position: relative;
          overflow: hidden;
          @media (min-width: 1024px) {
            grid-row: 2 / 3;
            grid-column: 1 / 5;
          }
        }
        &.home-2 {
          grid-row: 3 / 4;
          grid-column: 1 / -1;
          height: 540px;
          position: relative;
          overflow: hidden;
          @media (min-width: 1024px) {
            grid-row: 2 / 3;
            grid-column: 5 / 9;
          }
        }
        &.home-3 {
          grid-row: 4 / 5;
          grid-column: 1 / -1;
          height: 540px;
          position: relative;
          overflow: hidden;
            @media (min-width: 1024px) {
            grid-row: 2 / 3;
            grid-column: 9 / 13;
          }
        }
        &__name {
          position: absolute;
          bottom: 24px;
          left: 24px;
          width: 295px;
        }
        &.home-1:hover, &.home-2:hover, &.home-3:hover {
          img {
          transition: all 0.5s ease-in-out;
            transform: scale(1.2);
          }
        }
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
          border-right: 1px solid ${colours.primarygold900};
          border-left: 1px solid ${colours.primarygold900};
          height: 100%;
          padding: 39px 40px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          background-color: ${colours.primarygold100};
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
          }
          &:hover {
            background-color: ${colours.primarygold200};
            .check {
              border-color: ${colours.primarygold600};
              background-color: ${colours.primarygold600};
            }
          }
        }
      }
    }
`;

// function HomePageComponent() {
//   return (
//     <>
//       <Homepage />
//     </>
//   );
// }

// export default HomePageComponent;

export default Homepage;
