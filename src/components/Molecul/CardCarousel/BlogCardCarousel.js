import React, { useState } from "react";
import ChevronCircleButton from "../../Atom/Button/CircleButton/Chevron";
import BlogCard from "../../Organism/Card/BlogCard";

export default function BlogCardCarousel(props) {
  const { cards, slide, skeleton } = props;
  let [idx, setIdx] = useState(0);
  const prev = () => {
    if (idx <= 0) idx = cards.length;
    setIdx(idx - 1);
  };
  const next = () => {
    if (idx >= cards.length - slide) idx = -1;
    setIdx(idx + 1);
  };
  return (
    <>
      <style jsx>
        {`
          .carousel-container {
            display: flex;
            // justify-content: center;
            gap: 24px;
            margin: auto;
            position: relative;
            width: fit-content;
          }
          .circle-left {
            position: absolute;
            top: 40%;
            left: -30px;
            z-index: 3;
          }
          .circle-right {
            position: absolute;
            top: 40%;
            right: -25px;
            z-index: 3;
          }
        `}
      </style>
      <div className="carousel-container">
        {skeleton ? (
          <>
            <BlogCard skeleton />
            <BlogCard skeleton />
            <BlogCard skeleton />
          </>
        ) : (
          cards &&
          cards.map((item, index) => {
            if (index - idx >= 0 && index - idx < slide) {
              return (
                <BlogCard
                  key={index}
                  image={item.image_url}
                  title={item.title}
                  category={item.tags == null ? "" : item.tags.join(",")}
                  date={item.date}
                  onClick={() => (window.location.href = item.link)}
                />
              );
            }
          })
        )}
        {cards && cards.length > slide && (
          <>
            <div className="circle-left">
              <ChevronCircleButton onClick={prev} />
            </div>
            <div className="circle-right">
              <ChevronCircleButton variant="right" onClick={next} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
