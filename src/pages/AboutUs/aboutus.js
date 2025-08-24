import React from 'react';
import styled from 'styled-components';
import about1 from '../../images/about-1.jpg';
import aboutvision from '../../images/aboutvision.jpg';
import aboutmission from '../../images/aboutmission.jpg';
import ceosign from '../../images/ceosign.jpg';
import aboutgallery1 from '../../images/Aboutgallery1.jpg';
import aboutgallery2 from '../../images/Aboutgallery2.jpg';
import aboutgallery3 from '../../images/Aboutgallery3.jpg';
import Pdf from '../../components/pdf/the-house-story.pdf';
import colours from '../../lib/colours';
import Icon from '../../components/icon';
import LinkButton from '../../components/linkButton';

function Aboutus() {
  return (
    <AboutContainer>
      <header className="about__intro">
        <div className="about__intro-text">
          <h1>Food.</h1>
          <h1>Art.</h1>
          <h1>Entertainment.</h1>
        </div>

        <div className="about__img">
          <img src={about1} alt="livingroom1" className="img abt-img" />
        </div>

        <div className="about__tab1">
          <p className="">
            Borne out of a desire to socialise at a slower pace, in a
            comfortable and beguilling environment, THE HOUSE is a unique
            concept that provides an alternative way of socialising by artfully
            blending elements of fine dining, good music and hearty
            entertainment, leaving our guests with a truly unique social
            exprience every time they visit is.
          </p>
          <LinkButton to={Pdf}
            target="_blank"
            rel="noopener noreferrer"
            label="EXPERIENCE OUR STORY"
            endIcon="RArrowWhite"
            style={{ width: '261px', backgroundColor: '#000000' }}
            labelClassName="link-btn"
          />
        </div>
      </header>

      <main>
        <section className="vision">
          <div className="img">
            <img
              loading='lazy'
              src={ aboutvision }
              alt="livingroom1"
              height="343px"
              width="343px"
            />
          </div>
          <div className='vision__statement'>
            <h2>OUR VISION</h2>
            <p>
            THE HOUSE seeks to bring people from all cultures together into a vibrant melting point, where guests come to meet friends, do business and relax, creating a platform from which to base both their social and professional lives, all against the backdrop of a home.
            </p>
            <LinkButton to="/register" 
              label="PAY US A VISIT"
              endIcon="RArrowWhite"
              style={{ width: '261px', backgroundColor: '#000000' }}
              labelClassName="link-btn"
            />
          </div>
        </section>

        <section className="mission">
          <div className="img">
            <img
              loading='lazy'
              src={ aboutmission }
              alt="livingroom1"
              height="343px"
              width="343px"
            />
            </div>
          <div className='mission__statement'>
            <h2>OUR MISSION</h2>
            <p>
              Ultimately, our aim is to grow THE HOUSE into a community of like-minded indivials with sister HOUSES around the world. The venture marks the first step on that journey. We hope that with excellent service delivery, your continued patronage and a fair wind in our sails, together, we can achieve this dream
            </p>
            <LinkButton to="/contact" 
              label="BECOME A MEMBER"
              endIcon="RArrowWhite"
              style={{ width: '261px', backgroundColor: '#000000' }}
              labelClassName="link-btn"
            />
          </div>
        </section>

        <section className="ceo__remark">
          <div className="">
            <p className="">
              Our distinguishing factors are the emphasis we place on our guests’ social experience, and the vibe-driven approach we take with everything on offer. The infectious, high-energy atmosphere, coupled with the deliberately chic and homely decor, is designed to disarm
              our guests and ecourage interaction and mingling.
            </p>
              <p className="">
                We look forward to welcoming you to THE HOUSE. Visiting us is never a bad idea.
              </p>
          </div>
          <div className="img signature">
            <img
              loading='lazy'
              src={ ceosign }
              alt="livingroom1"
            />
          </div>
        </section>
      </main>

      <section className="testimonial">
        <h4 className="testimonial__heading">
          We like to hear from our customers and this is what they had to say:
        </h4>

        <div className="testimonial__item">
          <div className="testimonial__item-quote">
            <Icon
              Name="LQuote"
              colour="transparent"
              width="56px"
              height="45.13px"
            />
          </div>

            <p className="testimonial__item-text">
              The infectious, high-energy atmosphere, coupled with the
              deliberately chic and homely decor, is designed to disarm our
              guests and ecourage interaction and mingling.
            </p>
            <p className="testimonial__item-line">TOBI HAMILTON</p>

          <div className="testimonial__item-arrows">
            <Icon
              Name="ArrLeftGO"
              colour="transparent"
              height="40"
              width="40"
            />
            <Icon
              Name="ArrRightGO"
              colour="transparent"
              height="40"
              width="40"
            />
          </div>
        </div>
      </section>

      <section className="about__gallery">
        <div className="about__gallery-1">
          <img
            loading='lazy'
            src={ aboutgallery1 }
            alt="livingroom1"
            className="img"
            height="248.21px"
          />
        </div>
        <div className="about__gallery-2">
          <img
            loading='lazy'
            src={ aboutgallery2 }
            alt="livingroom1"
            className="img"
            height="578.36px"
          />
        </div>
        <div className="about__gallery-3">
          <img
            loading='lazy'
            src={ aboutgallery3 }
            alt="livingroom1"
            className="img"
            height="423.33px"
          />
        </div>
      </section>
    </AboutContainer>
  );
}

