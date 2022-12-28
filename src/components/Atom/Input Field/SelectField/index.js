import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import InputSearchField from "../SearchField";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import { Colors, Radius, Elevation } from "../../../../themes";
import { Error, KeyboardArrowDown } from "@mui/icons-material";
import { selectSingleChild, scrollBar } from "./styles";
import { Body1, Body3, Small } from "../../Typography";
import useOutsideAlerter from "../../../../utils/handleClickOutside";
import { isMobile } from "../../../../utils/useMediaQuery";
import BottomSheet from "../../../Organism/Bottom Sheet";

const CostumTextField = styled(TextField)(
  ({ minWidth, Mobile, fullWidth }) => ({
    "& label.Mui-focused": {
      color: Colors.primary.mid_blue,
    },
    "& label": {
      backgroundColor: "white",
      zIndex: 3,
      fontWeight: Mobile ? 400 : 500,
      fontSize: Mobile ? 14 : 16,
      letterSpacing: 0,
      lineHeight: Mobile ? `20px` : `22px`,
    },
    "& .MuiOutlinedInput-root": {
      fontSize: Mobile ? 14 : 16,
      fontWeight: Mobile ? 400 : 500,
      letterSpacing: 0,
      lineHeight: Mobile ? `20px` : `22px`,
      height: 40,
      minWidth: minWidth || 382,
      zIndex: 2,
      backgroundColor: "white",
      color: Colors.neutral.greyish_brown,
      paddingRight: `40px`,
      "& fieldset": {
        borderColor: Colors.neutral.brown_light_grey,
      },
      "& label": {
        backgroundColor: "white",
        zIndex: 3,
        fontWeight: Mobile ? 400 : 500,
        fontSize: Mobile ? 14 : 16,
        letterSpacing: 0,
        lineHeight: Mobile ? `20px` : `22px`,
      },
      "& .MuiOutlinedInput-root": {
        fontSize: Mobile ? 14 : 16,
        fontWeight: Mobile ? 400 : 500,
        letterSpacing: 0,
        lineHeight: Mobile ? `20px` : `22px`,
        height: 40,
        minWidth: !fullWidth && (minWidth || 382),
        zIndex: 2,
        backgroundColor: "white",
        color: Colors.neutral.greyish_brown,
        "& fieldset": {
          borderColor: Colors.neutral.brown_light_grey,
        },
        "&:hover fieldset": {
          borderColor: Colors.neutral.brown_light_grey,
        },
        "&.Mui-focused fieldset": {
          borderColor: Colors.primary.mid_blue,
        },
      },
      "& .Mui-error": {
        color: Colors.secondary.red,
        "& svg": {
          color: Colors.secondary.red,
        },
      },
      "& .MuiSelect-icon": {
        opacity: 0,
      },
    },
  })
);

