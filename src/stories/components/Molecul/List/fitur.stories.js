import React, { useState } from "react";
import ListFitur from "../../../../components/Molecul/List/Fitur";

export default {
  component: ListFitur,
  title: "Design System/Molecul/List",
};

const Template = () => {
  const [selected, setSelected] = useState(0);
  return (
    <ListFitur
      lists={[
        {
          image: "/images/Principle/Illustration/Landing-Steps/1.png",
          title: `Temukan pekerjaan Impian Anda`,
          desc: `berdasarkan preferensi dan rekomendasi kami setelah mendaftar di Karir.com.`,
        },
        {
          image: "/images/Principle/Illustration/Landing-Steps/1.png",
          title: `Temukan pekerjaan Impian Anda`,
          desc: `berdasarkan preferensi dan rekomendasi kami setelah mendaftar di Karir.com.`,
        },
      ]}
      selected={selected}
      setSelected={setSelected}
    />
  );
};

export const Fitur_ = Template.bind({});

Fitur_.args = {};
