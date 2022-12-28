import React from "react";
import SearchBar from "../../../../components/Molecul/SearchBar";
import SearchBarCompany from "../../../../components/Molecul/SearchBar/SearchBarCompany";

export default {
  component: SearchBar,
  component: SearchBarCompany,
  title: "Design System/Molecul/SearchBar",
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <SearchBar {...args} />;
const Template2 = (args) => (
  <SearchBarCompany {...args} onCloseChips={() => console.log(`close chip`)} />
);

export const Search_Bar = Template.bind({});
export const Search_Bar_Company = Template2.bind({});

Search_Bar.args = {
  skeleton: false,
  options: [
    { label: "xxx", id: 1 },
    { label: "zzz", id: 2 },
  ],
  options2: [
    { label: "xxx", id: 1 },
    { label: "zzz", id: 2 },
  ],
  terakhirDilihat: [
    "UI/UX Designer",
    "PT. Qerja Manfaat",
    "Head of Product Design",
    "Karir.com",
  ],
  riwayatPencarian: ["Product Manager", "Tokopedia", "Gojek", "UI/UX Designer"],
  pencarianPopuler: [
    "Sales",
    "Administrasi",
    "UI/UX",
    "Marketing",
    "Acounting",
    "Product Manager",
  ],
};

Search_Bar_Company.args = {
  skeleton: false,
  options: [
    { label: "xxx", id: 1 },
    { label: "zzz", id: 2 },
  ],
  options2: [
    { label: "xxx", id: 1 },
    { label: "zzz", id: 2 },
  ],
  company: "Microsoft",
};
