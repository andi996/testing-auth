import React from "react";
import InputPasswordField from "../../../../components/Atom/Input Field/PasswordField";
import InputPrefixRp from "../../../../components/Atom/Input Field/Prefix/PrefixRp";
import InputSelectField from "../../../../components/Atom/Input Field/SelectField";
import InputTextArea from "../../../../components/Atom/Input Field/TextArea";
import InputTextField from "../../../../components/Atom/Input Field/TextField";
import OTPField from "../../../../components/Atom/Input Field/OTPField";
import InputSearchField from "../../../../components/Atom/Input Field/SearchField";
import InputAvatarField from "../../../../components/Atom/Input Field/AvatarField";
import InputPictureField from "../../../../components/Atom/Input Field/PictureField";

export default {
  component: InputTextField,
  component: InputSelectField,
  component: InputTextArea,
  component: InputPrefixRp,
  component: InputPasswordField,
  component: OTPField,
  component: InputSearchField,
  component: InputAvatarField,
  component: InputPictureField,
  title: "Design System/Atom/Input Field",
  argTypes: {
    disable: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "boolean" },
    },
    helperText: {
      control: { type: "text" },
    },
    size: {
      options: ["large", "medium", "small", "micro"],
      control: { type: "select" },
    },
    variant: {
      options: ["search job", "search form"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => (
  <InputTextField {...args}>{args.label}</InputTextField>
);
const Template2 = (args) => (
  <InputSelectField {...args}>{args.label}</InputSelectField>
);
const Template3 = (args) => (
  <InputTextArea {...args}>{args.label}</InputTextArea>
);
const Template4 = (args) => (
  <InputPrefixRp {...args}>{args.label}</InputPrefixRp>
);
const Template5 = (args) => (
  <InputPasswordField {...args}>{args.label}</InputPasswordField>
);
const Template6 = (args) => <OTPField {...args}>{args.label}</OTPField>;
const Template7 = (args) => (
  <InputSearchField {...args}>{args.label}</InputSearchField>
);
const Template8 = (args) => (
  <InputAvatarField {...args}>{args.label}</InputAvatarField>
);
const Template9 = (args) => (
  <InputPictureField {...args}>{args.label}</InputPictureField>
);

export const Text_Field = Template.bind({});
export const Select_Field = Template2.bind({});
export const Text_Area = Template3.bind({});
export const Prefix_Rp = Template4.bind({});
export const Password_Field = Template5.bind({});
export const OTP_Field = Template6.bind({});
export const Search_Field = Template7.bind({});
export const Avatar_Field = Template8.bind({});
export const Picture_Field = Template9.bind({});

Text_Field.args = {
  label: "Title",
  helperText: "Please make it brief enough to be contained in two lines max :)",
  icon: false,
  characterCount: false,
};

Select_Field.args = {
  label: "Title",
  helperText: "Please make it brief enough to be contained in two lines max :)",
  minWidth: 370,
  multiple: false,
  options: [
    { label: "Kreatif", value: "Kreatif" },
    { label: "Administration", value: "Administration" },
    {
      label: "Engineer, Agricultural",
      value: "Engineer, Agricultural",
    },
    { label: "Arsitek", value: "Arsitek" },
    { label: "Chemist", value: "Chemist" },
    {
      label: "Banking Operations",
      value: "Banking Operations",
    },
    { label: "General Affairs", value: "General Affairs" },
    {
      label: "Product Development",
      value: "Product Development",
    },
  ],
};

Text_Area.args = {
  label: "Title",
  helperText: "Please make it brief enough to be contained in two lines max :)",
  characterCount: 100,
  disable: false,
  error: false,
};

Prefix_Rp.args = {
  label: "Title",
  helperText: "Please make it brief enough to be contained in two lines max :)",
};

Password_Field.args = {
  label: "Title",
  helperText: "Please make it brief enough to be contained in two lines max :)",
  passwordStrength: false,
};

OTP_Field.args = {
  helperText: undefined,
  label: undefined,
};

Avatar_Field.args = {
  helperText: undefined,
  label: undefined,
  skeleton: false,
  loader: false,
  value: `https://awsimages.detik.net.id/community/media/visual/2021/08/22/tes-psikologi.jpeg?w=700&q=90`,
};

Picture_Field.args = {
  helperText: undefined,
  label: undefined,
  size: undefined,
  value: `https://awsimages.detik.net.id/community/media/visual/2021/08/22/tes-psikologi.jpeg?w=700&q=90`,
};

Search_Field.args = {
  helperText: undefined,
  label: "Cari posisi atau perahaan",
  options: [
    { label: "The Godfather", id: 1 },
    { label: "Pulp Fiction", id: 2 },
  ],
  isEmpty: false,
};