function InputSelectField(props) {
  const {
    disable,
    label,
    defaultValue,
    helperText,
    fullWidth,
    name,
    error,
    multiple,
    minWidth,
    options,
    handleChange,
  } = props;
  const [Value, setValue] = useState("");
  const [Select, setSelect] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [checkedList, setCheckedList] = useState([]);

  const wrapperRef = useRef(null);
  const Mobile = isMobile();
  useOutsideAlerter(wrapperRef, setSelect);

  function handleChangeSingle(item) {
    setValue(item?.label);
    handleChange(item?.value);
    setSelect(false);
  }

  const handleCheck = (e, item) => {
    if (e.target.checked) {
      let newChecked = [...checkedList];
      newChecked.push({ label: item?.label, value: item.value });
      setCheckedList(newChecked);
      setValue(newChecked?.map((item) => item?.label).join(", "));
      handleChange(newChecked?.map((item) => item?.value));
    } else {
      const newChecked = checkedList?.filter((x) => x?.value !== item.value);
      setCheckedList(newChecked);
      setValue(newChecked?.map((item) => item?.label).join(", "));
      handleChange(newChecked?.map((item) => item?.value));
    }
  };

  useEffect(() => {
    setSearchValue("");
  }, [Select]);

  useEffect(() => {
    disable && setValue("");
  }, [disable]);

  useEffect(() => {
    if (defaultValue) {
      let newChecked = [];
      options?.map((item) => {
        if (defaultValue.includes(item.value))
          newChecked.push({ label: item?.label, value: item.value });
      });
      setCheckedList(newChecked);
      setValue(newChecked?.map((item) => item?.label).join(", "));
      handleChange(newChecked?.map((item) => item?.value));
    }
    // console.log(defaultValue);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={wrapperRef}>
      <CostumTextField
        autoComplete="off"
        Mobile={Mobile}
        error={error}
        onClick={() => {
          setSelect(true);
        }}
        disabled={disable}
        name={name}
        label={label}
        // defaultValue={defaultValue}
        value={Value}
        onChange={(e) => {
          if (!Mobile && !multiple) {
            setValue(e.target.value);
            setSearchValue(e.target.value);
          }
        }}
        InputProps={{
          readOnly: multiple,
          endAdornment: (
            <div style={{ cursor: "pointer", position: "absolute", right: 10 }}>
              <InputAdornment>
                <KeyboardArrowDown />
              </InputAdornment>
            </div>
          ),
        }}
        helperText={
          <div
            className="d-flex"
            style={{ justifyContent: "space-between", margin: "0 -13px" }}
          >
            {error ? (
              <>
                <Error
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
                <div>
                  {Mobile ? (
                    <Small>{helperText}</Small>
                  ) : (
                    <Body3>{helperText}</Body3>
                  )}
                </div>
              </>
            ) : Mobile ? (
              <Small>{helperText}</Small>
            ) : (
              <Body3>{helperText}</Body3>
            )}
          </div>
        }
        size="small"
        fullWidth={fullWidth}
        minWidth={minWidth}
      />

      {/* Dropdown / BottomSheet */}
      {(!disable && Select && !multiple && (
        <>
          {Mobile ? (
            <BottomSheet
              visible={Select}
              onClose={() => setSelect(false)}
              search={options?.length > 5 && true}
            >
              {options?.length > 5 && (
                <InputSearchField
                  placeholder="Cari.."
                  fullWidth
                  onChange={(e) => setSearchValue(e.target.value)}
                  handleClear={() => setSearchValue("")}
                />
              )}
              {options?.map((item, index) => {
                return searchValue ? (
                  item?.label
                    ?.toLowerCase()
                    .includes(searchValue?.toLowerCase()) && (
                    <Box
                      key={index}
                      className="d-flex pointer"
                      gap="32px"
                      py="16px"
                      onClick={() => handleChangeSingle(item)}
                    >
                      <Body1>{item?.label}</Body1>
                    </Box>
                  )
                ) : (
                  <Box
                    key={index}
                    className="d-flex pointer"
                    gap="32px"
                    py="16px"
                    onClick={() => handleChangeSingle(item)}
                  >
                    <Body1>{item?.label}</Body1>
                  </Box>
                );
              })}
            </BottomSheet>
          ) : (
            <div
              style={{
                position: "absolute",
                backgroundColor: "white",
                top: 46,
                padding: 5,
                minWidth: minWidth || 375,
                width: fullWidth ? `100%` : 374,
                overflow: "auto",
                maxHeight: 240,
                zIndex: 10,
                borderRadius: Radius.medium,
                boxShadow: Elevation.modal,
                border: "0.5px solid #D2D2D2",
              }}
            >
              <style jsx>{selectSingleChild}</style>
              <style jsx>{scrollBar}</style>

              {options?.map((item, index) => {
                return searchValue ? (
                  item?.label
                    ?.toLowerCase()
                    .includes(searchValue?.toLowerCase()) && (
                    <p
                      key={index}
                      style={{
                        backgroundColor:
                          item.label == Value ? Colors.primary.mid_blue : null,
                        color: item.label == Value ? "white" : null,
                        borderRadius: "8px",
                      }}
                      onClick={() => handleChangeSingle(item)}
                    >
                      {item.label}
                    </p>
                  )
                ) : (
                  <p
                    key={index}
                    style={{
                      backgroundColor:
                        item.label == Value ? Colors.primary.mid_blue : null,
                      color: item.label == Value ? "white" : null,
                      borderRadius: "8px",
                    }}
                    onClick={() => handleChangeSingle(item)}
                  >
                    {item.label}
                  </p>
                );
              })}
            </div>
          )}
        </>
      )) ||
        (!disable && Select && multiple && (
          <>
            {Mobile ? (
              <BottomSheet
                visible={true}
                onClose={() => setSelect(false)}
                search={options?.length > 5 && true}
              >
                {options?.length > 5 && (
                  <Box mt="8px" mb="4px">
                    <InputSearchField
                      placeholder="Cari.."
                      fullWidth
                      onChange={(e) => setSearchValue(e.target.value)}
                      handleClear={() => setSearchValue("")}
                    />
                  </Box>
                )}
                {options?.map((item, index) => {
                  return searchValue ? (
                    item?.label
                      ?.toLowerCase()
                      .includes(searchValue?.toLowerCase()) && (
                      <Box
                        key={index}
                        className="d-flex"
                        gap="32px"
                        py="16px"
                        color={
                          checkedList?.find((x) => x?.value === item?.value)
                            ? Colors.primary.mid_blue
                            : Colors.neutral.brown_grey
                        }
                      >
                        <Checkbox
                          defaultChecked={checkedList?.find(
                            (x) => x?.value === item?.value
                          )}
                          value={item?.value}
                          onChange={(e) => handleCheck(e, item)}
                          sx={{ padding: 0 }}
                        />
                        <Body1>{item.label}</Body1>
                      </Box>
                    )
                  ) : (
                    <Box
                      key={index}
                      className="d-flex"
                      gap="32px"
                      py="16px"
                      color={
                        checkedList?.find((x) => x?.value === item?.value)
                          ? Colors.primary.mid_blue
                          : Colors.neutral.brown_grey
                      }
                    >
                      <Checkbox
                        defaultChecked={checkedList?.find(
                          (x) => x?.value === item?.value
                        )}
                        value={item?.value}
                        onChange={(e) => handleCheck(e, item)}
                        sx={{ padding: 0 }}
                      />
                      <Body1>{item.label}</Body1>
                    </Box>
                  );
                })}
              </BottomSheet>
            ) : (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  top: 44,
                  padding: 5,
                  minWidth: minWidth || 380,
                  width: fullWidth ? `100%` : `fit-content`,
                  maxWidth: "100%",
                  overflow: "auto",
                  maxHeight: 240,
                  zIndex: 1000,
                  borderRadius: Radius.medium,
                  boxShadow: Elevation.modal,
                  border: "0.5px solid #D2D2D2",
                }}
              >
                <style jsx>{scrollBar}</style>
                {options?.length > 5 && (
                  <Box mb="8px">
                    <InputSearchField
                      placeholder="Cari.."
                      fullWidth
                      onChange={(e) => setSearchValue(e.target.value)}
                      handleClear={() => setSearchValue("")}
                    />
                  </Box>
                )}
                {options?.map((item, index) => {
                  return searchValue ? (
                    item?.label
                      ?.toLowerCase()
                      .includes(searchValue?.toLowerCase()) && (
                      <Box
                        key={index}
                        className="d-flex"
                        gap="4px"
                        py="8px"
                        color={
                          checkedList?.find((x) => x?.value === item?.value)
                            ? Colors.primary.mid_blue
                            : Colors.neutral.brown_grey
                        }
                      >
                        <Checkbox
                          defaultChecked={checkedList?.find(
                            (x) => x?.value === item?.value
                          )}
                          value={item?.value}
                          onChange={(e) => handleCheck(e, item)}
                          sx={{ padding: 0 }}
                        />
                        <Body1>{item.label}</Body1>
                      </Box>
                    )
                  ) : (
                    <Box
                      key={index}
                      className="d-flex"
                      gap="4px"
                      py="8px"
                      color={
                        checkedList?.find((x) => x?.value === item?.value)
                          ? Colors.primary.mid_blue
                          : Colors.neutral.brown_grey
                      }
                    >
                      <Checkbox
                        defaultChecked={checkedList?.find(
                          (x) => x?.value === item?.value
                        )}
                        value={item?.value}
                        onChange={(e) => handleCheck(e, item)}
                        sx={{ padding: 0 }}
                      />
                      <Body1>{item.label}</Body1>
                    </Box>
                  );
                })}

                {/* <FormGroup>
                  <FormControlLabel
                    value="bike"
                    control={<Checkbox color="primary" size="small" />}
                    label={
                      <Body1
                        style={{
                          color: ChekedStatus[0]
                            ? Colors.primary.mid_blue
                            : Colors.neutral.brown_grey,
                        }}
                      >
                        I have a bike
                      </Body1>
                    }
                    onChange={(e) => chekCheked(e, 0)}
                    checked={ChekedStatus[0]}
                  />
                  <FormControlLabel
                    value="car"
                    control={<Checkbox color="primary" size="small" />}
                    label={
                      <Body1
                        style={{
                          color: ChekedStatus[1]
                            ? Colors.primary.mid_blue
                            : Colors.neutral.brown_grey,
                        }}
                      >
                        I have a car
                      </Body1>
                    }
                    onChange={(e) => chekCheked(e, 1)}
                    checked={ChekedStatus[1]}
                  />
                  <FormControlLabel
                    value="boat"
                    control={<Checkbox color="primary" size="small" />}
                    label={
                      <Body1
                        style={{
                          color: ChekedStatus[2]
                            ? Colors.primary.mid_blue
                            : Colors.neutral.brown_grey,
                        }}
                      >
                        I have a boat
                      </Body1>
                    }
                    onChange={(e) => chekCheked(e, 2)}
                    checked={ChekedStatus[2]}
                  />
                </FormGroup> */}
              </div>
            )}
          </>
        ))}
    </div>
  );
}
export default InputSelectField;