const AboutContainer = styled.div`
  a {
    text-decoration: none;
  }
  background-color: #fcf9f5;
  img {
    max-width: 100%;
    height: 100%;
  }
  .about {
    &__intro {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: repeat(3, auto);

      &-text {
        grid-row: 1 / 2;
        grid-column: 1 / -1;
        margin: 0;
        z-index: 1;
        h1 {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 300;
          font-size: 40px;
          line-height: 40px;
          padding: 8px;
          background-color: black;
          color: white;
          width: fit-content;
          margin-left: -2px;
          position: relative;
          &:nth-of-type(2) {
            color: #000000;
            background-color: #dfc09a;
          }
          &:nth-of-type(3) {
            color: #000000;
            background-color: #fff;
        }
      }
      @media (min-width: 1024px) {
          grid-column: 1 / 8;
          h1 {
            font-size: 96px;
            line-height: 96px;
          }
        }
    }
  }
  &__img {
    height: 182px;
    width: 100%;
    grid-row: 2 / 3;
    grid-column: 4 / -1;
    margin-top: -20px;
    img {
      width: 100%;
    }
    @media (min-width: 1024px) {
      grid-row: 1 / 4;
      grid-column: 6 / 12;
      height: 521px;
      margin-top: 130px;
    }
  }

    &__tab1 {
      grid-row: 3 / 4;
      grid-column: 1 / -1;
      padding: 16px;

      p{
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 32px;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 261px;
        height: 48px;
        color: #fff;
        background-color: ${colours.primarygrey900};
        font-size: 14px;
        padding: 0 16px;
        margin-top: 24px;
      }
      @media (min-width: 1024px) {
        grid-column: 1 / 5;
        grid-row: 2 / 4;
        padding: 88px 40px;
      }
    }

    &__gallery {
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      gap: 15.79px;
      margin-bottom: 120.67px;
      img {
        width: 100%;
      }
      &-1 {
        height: 343px;
      }
      &-2 {
        height: 578.36px;
      }
      &-3 {
        height: 423.33px;
      }
      @media (min-width: 1024px){
        display: grid;
        grid-gap: 15.79px;;
        grid-template: repeat(1, minmax(50px, auto)) / repeat(12, 1fr);
        padding: 0 40px;
        gap: 40px;

        &-1 {
          grid-column: 1 / 5;
          height: 309px;
        }
        &-2 {
          grid-column: 5 / 9;
          height: 720px;
        }
        &-3 {
          grid-column: 9 / 13;
          height: 527px;
        }
      }
     }
  }

  main {
    margin: 80px 0 0;
    display: grid;
    grid-template: repeat(3, minmax(200px, auto)) / repeat(12, 1fr);
    grid-row-gap: 80px;
     .vision,.mission {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
      padding: 0 16px;
      .img {
        height: 343px;
        width: 100%;

        @media (min-width: 768px) {
          height: 442px;
          width: 100%;
          img {
            width: 100%;
          }
        }
      }
      h2 {
        font-family: 'Space Grotesk';
        font-weight: 600;
        font-size: 16px;
        line-height: 32px;
        color: #000000;
        margin: 40px 0 8px;
      }
      p {
        font-family: 'Montserrat';
        font-weight: 300;
        font-size: 16px;
        line-height: 32px;
        color: #000000;
        margin-bottom: 24px;
      }

      @media (min-width: 1024px){
        display: grid;
        grid-template: repeat(1, auto) / repeat(12, 1fr);
      }
    }

    .vision {
      @media (min-width: 1024px){
        .img {
          grid-column: 4 / 6;
          height: 442px;
          width: 442px;
        }
        &__statement {
          padding: 20px 80px;
        }
      }
    }

    .mission {
      grid-row: 2 / 3;
      @media (min-width: 1024px){
        .img {
          grid-row: 1 / 2;
          grid-column: 8 / 12;
          height: 442px;
          width: 442px;
        }
        &__statement {
          grid-column: 3 / 8;
          grid-row: 1 / 2;
          padding: 20px 80px;
        }
      }
    }
    .ceo__remark {
      grid-row: 3 / 4;
      grid-column: 1 / -1;
      padding: 40px 16px 40.26px;
      color: #FFFFFF;
      background-color: #000000;
      height: auto;
      p {
        font-family: 'Space Grotesk';
        font-weight: 300;
        font-size: 24px;
        line-height: 32px;
        &:nth-of-type(2){
          margin-top: 48px;
        }
        @media (min-width: 1024px) {
          font-size: 40px;
          line-height: 48px;
        }
      }
      .img.signature {
        height: 60.74px;
        width: 219px;
        margin-top: 40px;
      }
      @media (min-width: 1024px) {
        padding: 40px;
      }
    }
  }

  .testimonial {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, auto);
    grid-row-gap: 2.4rem;
    padding: 80px 16px 40px;
    font-family: "Space Grotesk", sans-serif;

    &__heading {
      font-weight: 300;
      font-size: 20px;
      line-height: 28px;
    }

    &__item {
      &-quote {
        margin: 40px 0px 24px;
      }
      &-text {
        font-weight: 300;
        font-size: 24px;
        line-height: 36px;
      }

      &-line {
        display: flex;
        width: 15.9rem;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-style: normal;
        font-weight: 600;
        font-size: 1.6rem;
        line-height: 3.2rem;
        margin: 24px 0px 47px;

        &::before {
          content: "";
          border-top: 3px solid;
          margin: 0 20px 0 0;
          flex: 1 0 20px;
          color: #dfc09a;
          width: 15.9rem;
        }
      }
      &-arrows {
        svg:nth-of-type(1) {
          margin-right: 24px;
        }
      }
    }
    @media (min-width: 1024px){
      grid-template: repeat(1, minmax(50px, auto)) / repeat(12, 1fr);
      padding: 120px 40px;
      &__heading {
        grid-column: 1 / 6;
      }
      &__item {
        grid-column: 8 / 12;
        position: relative;

        &-quote {
          margin-top: 0;
        }

        &-line {
          width: 170px;
          margin-bottom: 0;
        }

        &-arrows {
          position: absolute;
          width: 125%;
          display: flex;
          justify-content: space-between;
          transform: translate(-60px, -200px);
        }
      }
    }
  }
  .link-btn {
    color: white;
  }
`;

export default Aboutus;
