import React, { useEffect, useRef, useState } from "react";
import { Autocomplete, Skeleton, styled, TextField } from "@mui/material";
import { Colors, Elevation, Radius } from "../../../themes";
import { ArrowBack, LocationOnOutlined, Search } from "@mui/icons-material";
import { Body1, Body2, Body3, Heading4, Heading5 } from "../../Atom/Typography";
import RectangleButton from "../../Atom/Button/RectangleButton";
import { Hidden, Row } from "react-grid-system";
import Pill from "../../Atom/Selection Control/Pill";
import InputChip from "../../Atom/Selection Control/Chips/InputChip";
import ActionChip from "../../Atom/Selection Control/Chips/ActionChip";
import useOutsideAlerter from "../../../utils/handleClickOutside";
import {
  isMediumScreen,
  isMobile,
  isSmallScreen,
  isTablet,
} from "../../../utils/useMediaQuery";
import InputSearchField from "../../Atom/Input Field/SearchField";
import Divider from "../../Atom/Divider";
import { ListItem } from "../../Organism/Header";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const CostumTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    boxSizing: `border-box`,
    fontSize: 14,
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: `22px`,
    width: 466,
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
    borderRadius: `4px 0 0 4px`,
  },
});

const CostumTextField2 = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    boxSizing: `border-box`,
    fontSize: 14,
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: `22px`,
    width: 204,
    color: Colors.neutral.greyish_brown,
    marginLeft: -1,
    marginRight: -8,
    "& fieldset": {
      borderColor: Colors.neutral.brown_light_grey,
    },
    "&:hover fieldset": {
      borderColor: Colors.neutral.brown_light_grey,
    },
    "&.Mui-focused fieldset": {
      borderColor: Colors.primary.mid_blue,
    },
    borderRadius: 0,
  },
});

