import React, { useState, useEffect } from "react";
import { Body1 } from "../../../../components/Atom/Typography";
import BottomSheet from "../../../../components/Organism/Bottom Sheet";
import CheckboxButton from "../../../../components/Atom/Selection Control/Checkbox";

export default {
  component: BottomSheet,
  title: "Design System/Organism/Bottom Sheet",
  argTypes: {
    visible: { control: { type: "boolean" } },
    variant: { options: ["modal", "list"], control: { type: "select" } },
    title: { control: { type: "text" } },
    children: { control: { type: "text" } },
    example: { options: [1, 2], control: { type: "select" } },
  },
};

const Template = (args) => {
  const {
    visible,
    variant,
    title,
    children,
    cancelBtnTitle,
    submitBtnTitle,
    onCancel,
    onSubmit,
    items,
    example,
  } = args;

  const [thisOptions, setThisOptions] = useState([]);

  useEffect(() => {
    const newOptions = [];
    for (let i = 0; i < items; i++) {
      newOptions.push(
        example === 1 ? (
          <CheckboxButton
            key={1}
            variant="left"
            options={[{ label: "Title 1", value: "" }]}
            customStyle={{ checkbox: { marginRight: 30 } }}
          />
        ) : (
          <div
            key={1}
            className="d-flex"
            style={{ cursor: `pointer`, gap: 34, padding: `12px 0` }}
          >
            <img src="/images/Principle/Logo/Share.svg" alt="share.svg" />
            <div
              style={{
                fontFamily: "MuseoSans",
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: 0,
                lineHeight: `22px`,
              }}
            >
              Label
            </div>
          </div>
        )
      );
    }
    setThisOptions(newOptions);
  }, [example, items]);
  return (
    <BottomSheet
      visible={visible}
      variant={variant}
      title={title}
      children={children}
      cancelBtnTitle={cancelBtnTitle}
      submitBtnTitle={submitBtnTitle}
      onCancel={onCancel}
      onSubmit={onSubmit}
      options={thisOptions}
    />
  );
};

export const Bottom_Sheet = Template.bind({});

Bottom_Sheet.args = {
  visible: true,
  variant: "list",
  items: 1,
  title: "Title",
  children: null,
  cancelBtnTitle: "CTA",
  submitBtnTitle: "CTA",
  onCancel: true,
  onSubmit: true,
  example: 1,
  // onClose={setShow}
};
