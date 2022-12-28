import React, { useState } from "react";
import { isMobile } from "../../../utils/useMediaQuery";
import ChevronCircleButton from "../../Atom/Button/CircleButton/Chevron";
import Images from "../../Atom/Image";
import PageControl from "../../Atom/PageControl";

export default function Carousel(props) {
  const {
    state = `1:1`,
    data,
    steps,
    activeStep,
    size = `large`,
    skeleton,
  } = props;
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  let [idx, setIdx] = useState(0);

  const minSwipeDistance = 50;

  const prev = () => {
    if (idx <= 0) idx = data.length;
    setIdx(idx - 1);
  };

  const next = () => {
    if (idx >= data.length - 1) idx = -1;
    setIdx(idx + 1);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    // if (isLeftSwipe || isRightSwipe)
    //   console.log("swipe", isLeftSwipe ? "left" : "right");
    // add your conditional logic here
    if (isLeftSwipe) prev();
    if (isRightSwipe) next();
  };

  const Mobile = isMobile();

  return (
    <>
      <style jsx>{`
        .container-carousel {
          width: ${state === `4:1` || state === `2:1` ? `100%` : `fit-content`};
          height: ${(state === `2:1` && Mobile && `164px`) ||
          (state === `4:1` && `300px`) ||
          (state === `1:1` && `fit-content`)};
          position: relative;
          cursor: pointer;
        }
        .image {
          object-fit: cover;
          display: flex;
          position: relative;
        }
        .circle {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          // margin-top: -85px;
          // position: absolute;
          // top: 40%;
        }
        .circle-left {
          position: absolute;
          top: ${((state === `4:1` || state === `2:1`) && `40%`) ||
          (state === `1:1` && `45%`)};
          left: -25px;
        }
        .circle-right {
          position: absolute;
          top: ${((state === `4:1` || state === `2:1`) && `40%`) ||
          (state === `1:1` && `45%`)};
          right: -30px;
        }
        .page {
          // margin-top: 30px;
          display: flex;
          justify-content: center;
        }
      `}</style>
      <div
        className="container-carousel"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="image">
          <Images
            variant={state}
            size={size}
            image={data ? data[idx].image : ""}
            radius="20.8px"
            class="slider-img"
            skeleton={skeleton}
          />
        </div>
        {!Mobile && (
          <>
            <div className="circle-left">
              <ChevronCircleButton onClick={prev} />
            </div>
            <div className="circle-right">
              <ChevronCircleButton variant="right" onClick={next} />
            </div>
          </>
        )}
        <div className="page">
          <PageControl steps={steps} activeStep={idx} />
        </div>
      </div>
    </>
  );
}
