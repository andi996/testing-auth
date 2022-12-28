import React, { useEffect, useRef, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  styled,
  TextField,
} from "@mui/material";
import { Colors, Elevation, Radius } from "../../../../themes";
import { Clear, Search } from "@mui/icons-material";
import { Body1, Body2, Heading4, Heading5 } from "../../Typography";
import Divider from "../../Divider";
import ActionChip from "../../Selection Control/Chips/ActionChip";
import useOutsideAlerter from "../../../../utils/handleClickOutside";
import { selectSingleChild, scrollBar } from "./styles";
import { isMobile } from "../../../../utils/useMediaQuery";

const CostumTextField = styled(TextField)(({ Mobile }) => ({
  "& .MuiInputLabel-root": {
    display: "flex",
    marginTop: "-18px !important",
    alignItems: "center",
  },
  all: `unset`,
  "& .MuiOutlinedInput-root": {
    backgroundColor: `white`,
    boxSizing: `border-box`,
    fontSize: Mobile ? 14 : 16,
    fontWeight: Mobile ? 400 : 500,
    letterSpacing: 0,
    lineHeight: Mobile ? `20px` : `22px`,
    // minWidth: 382,
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
}));

function InputSearchField(props) {
  const {
    disable,
    minWidth,
    fullWidth,
    size = `small`,
    variant,
    onClikJobList,
    onClikCompanyList,
    isEmpty,
    handleChange,
    handleChangeSingle,
    dropdown,
    options,
    handleKeyDown,
    placeholder,
    onChange,
    onChangeOptions,
    inputValue,
    handleClear,
    onClick,
  } = props;
  const [Value, setValue] = useState(``);
  const [Select, setSelect] = useState(true);
  const [rekomendasi, setRekomendasi] = useState(true);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setSelect);
  const [JobList, setJobList] = useState([
    `Admin`,
    `Administrasi`,
    `Administrasi Export`,
    `Administrasi Import`,
    `Administrasi`,
  ]);
  const [Company, setCompany] = useState(`Admin`);
  const [CompanyList, setCompanyList] = useState([
    `Admedia`,
    `Admultimedia`,
    `Adaro Logistic`,
    `Adstra`,
  ]);
  const Mobile = isMobile();

  useEffect(() => {
    handleChange && handleChange(Value);
    if (Value) {
      dropdown == false ? setSelect(false) : setSelect(true);
    } else {
      setSelect(false);
    }
  }, [dropdown, handleChange, Value]);

  useEffect(() => {
    // setValue(``);
  }, [handleKeyDown || handleChangeSingle]);

  return (
    <div
      style={{ position: "relative", width: fullWidth ? "100%" : "auto" }}
      ref={wrapperRef}
      onClick={onClick}
    >
      <CostumTextField
        Mobile={Mobile}
        sx={{
          "& .MuiInputLabel-root": {
            height:
              ((size === `micro` || Mobile) && `32px`) ||
              (size === `small` && `40px`) ||
              (size === `medium` && `48px`) ||
              (size === `large` && `64px`),
          },
          "& .MuiOutlinedInput-root": {
            height:
              ((size === `micro` || Mobile) && `32px`) ||
              (size === `small` && `40px`) ||
              (size === `medium` && `48px`) ||
              (size === `large` && `64px`),
            padding: size === `micro` || Mobile ? "4px" : "12px",
          },
        }}
        disabled={disable}
        value={inputValue || Value}
        onChange={(e) => {
          onChange && onChange(e);
          setValue(e.target.value);
        }}
        onKeyDown={(e) => handleKeyDown && handleKeyDown(e)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: Value.length > 0 && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setValue(``);
                handleClear && handleClear();
              }}
            >
              <InputAdornment position="end">
                <Clear />
              </InputAdornment>
            </div>
          ),
        }}
        size="small"
        fullWidth={fullWidth}
        placeholder={placeholder ? placeholder : "Cari Posisi atau Perusahaan"}
      />
      {Select && (variant === `search` || variant === `search job`) && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            top:
              ((size === `micro` || Mobile) && `40px`) ||
              (size === `small` && `48px`) ||
              (size === `medium` && `56px`) ||
              (size === `large` && `72px`),
            padding: Mobile ? 0 : "16px 24px",
            // marginLeft: Mobile && "-36px",
            zIndex: 13,
            borderRadius: !Mobile && Radius.medium,
            width: Mobile ? "100%" : 618,
            boxShadow: !Mobile && Elevation.modal,
          }}
        >
          {isEmpty ? (
            <>
              <Heading4
                color={Colors.neutral.greyish_brown}
                marginBottom={`8px`}
              >
                Hasil pencarian untuk "{Value}"
              </Heading4>
              <img
                alt=""
                width={120}
                height={120}
                style={{ margin: `auto`, display: `block`, padding: 8 }}
              />
              <Heading4
                color={Colors.neutral.greyish_brown}
                margin={`4px`}
                align={`center`}
              >
                Lowongan & Perusahaan tidak ditemukan
              </Heading4>
              <Body2
                color={Colors.neutral.brown_grey}
                margin={`4px`}
                align={`center`}
              >
                Cari Lowongan Lainya di Karir.com atau coba rekomendasi lowongan
                dibawah
              </Body2>
              <div className="d-flex" style={{ justifyContent: `center` }}>
                <ActionChip size="small">Front End</ActionChip>
                <ActionChip size="small">Back End</ActionChip>
                <ActionChip size="small">Design</ActionChip>
                <ActionChip size="small">UI/UX</ActionChip>
                <ActionChip size="small">Sales</ActionChip>
              </div>
            </>
          ) : (
            <>
              <Heading4
                color={Colors.neutral.greyish_brown}
                marginBottom={`8px`}
              >
                Hasil pencarian untuk "{Value}"
              </Heading4>
              {JobList.map((el) => (
                <>
                  <div className="d-flex pointer">
                    <Body2>{Value}</Body2>
                    <Heading5>{el.substring(Value.length, el.length)}</Heading5>
                  </div>
                  <Divider />
                </>
              ))}
              {variant === `search job` && (
                <>
                  <div className="d-flex" onClick={onClikJobList}>
                    <Body2>{Value}</Body2>
                    <Heading5>
                      {Company.substring(Value.length, Company.length)}
                    </Heading5>

                    <a href="" style={{ textUnderline: `none` }}>
                      <Heading5
                        color={Colors.secondary.clear_blue}
                        marginLeft={`8px`}
                      >
                        cari di perusahaan
                      </Heading5>
                    </a>
                  </div>
                  <Divider />
                  <Heading4
                    color={Colors.neutral.greyish_brown}
                    marginTop={`16px`}
                    marginBottom={`8px`}
                  >
                    Perusahaan
                  </Heading4>
                  {CompanyList.map((el) => (
                    <>
                      <div
                        className="d-flex pointer"
                        onClick={onClikCompanyList}
                      >
                        <img
                          alt=""
                          src="/images/Principle/Logo/Karir/Avatar/Karir=Blue.png"
                          width={32}
                          height={32}
                          style={{ margin: 4 }}
                        />
                        <Body2>{Value}</Body2>
                        <Heading5>
                          {el.substring(Value.length, el.length)}
                        </Heading5>
                      </div>
                      <Divider />
                    </>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}
      {Select && variant === `search function` && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            top:
              ((size === `micro` || Mobile) && `40px`) ||
              (size === `small` && `48px`) ||
              (size === `medium` && `56px`) ||
              (size === `large` && `72px`),
            padding: 5,
            width: `100%`,
            minWidth: minWidth || 380,
            overflow: "auto",
            maxHeight: 240,
            zIndex: 13,
            borderRadius: Radius.medium,
            boxShadow: Elevation.navigationMenu,
          }}
        >
          <style jsx>{selectSingleChild}</style>
          <style jsx>{scrollBar}</style>
          {options?.map((option, index) => {
            return (
              <p
                key={index}
                onClick={() => {
                  handleChangeSingle(option);
                  setSelect(false);
                }}
              >
                {option}
              </p>
            );
          })}
        </div>
      )}

      {Select && variant === `search industry` && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            top:
              (size === `micro` && `40px`) ||
              (size === `small` && `48px`) ||
              (size === `medium` && `56px`) ||
              (size === `large` && `72px`),
            padding: 5,
            width: `100%`,
            minWidth: minWidth || 380,
            overflow: "auto",
            maxHeight: 240,
            zIndex: 13,
            borderRadius: Radius.medium,
            boxShadow: Elevation.navigationMenu,
          }}
        >
          <style jsx>{scrollBar}</style>
          <FormGroup>
            {options.map((option, index) => {
              if (option.includes(inputValue))
                return (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Checkbox color="primary" size="small" />}
                    label={
                      <Body1
                      // style={{
                      //   color: ChekedStatus[0]
                      //     ? Colors.primary.mid_blue
                      //     : Colors.neutral.brown_grey,
                      // }}
                      >
                        {option}
                      </Body1>
                    }
                    onChange={(e) => onChangeOptions(e, option)}
                    // checked={ChekedStatus[0]}
                  />
                );
            })}
          </FormGroup>
        </div>
      )}
    </div>
  );
}

export default InputSearchField;
