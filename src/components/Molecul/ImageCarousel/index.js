import React, { useEffect, useState } from "react";
import Slider from "react-styled-carousel";
import ChevronCircleButton from "../../Atom/Button/CircleButton/Chevron";
import Images from "../../Atom/Image";
import {
  isLargeScreen,
  isMediumScreen,
  isMobile,
  isSmallScreen,
  isTablet,
} from "../../../utils/useMediaQuery";
import { Radius } from "../../../themes";
import ModalImage, { Lightbox } from "react-modal-image";

export default function ImageCarousel({ images }) {
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();
  const MediumScreen = isMediumScreen();
  const LargeScreen = isLargeScreen();
  const [imageCarousel, setImageCarousel] = useState(images[0]);
  let [Index, setIndex] = useState(0);
  const [RefIndex, setRefIndex] = useState(0);
  const [Show, setShow] = useState(false);
  const [slideConfig, setConfig] = useState({
    index: 0,
    ref: 0,
    length: 0,
  });
  // const [touchStart, setTouchStart] = useState(null);
  // const [touchEnd, setTouchEnd] = useState(null);

  // const minSwipeDistance = 50;

  // const prev = () => {
  //   if (Index <= 0) Index = images.length;
  //   setIndex(Index - 1);
  // };

  // const next = () => {
  //   if (Index >= images.length - 1) Index = -1;
  //   setIndex(Index + 1);
  // };

  // const onTouchStart = (e) => {
  //   setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
  //   setTouchStart(e.targetTouches[0].clientX);
  // };

  // const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  // const onTouchEnd = () => {
  //   if (!touchStart || !touchEnd) return;
  //   const distance = touchStart - touchEnd;
  //   const isLeftSwipe = distance > minSwipeDistance;
  //   const isRightSwipe = distance < -minSwipeDistance;
  //   if (isLeftSwipe) prev();
  //   if (isRightSwipe) next();
  // };

  const responsive = [
    // { breakPoint: 1366, cardsToShow: 6 },
    { breakPoint: 768, cardsToShow: 5 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
    { breakPoint: 640, cardsToShow: 4 },
    { breakPoint: 0, cardsToShow: 3 },
  ];

  useEffect(() => {
    setIndex(0);
    setRefIndex(0);
    setImageCarousel(images[0]);
    if (SmallScreen || MediumScreen || LargeScreen)
      setConfig({ index: 3, ref: 4, length: 5 });
    if (Tablet) setConfig({ index: 2, ref: 3, length: 4 });
    if (Mobile) setConfig({ index: 1, ref: 2, length: 3 });
  }, [Mobile, Tablet, SmallScreen, MediumScreen, LargeScreen]);

  return Mobile ? (
    <>
      <style jsx>
        {`
          .container {
            width: 100%;
            overflow-x: auto;
            gap: 8px;
            display: flex;
          }

          .container::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="container">
        {images.map((el, idx) => (
          <img
            key={idx}
            style={{
              width: 120,
              height: 120,
              borderRadius: Radius.medium,
              objectFit: "cover",
              cursor: "pointer",
            }}
            src={el}
            onClick={() => {
              setIndex(idx);
              setImageCarousel(el);
              setShow(true);
            }}
          />
        ))}
      </div>

      {Show && (
        <Lightbox
          onClose={() => setShow(false)}
          large={imageCarousel}
          hideDownload
          hideZoom
        />
      )}
    </>
  ) : (
    <>
      <div
        style={{
          display: `block`,
          margin: `auto`,
          marginBottom: `16px`,
        }}
      >
        <Images variant="2:1" size="large" image={imageCarousel} />
      </div>
      <div
        style={{
          width: `90%`,
          margin: "auto",
          position: `relative`,
          marginBottom: `16px`,
        }}
      >
        <ChevronCircleButton
          disable={Index == RefIndex}
          variant="left"
          customStyle={{
            position: `absolute`,
            left: -24,
            top: 24,
            zIndex: 12,
          }}
          onClick={() => {
            setImageCarousel(images[Index - 1]);
            setIndex(Index - 1);
          }}
        />
        <Slider
          responsive={responsive}
          autoSlide={false}
          // cardsToShow={6}
          // pauseOnMouseOver={true}
          infinite={false}
          showDots={false}
          LeftArrow={
            <ChevronCircleButton
              variant="left"
              customStyle={{
                position: `absolute`,
                left: -24,
                top: 24,
              }}
            />
          }
          RightArrow={
            <ChevronCircleButton
              variant="right"
              customStyle={{
                position: `absolute`,
                right: -24,
                top: 24,
              }}
            />
          }
          afterSlide={() => {
            if (
              Index < images.length - 1 &&
              Index - RefIndex == slideConfig.ref
            ) {
              setImageCarousel(images[Index + 1]);
              setRefIndex(RefIndex + 1);
              setIndex(Index + 1);
            } else if (Index == 0 && RefIndex == 0) {
              setImageCarousel(images[images.length - 1]);
              setRefIndex(images.length - slideConfig.length);
              setIndex(images.length - 1);
            } else if (Index - RefIndex == 0) {
              setImageCarousel(images[Index - 1]);
              setRefIndex(RefIndex - 1);
              setIndex(Index - 1);
            } else {
              setImageCarousel(images[0]);
              setRefIndex(0);
              setIndex(0);
            }
          }}
          padding={`0 40px`}
        >
          {images.map((el, idx) => (
            <Images
              pointer
              image={el}
              onClick={() => {
                setIndex(idx);
                setImageCarousel(el);
              }}
              onFocus={idx == Index}
              key={idx}
            />
          ))}
        </Slider>
        <ChevronCircleButton
          disable={Index - RefIndex > slideConfig.index}
          variant="right"
          customStyle={{
            position: `absolute`,
            right: -24,
            top: 24,
            zIndex: 12,
          }}
          onClick={() => {
            setImageCarousel(images[Index + 1]);
            setIndex(Index + 1);
            if (Index - RefIndex > slideConfig.index) setRefIndex(RefIndex + 1);
          }}
        />
      </div>
    </>
  );
}
