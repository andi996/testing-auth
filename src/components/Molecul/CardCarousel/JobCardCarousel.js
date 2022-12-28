import React, { useState } from "react";
import formatRupiah from "../../../utils/formatRupiah";
import ChevronCircleButton from "../../Atom/Button/CircleButton/Chevron";
import JobCard from "../../Organism/Card/JobCard";

export default function JobCardCarousel(props) {
  const { cards, slide } = props;
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
            width: 100%;
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
        {cards.map((item, index) => {
          if (index - idx >= 0 && index - idx < slide) {
            return (
              <JobCard
                key={index}
                title={item.job_position}
                company={item.company_name}
                salary={
                  formatRupiah(item.salary_lower) +
                  " - " +
                  formatRupiah(item.salary_upper)
                }
                description={item.description}
                profileMatch={item.match_percentage}
                timestamp={item.posted_at}
                // fullWidth
              />
            );
          }
        })}
        {cards.length > slide && (
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