export default function SearchBar(props) {
  const {
    disable,
    fullWidth,
    name,
    size = `small`,
    skeleton,
    skeletonChild,
    onButtonClick,
    customStyle,
    // terakhirDilihat,
    riwayatPencarian,
    pencarianPopuler,
    lowongan,
    inputValue = "",
    inputValueLocation = "",
    handleChange,
    handleChangeLocation,
    setSearchValue,
    isEmpty,
    searchResult,
    searchResultLocation,
  } = props;
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();
  const MediumScreen = isMediumScreen();
  const terakhirDilihat = Cookies.get("terakhir_dilihat")
    ? JSON.parse(Cookies.get("terakhir_dilihat"))
    : [];
  const [TerakhirDilihat, setTerakhirDilihat] = useState(true);
  const [RiwayatPencarian, setRiwayatPencarian] = useState(true);
  const [Select, setSelect] = useState(false);
  const [Location, setLocation] = useState(false);
  const wrapperRef = useRef(null);
  const router = useRouter();
  useOutsideAlerter(wrapperRef, setSelect);

  return skeleton ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={
        (size === "large" && 64) ||
        (size === "medium" && 48) ||
        (size === "small" && 40)
      }
      width={690}
      sx={{ borderRadius: Radius.small }}
    />
  ) : (
    <div className="d-flex" style={{ position: "relative" }} ref={wrapperRef}>
      <Autocomplete
        open={false}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          handleChange && handleChange(newInputValue);
        }}
        disabled={disable}
        fullWidth={fullWidth}
        freeSolo
        renderInput={(params) => (
          <CostumTextField
            sx={{
              backgroundColor: Mobile && "white",
              "& label": {
                marginTop: `-10px`,
              },
              "& .MuiOutlinedInput-root": {
                height:
                  (size === `small` && `40px`) ||
                  (size === `medium` && `48px`) ||
                  (size === `large` && `64px`),
                maxWidth:
                  size === `large`
                    ? `322px`
                    : Mobile || Tablet || MediumScreen || SmallScreen
                    ? `261px`
                    : `466px`,

                "& input": {
                  marginLeft: `28px`,
                  marginTop:
                    (size === `small` && `-8px`) ||
                    (size === `medium` && `-4px`) ||
                    (size === `large` && `4px`),
                },
              },
            }}
            {...params}
            name={name}
            placeholder="Posisi atau Perusahaan"
            onClick={() => {
              setSelect(true);
              setLocation(false);
            }}
            label={
              <div
                className="d-flex"
                style={{
                  marginTop:
                    (size === `medium` && `4px`) ||
                    (size === `large` && `14px`),
                }}
              >
                <Search style={{ color: Colors.neutral.brown_grey }} />
                {!inputValue && (
                  <Body1 color={Colors.neutral.brown_light_grey} margin="4px">
                    Posisi atau Perusahaan
                  </Body1>
                )}
              </div>
            }
            InputLabelProps={{ shrink: false }}
          />
        )}
      />
      {!Mobile &&
        (lowongan ? (
          <Hidden xs sm>
            <Autocomplete
              open={false}
              inputValue={inputValueLocation}
              onInputChange={(_, newInputValue) => {
                handleChangeLocation(newInputValue);
              }}
              disabled={disable}
              fullWidth={fullWidth}
              freeSolo
              renderInput={(params) => (
                <CostumTextField2
                  onClick={() => {
                    setSelect(true);
                    setLocation(true);
                  }}
                  sx={{
                    "& label": {
                      marginTop: `-10px`,
                    },
                    "& .MuiOutlinedInput-root": {
                      height:
                        (size === `small` && `40px`) ||
                        (size === `medium` && `48px`) ||
                        (size === `large` && `64px`),
                      "& input": {
                        marginLeft: `28px`,
                        marginTop:
                          (size === `small` && `-8px`) ||
                          (size === `medium` && `-4px`) ||
                          (size === `large` && `4px`),
                      },
                    },
                  }}
                  {...params}
                  name={name}
                  placeholder="Lokasi"
                  label={
                    <div
                      className="d-flex"
                      style={{
                        marginTop:
                          (size === `medium` && `4px`) ||
                          (size === `large` && `14px`),
                      }}
                    >
                      <LocationOnOutlined
                        style={{ color: Colors.neutral.brown_grey }}
                      />
                      {!inputValueLocation && (
                        <Body1
                          color={Colors.neutral.brown_light_grey}
                          margin="4px"
                        >
                          Lokasi
                        </Body1>
                      )}
                    </div>
                  }
                  InputLabelProps={{ shrink: false }}
                />
              )}
            />
          </Hidden>
        ) : (
          <Autocomplete
            open={false}
            inputValue={inputValueLocation}
            onInputChange={(_, newInputValue) => {
              handleChangeLocation(newInputValue);
            }}
            disabled={disable}
            fullWidth={fullWidth}
            freeSolo
            renderInput={(params) => (
              <CostumTextField2
                onClick={() => {
                  setSelect(true);
                  setLocation(true);
                }}
                sx={{
                  "& label": {
                    marginTop: `-10px`,
                  },
                  "& .MuiOutlinedInput-root": {
                    height:
                      (size === `small` && `40px`) ||
                      (size === `medium` && `48px`) ||
                      (size === `large` && `64px`),
                    "& input": {
                      marginLeft: `28px`,
                      marginTop:
                        (size === `small` && `-8px`) ||
                        (size === `medium` && `-4px`) ||
                        (size === `large` && `4px`),
                    },
                  },
                }}
                {...params}
                name={name}
                placeholder="Lokasi"
                label={
                  <div
                    className="d-flex"
                    style={{
                      marginTop:
                        (size === `medium` && `4px`) ||
                        (size === `large` && `14px`),
                    }}
                  >
                    <LocationOnOutlined
                      style={{ color: Colors.neutral.brown_grey }}
                    />
                    {!inputValueLocation && (
                      <Body1
                        color={Colors.neutral.brown_light_grey}
                        margin="4px"
                      >
                        Lokasi
                      </Body1>
                    )}
                  </div>
                }
                InputLabelProps={{ shrink: false }}
              />
            )}
          />
        ))}

      <RectangleButton
        size={
          (size === `small` && `medium`) ||
          (size === `medium` && `large`) ||
          (size === `large` && `xtra large`)
        }
        onClick={onButtonClick}
        zIndex={2}
        customStyle={customStyle}
      >
        Cari
      </RectangleButton>
      {Select && (
        <div
          style={{
            position: Mobile ? "fixed" : "absolute",
            backgroundColor: "white",
            top: Mobile
              ? 0
              : (size === `medium` && `48px`) || (size === `large` && `64px`),
            padding: Mobile ? 16 : "16px 24px",
            zIndex: Mobile ? 100 : 13,
            borderRadius: !Mobile && Radius.medium,
            width: Mobile ? "100%" : 505,
            height: Mobile ? "100vh" : "fit-content",
            overflowY: "auto",
            maxHeight: Location && 425,
            boxShadow: !Mobile && Elevation.modal,
            border: !Mobile && `0.5px solid ` + Colors.neutral.light_grey,
            display: "block",
            left: 0,
          }}
        >
          {Location && searchResultLocation !== null ? (
            searchResultLocation.map((el) => {
              if (
                el.name.toLowerCase().includes(inputValueLocation.toLowerCase())
              )
                return <ListItem key={el.id}>{el.name}</ListItem>;
            })
          ) : (
            <>
              {Mobile && (
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <div
                    onClick={() => {
                      setSearchValue(``);
                      setSelect(false);
                    }}
                  >
                    <ArrowBack
                      color={Colors.neutral.greyish_brown}
                      style={{ height: 24, width: 24 }}
                    />
                  </div>
                  <InputSearchField
                    inputValue={inputValue}
                    handleClear={() => setSearchValue(``)}
                    fullWidth
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              )}
              {inputValue.length < 2 || searchResult == null ? (
                <div>
                  {TerakhirDilihat && (
                    <>
                      <div
                        className="d-flex"
                        style={{
                          justifyContent: `space-between`,
                          marginBottom: 16,
                        }}
                      >
                        {Mobile ? (
                          <Heading5 color={Colors.neutral.greyish_brown}>
                            Terakhir Dilihat
                          </Heading5>
                        ) : (
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Terakhir Dilihat
                          </Heading4>
                        )}
                        {Mobile ? (
                          <Heading5
                            color={Colors.secondary.red}
                            onClick={() => setTerakhirDilihat(false)}
                            style={{ cursor: `pointer` }}
                          >
                            Hapus Semua
                          </Heading5>
                        ) : (
                          <Heading4
                            color={Colors.secondary.red}
                            onClick={() => setTerakhirDilihat(false)}
                            style={{ cursor: `pointer` }}
                          >
                            Hapus Semua
                          </Heading4>
                        )}
                      </div>
                      <Row style={{ margin: 0 }}>
                        {terakhirDilihat.map((el, idx) => (
                          <Pill
                            variant="close"
                            skeleton={skeletonChild}
                            key={idx}
                            onClick={() => router.push(el.url)}
                          >
                            {el.title}
                          </Pill>
                        ))}
                      </Row>
                    </>
                  )}
                  {RiwayatPencarian && (
                    <>
                      <div
                        className="d-flex"
                        style={{
                          justifyContent: `space-between`,
                          margin: `16px 0`,
                        }}
                      >
                        {Mobile ? (
                          <Heading5 color={Colors.neutral.greyish_brown}>
                            Riwayat Pencarian
                          </Heading5>
                        ) : (
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Riwayat Pencarian
                          </Heading4>
                        )}
                        {Mobile ? (
                          <Heading5
                            color={Colors.secondary.red}
                            onClick={() => setRiwayatPencarian(false)}
                            style={{ cursor: `pointer` }}
                          >
                            Hapus Semua
                          </Heading5>
                        ) : (
                          <Heading4
                            color={Colors.secondary.red}
                            onClick={() => setRiwayatPencarian(false)}
                            style={{ cursor: `pointer` }}
                          >
                            Hapus Semua
                          </Heading4>
                        )}
                      </div>
                      <Row style={{ margin: 0 }}>
                        {riwayatPencarian.map((el, idx) => (
                          <InputChip
                            size="small"
                            skeleton={skeletonChild}
                            key={idx}
                          >
                            {el}
                          </InputChip>
                        ))}
                      </Row>
                    </>
                  )}
                  <div
                    className="d-flex"
                    style={{
                      justifyContent: `space-between`,
                      margin: `16px 0`,
                    }}
                  >
                    {Mobile ? (
                      <Heading5 color={Colors.neutral.greyish_brown}>
                        Pencarian Populer
                      </Heading5>
                    ) : (
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Pencarian Populer
                      </Heading4>
                    )}
                  </div>
                  <Row
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexFlow: `row wrap`,
                      margin: 0,
                    }}
                  >
                    {pencarianPopuler !== null &&
                      pencarianPopuler.map((el, idx) => (
                        <ActionChip
                          size="small"
                          skeleton={skeletonChild}
                          key={idx}
                        >
                          {el.keyword}
                        </ActionChip>
                      ))}
                  </Row>
                </div>
              ) : (
                <div
                  style={{
                    padding: isEmpty ? "0 48px" : 0,
                    width: "100%",
                  }}
                >
                  {isEmpty ? (
                    <>
                      <Heading4
                        color={Colors.neutral.greyish_brown}
                        marginBottom="8px"
                        align="left"
                        marginLeft="-64px"
                      >
                        Hasil pencarian untuk "{inputValue}"
                      </Heading4>
                      <img
                        alt=""
                        width={120}
                        height={120}
                        style={{ margin: `auto`, display: `block`, padding: 8 }}
                        src="/images/Principle/Illustration/empty-search-vacancy.png"
                      />
                      <Heading5
                        color={Colors.neutral.greyish_brown}
                        marginBottom="8px"
                        align="center"
                      >
                        Lowongan & Perusahaan tidak ditemukan
                      </Heading5>
                      <Body3
                        color={Colors.neutral.brown_grey}
                        marginBottom="24px"
                        align="center"
                      >
                        Cari Lowongan Lainya di Karir.com atau coba rekomendasi
                        lowongan dibawah
                      </Body3>
                      <div
                        className="d-flex"
                        style={{
                          justifyContent: `center`,
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
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
                        marginBottom="8px"
                      >
                        Hasil pencarian untuk "{inputValue}"
                      </Heading4>
                      {searchResult.job_position !== null &&
                        searchResult.job_position.map((el) => (
                          <>
                            <div className="d-flex pointer">
                              <Heading5>
                                {el.substring(
                                  0,
                                  el
                                    .toLowerCase()
                                    .indexOf(inputValue.toLowerCase())
                                )}
                              </Heading5>
                              <Body2>{inputValue}</Body2>
                              <Heading5>
                                {el.substring(
                                  el
                                    .toLowerCase()
                                    .indexOf(inputValue.toLowerCase()) +
                                    inputValue.length,
                                  el.length
                                )}
                              </Heading5>
                            </div>
                            <Divider />
                          </>
                        ))}
                      {searchResult.job_position !== null && (
                        <div className="d-flex">
                          <Heading5>
                            {searchResult.job_position[0].substring(
                              0,
                              searchResult.job_position[0]
                                .toLowerCase()
                                .indexOf(inputValue.toLowerCase())
                            )}
                          </Heading5>
                          <Body2>{inputValue}</Body2>
                          <Heading5>
                            {searchResult.job_position[0].substring(
                              searchResult.job_position[0]
                                .toLowerCase()
                                .indexOf(inputValue.toLowerCase()) +
                                inputValue.length,
                              searchResult.job_position[0].length
                            )}
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
                      )}
                      <Divider />
                      <Heading4
                        color={Colors.neutral.greyish_brown}
                        marginTop={`16px`}
                        marginBottom={`8px`}
                      >
                        Perusahaan
                      </Heading4>
                      {searchResult.companies !== null &&
                        searchResult.companies.map((el) => (
                          <>
                            <div className="d-flex pointer">
                              <img
                                alt=""
                                src={el.logo_url}
                                width={32}
                                height={32}
                                style={{ margin: 4, objectFit: "cover" }}
                              />
                              {console.log(
                                el.name
                                  .toLowerCase()
                                  .indexOf(inputValue.toLowerCase())
                              )}
                              <Heading5>
                                {el.name.substring(
                                  0,
                                  el.name
                                    .toLowerCase()
                                    .indexOf(inputValue.toLowerCase())
                                )}
                              </Heading5>
                              <Body2>{inputValue}</Body2>
                              <Heading5>
                                {el.name.substring(
                                  el.name
                                    .toLowerCase()
                                    .indexOf(inputValue.toLowerCase()) +
                                    inputValue.length,
                                  el.name.length
                                )}
                              </Heading5>
                            </div>
                            <Divider />
                          </>
                        ))}
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
