import * as React from "react";
import clsx from "clsx";
import { styled } from "@mui/system";
import { Colors } from "../../../themes";
import { Skeleton } from "@mui/material";
import { useSwitch } from "@mui/base";

const BasicSwitchRoot = styled("span")`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background: ${Colors.neutral.light_grey};
  border-radius: 10px;
  margin: 4px;
  cursor: pointer;

  &.Switch-disabled {
    cursor: not-allowed;
    background: ${Colors.neutral.very_light_grey};
  }

  &.Switch-checked {
    background: ${Colors.primary.mid_blue};
  }
`;

const BasicSwitchInput = styled("input")`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;

const BasicSwitchThumb = styled("span")`
  display: block;
  width: 16px;
  height: 16px;
  top: 2px;
  left: 2px;
  border-radius: 16px;
  background-color: #fff;
  position: relative;
  transition: all 200ms ease;

  &.Switch-focusVisible {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.Switch-checked {
    left: 22px;
    top: 2px;
    background-color: #fff;
  }
`;

function BasicSwitch(props) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    "Switch-checked": checked,
    "Switch-disabled": disabled,
    "Switch-focusVisible": focusVisible,
  };

  return (
    <BasicSwitchRoot className={clsx(stateClasses)}>
      <BasicSwitchThumb className={clsx(stateClasses)} />
      <BasicSwitchInput {...getInputProps()} aria-label="Demo switch" />
    </BasicSwitchRoot>
  );
}

export default function Switch(props) {
  const { active, disable, skeleton, value, onChange, checked } = props;

  return skeleton ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height="20px"
      width="40px"
      sx={{ borderRadius: "10px", margin: "4px" }}
    />
  ) : (
    <BasicSwitch
      disabled={disable}
      defaultChecked={active}
      value={value}
      onChange={onChange}
      checked={checked}
    />
  );
}
