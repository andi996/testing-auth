import React, { useState } from "react";
import NotificationCard from "../../../components/Organism/Card/NotificationCard";
import ActionChipDropdown from "../../../components/Organism/Menu/Exposed Dropdown Menu/ActionChipDropdown";
import { Elevation } from "../../../themes";
import { DUMMY_DATA } from "../../../utils/DummyData";
import useMediaQuery from "../../../utils/useMediaQuery";
import ActionChip from "../../../components/Atom/Selection Control/Chips/ActionChip";

function JobAlert() {
  const [Filter, setFilter] = useState(`Semua`);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const handleClick = (value) => {
    // handle changes from child (ActionChipDropdown)
    setFilter(value);
  };

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
        {isMobile ? 
          <div style={{ display: "flex", gap: "12px", padding: "8px 0 0 16px" }}>
            <ActionChip onClick={() => setFilter(`Semua`)}>Semua</ActionChip>
            <ActionChip onClick={() => setFilter(`Sesuai Profil`)}>Sesuai Profil</ActionChip>
            <ActionChip onClick={() => setFilter(`Sesuai Preferensi`)}>Sesuai Preferensi</ActionChip>
          </div>
          :
          <ActionChipDropdown
            optionList={[`Semua`, `Sesuai Profil`, `Sesuai Preferensi`]}
            handleClick={handleClick}
            chevron
            >
            Filter Berdasarkan
          </ActionChipDropdown>
        }

        <span style={{ marginBottom: 8 }} />
        {DUMMY_DATA.DATA_NOTIFIKASI.map(
          (el, idx) =>
            (((Filter === `Semua` || Filter === `Sesuai Profil`) &&
              el.variant === `Job Alert (Rekomendasi)`) ||
              ((Filter === `Semua` || Filter === `Sesuai Preferensi`) &&
                el.variant === `Job Alert (Preferensi)`)) && (
              <NotificationCard
                key={idx}
                title={el.title}
                description={el.description}
                variant={el.variant}
                timestamp={el.timestamp}
                isRead={el.isRead}
              />
            )
        )}
      </div>
    </>
  );
}

export default JobAlert;
