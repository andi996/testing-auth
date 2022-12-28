import React, { useRef, useState, useMemo, useEffect } from "react";

import useOutsideAlerter from "../../../../utils/handleClickOutside";

import ActionChip from "../../../Atom/Selection Control/Chips/ActionChip";
import { Skeleton, Slider } from "@mui/material";
import { Colors, Elevation, Radius } from "../../../../themes";
import { Body1, Body2, Heading3 } from "../../../../components/Atom/Typography";
import { styled } from "@mui/system";
import RectangleButton from "../../../Atom/Button/RectangleButton";
import InputSearchField from "../../../Atom/Input Field/SearchField";
import SliderComponent from "../../../Atom/Selection Control/Slider";
import { isMobile } from "../../../../utils/useMediaQuery";
import BottomSheet from "../../Bottom Sheet";

const DropDownList = styled("ul")`
  position: fixed;
  background-color: white;
  min-width: 144px;
  width: max-content;
  overflow: auto;
  box-shadow: ${Elevation.navigationMenu};
  border: 0.5px solid #d2d2d2;
  z-index: 100;
  height: fit-content;
  margin: 8px;

  list-style: none;
  padding: 4px;
  border-radius: ${Radius.medium};
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }
`;

const ListItem = styled("li")`
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    color: ${Colors.neutral.brown_grey} 

    :active {
      background-color: ${Colors.primary.mid_blue};
      color: white;
      border-radius: 8px;
    }

    :hover {
      background-color: ${Colors.primary.very_light_blue};
      color: ${Colors.primary.mid_blue};
      border-radius: 8px;
    }

    &.active {
      background-color: ${Colors.primary.mid_blue};
      color: white;
      border-radius: 8px;
    }
  `;

const RangeContainer = styled("div")`
  position: fixed;
  // right: 0;
  margin-top: 8px;
  width: 382px;
  height: 250px;
  display: flex;
  flex-direction: column;
  z-index: 12;
  background: white;
  box-shadow: ${Elevation.navigationMenu};
  border: 0.5px solid #d2d2d2;
  border-radius: ${Radius.medium};
  padding: 16px;
`;

function ActionChipDropdown(props) {
  const {
    disable,
    size = "medium",
    icon,
    chevron,
    children,
    onClick,
    skeleton,
    optionList,
    range,
    search,
    handleClick,
  } = props;

  const [value, setValue] = React.useState(null);
  const [minValue, setMinValue] = useState(1000000);
  const [maxValue, setMaxValue] = useState(500000000);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelected, setIsSelected] = useState(null);
  const [InputValue, setInputValue] = useState(``);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsOpen);

  const toggling = () => setIsOpen(!isOpen);
  const Mobile = isMobile();

  const onOptionClicked = (val) => () => {
    setSelectedOption(val);
    if (val == value) {
      setIsSelected(!isSelected);
    } else {
      setIsSelected(true);
    }
    setValue(val);
    setIsOpen(false);
    handleClick && handleClick(val);
  };

  function handleChangeSingle(val) {
    setIsSelected(true);
    setValue(val);
    setIsOpen(false);
  }

  return skeleton ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={(size === "medium" && "40px") || (size === "small" && "32px")}
      width="100px"
      sx={{ borderRadius: Radius.large, margin: "4px" }}
    />
  ) : (
    <>
      <div
        className="dropdown"
        ref={wrapperRef}
        style={{ position: `relative` }}
      >
        <ActionChip
          skeleton={skeleton}
          disable={disable}
          icon={icon}
          size={size}
          chevron={chevron}
          onClick={toggling}
          isOpen={isOpen}
          active={isSelected}
        >
          {value && isSelected ? value : children}
        </ActionChip>

        {isOpen && range ? (
          Mobile ? (
            <BottomSheet
              variant="modal"
              submitBtnTitle="Terapkan"
              visible={isOpen}
              onClose={() => setIsOpen(false)}
              title="Range Gaji"
              fixed
            >
              <SliderComponent
                min={1000000}
                max={500000000}
                onChange={({ min, max }) => {
                  setMinValue(min);
                  setMaxValue(max);
                }}
              />
            </BottomSheet>
          ) : (
            <div style={{ position: `absolute`, right: "376px" }}>
              <RangeContainer>
                <Heading3
                  color={Colors.neutral.greyish_brown}
                  marginBottom={`16px`}
                >
                  Range Gaji
                </Heading3>
                <SliderComponent
                  min={1000000}
                  max={500000000}
                  onChange={({ min, max }) => {
                    setMinValue(min);
                    setMaxValue(max);
                  }}
                />

                <RectangleButton fullWidth customStyle={{ margin: 0 }}>
                  Terapkan
                </RectangleButton>
              </RangeContainer>
            </div>
          )
        ) : isOpen && search ? (
          Mobile ? (
            <BottomSheet
              visible={isOpen}
              onClose={() => setIsOpen(false)}
              search={
                <InputSearchField
                  fullWidth
                  variant={`search function`}
                  InputValue={InputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  // handleChangeSingle={handleChangeSingle}
                />
              }
            >
              {optionList.map((option, idx) => {
                if (option.includes(InputValue))
                  return (
                    <ListItem
                      key={idx}
                      onClick={onOptionClicked(option)}
                      className={
                        option == selectedOption && isSelected ? "active" : null
                      }
                    >
                      {Mobile ? (
                        <Body1>{option}</Body1>
                      ) : (
                        <Body2>{option}</Body2>
                      )}
                    </ListItem>
                  );
              })}
            </BottomSheet>
          ) : (
            <div style={{ position: `absolute`, left: 0 }}>
              <div style={{ position: `fixed`, margin: 8, zIndex: 12 }}>
                <InputSearchField
                  variant={`search function`}
                  handleChangeSingle={handleChangeSingle}
                />
              </div>
            </div>
          )
        ) : isOpen ? (
          Mobile ? (
            <BottomSheet visible={isOpen} onClose={() => setIsOpen(false)}>
              {optionList.map((option, idx) => (
                <ListItem
                  key={idx}
                  onClick={onOptionClicked(option)}
                  className={
                    option == selectedOption && isSelected ? "active" : null
                  }
                >
                  {Mobile ? <Body1>{option}</Body1> : <Body2>{option}</Body2>}
                </ListItem>
              ))}
            </BottomSheet>
          ) : (
            <div style={{ position: `absolute`, right: "150px" }}>
              <DropDownList>
                {optionList.map((option, idx) => (
                  <ListItem
                    key={idx}
                    onClick={onOptionClicked(option)}
                    className={
                      option == selectedOption && isSelected ? "active" : null
                    }
                  >
                    {Mobile ? <Body1>{option}</Body1> : <Body2>{option}</Body2>}
                  </ListItem>
                ))}
              </DropDownList>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ActionChipDropdown;
