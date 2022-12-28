import React from "react";
import NotificationCard from "../../../components/Organism/Card/NotificationCard";
import { Elevation } from "../../../themes";
import { DUMMY_DATA } from "../../../utils/DummyData";
import useMediaQuery from "../../../utils/useMediaQuery";

function Semua() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: ${isMobile ? "0px" : "24px"};
            position: static;
            width: 100%;
            height: 100%;
            margin-left: ${isMobile ? "0px" : "24px"};
            background-color: white;
            border-radius: 8px;
            box-shadow: ${Elevation.card};
          }
        `}
      </style>
      <div className="container">
        {DUMMY_DATA.DATA_NOTIFIKASI.map((el, idx) => (
          <NotificationCard
            key={idx}
            title={el.title}
            description={el.description}
            variant={el.variant}
            timestamp={el.timestamp}
            isRead={el.isRead}
          />
        ))}
      </div>
    </>
  );
}

export default Semua;
