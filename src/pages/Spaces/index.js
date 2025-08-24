/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Icon from '../../components/icon';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { spaces_url } from '../../util/constants';
import { useProductsContext } from '../../context/products_context';
import IndividualContainer, {CtaButtonLink} from './IndividualContainer';
import useMouseHover from 'hooks/useMouseHover';

const Spacesindividual = () => {
  const { spaces } = useProductsContext();
  const [space, setSpace] = useState({});
  const [ index, setIndex ] = useState(0);

  const [ ref1, ref1Hover ] = useMouseHover();
  const [ ref2, ref2Hover ] = useMouseHover();
  const [ reserve1Ref, reserve1Hover ] = useMouseHover();
  const [ reserve2Ref, reserve2Hover ] = useMouseHover();

  const { id } = useParams();
  const fetchSpace = async (url) => {
    try {
      // Serve from cache, since space details are all returned
      // This as to prevent round trip down the server
      if (spaces && spaces.length > 0) {
        const current = spaces.find((space) => space.id === parseInt(id, 10));
        setSpace(current);
        setIndex(spaces?.findIndex((x) => x.id === id));
      } else {
        // Make new request if data is not available in the cache
        // This could occur when page is reloaded because data is
        // not persisted to localStorage
        const response = await axios.get(url);
        const spaces = response.data;
        setSpace(spaces.data);
        setIndex(spaces?.data.findIndex((x) => x.id === id));
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    window.addEventListener('load', fetchSpace(`${spaces_url}/${id}`));
    return () => {
      window.removeEventListener('load', fetchSpace(`${spaces_url}/$`))
    }
  }, [id]);

  const allSpaces = spaces && spaces.map(s => ({ id: s.id, room: s.space }));
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = spaces.length - 1;
    } else if(newIndex >= spaces.length) {
      newIndex = 0;
    }
    setIndex(newIndex);
    setSpace(spaces[newIndex]);
  }

  return (
    <IndividualContainer>
      <header className="hero">
          {(space && space.space) && <h1 className="hero__name">
          <span className="hero__name-pronoun">The</span>
          <span className="hero__name-noun">{space.space.slice(3)}</span>
        </h1>}
        <div className="hero__poster">
          <img src={space.image1} alt="livingroom1" className="img" />
        </div>

        <p className="hero__block"></p>

        <div className="hero__description">
          <p>{ space.description }</p>
          <CtaButtonLink
            ref={reserve1Ref}
            to='/reserve'
            className={Boolean(reserve1Hover) ? 'active' : ''}
          >
            RESERVE SPACE
            <Icon Name={Boolean(reserve1Hover) ? 'ArrowRightGold' : 'RArrowWhite'} />
          </CtaButtonLink>
          <a href="#more" className='hero__description-more'>
            <Icon Name='ArrowRightGold' />
            SEE MORE
          </a>
          </div>
        </header>

        <section className="gallery" id="more">
          <div className="gallery__img img1">
          <img
            src={ space.image2 }
            alt="livingroom1"
            className="img"
          />
          </div>

          <div className="gallery__img img2">
          <img
            src={ space.image3 }
            alt="livingroom1"
            className="img"
          />
        </div>

        <div className="gallery__img img3">
          <img
            src={ space.image4 }
            alt="livingroom1"
            className="img"
          />
        </div>

        <div className="gallery__intro">
          <h4 className="gallery__intro-heading">
            { space.space }&apos;s Guideline
          </h4>
          <h6 className="gallery__intro-subheading">
            Here&apos;s what you should know about this space
          </h6>

          <div className="gallery__intro-items">
            <div className="gallery__intro-items--item">
              <Icon
                Name="Clock"
                colour="transparent"
                height='24px'
                width='24px' />
              <span>{space.duration}</span>
            </div>

            <div className="gallery__intro-items--item">
              <Icon
                Name="People"
                colour="transparent"
                height='24px'
                width='24px'
              />
              <span>{space.guests}</span>
            </div>

            <div className="gallery__intro-items--item">
              <Icon
                Name="Coin"
                colour="transparent"
                height='48px'
                width='48px' />
              <span>{space.spend}</span>
            </div>

            <div className="gallery__intro-items--item">
              <Icon
                Name="ClockWise"
                colour="transparent"
                height='24px'
                width='24px' />
              <span>{space.hourlyRate}</span>
            </div>
          </div>
        </div>

          <div className="gallery__img img4">
            <img
              src={space.image5}
              alt="livingroom1"
              className="img"
              />
          </div>
          <div className="gallery__img img5">
            <img
              src={space.image6}
              alt="livingroom1"
              className="img"
              />
        </div>
        <div className="gallery__img img6">
          <img
            src={space.image7}
            alt="livingroom1"
            className="img"
            />
        </div>
      <section className="note">
        <div>
          <h5 className="note__primary">NOTE</h5>
          <p className="note__secondary">{ space.note }</p>
            <CtaButtonLink
              ref={reserve2Ref}
              to='/reserve'
              className='note__button'
            >
            RESERVE SPACE
            <Icon Name={Boolean(reserve2Hover) ? 'ArrowRightGold' : 'RArrowWhite'} />
          </CtaButtonLink>
        </div>
      </section>
      </section>


      <div className="hold">
        <section className="cta">
          <div className="outside">
            <button
              ref={ref1}
              onClick={() => updateIndex(index - 1)}
              className='inside pad-left'
            >
              <p>{allSpaces[index - 1]?.room}</p>
                <span className="check">
                  <Icon
                    Name={Boolean(ref1Hover) ? 'ArrowRightWhite' : 'RArrow'}
                    colour={Boolean(ref1Hover) ? 'white' : 'black'}
                    height='40px'
                    width='40px'
                    />
              </span>
            </button>
          </div>
          <div className="outside">
            <button
              ref={ ref2 }
              onClick={() => updateIndex(index + 1)}
              className='inside pad-right'
              >
                <p>{allSpaces[index + 1]?.room}</p>
                <span className="check">
                  <Icon
                    Name={Boolean(ref2Hover)  ? 'ArrowRightWhite' : 'RArrow'}
                    colour={Boolean(ref2Hover) ? 'white' : 'black'}
                    height='40px'
                    width='40px'
                  />
                </span>
              </button>
          </div>
        </section>
      </div>
    </IndividualContainer>
  );
};

export default Spacesindividual;
