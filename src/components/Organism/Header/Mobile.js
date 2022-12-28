import { ArrowBack, Search, CloseRounded } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { Row } from "react-grid-system";
import { useDispatch, useSelector } from "react-redux";
import { getAutoCompleteSearch } from "../../../redux/action/LandingActions";
import { Colors, Elevation, Radius } from "../../../themes";
import useOutsideAlerter from "../../../utils/handleClickOutside";
import { isMobile } from "../../../utils/useMediaQuery";
import Notification from "../../Atom/Badge/Notification";
import Divider from "../../Atom/Divider";
import InputSearchField from "../../Atom/Input Field/SearchField";
import Logo from "../../Atom/Logo";
import ActionChip from "../../Atom/Selection Control/Chips/ActionChip";
import InputChip from "../../Atom/Selection Control/Chips/InputChip";
import Pill from "../../Atom/Selection Control/Pill";
import { Body2, Body3, Heading4, Heading5 } from "../../Atom/Typography";

export default function MobileHeader(props) {
  const {
    variant,
    type,
    search = false,
    title,
    setDashboard,
    dashboard,
    setProfile,
    profile,
    wrapperRef,
    isEmpty,
    skeletonChild,
    placeholder,
    onClickArrowBack,
    handleChange,
    riwayatPencarian,
    terakhirDilihat,
    handleSubmitSearch,
    onDeleteRiwayat,
    searchResult,
    page,
  } = props;
  const [Value, setValue] = useState(``);
  const [Show, setShow] = useState(false);
  const Mobile = isMobile();
  const dispatch = useDispatch();
  useOutsideAlerter(wrapperRef, setShow);
  const [TerakhirDilihat, setTerakhirDilihat] = useState(true);
  const [RiwayatPencarian, setRiwayatPencarian] = useState(true);
  const { popularSearch, autocompleteSearch } = useSelector((state) => state);

  useEffect(() => {
    if (Value.length > 1) dispatch(getAutoCompleteSearch(Value));
  }, [Value.length]);

  const handleValue = (val) => {
    setValue(val);
    if (handleChange) handleChange(val);
  };

  const handleClear = () => {
    setValue(``);
    if (handleChange) handleChange(``);
  };

  const handleDeleteRiwayat = (val) => {
    if (val == "all") {
      setRiwayatPencarian(false);
    }
    onDeleteRiwayat && onDeleteRiwayat(val);
  };

  const onSubmitValue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmitSearch && handleSubmitSearch(Value);
    setShow(false);
  };

  return (
    <>
      <style jsx>
        {`
          .container {
            width: 100%;
            display: flex;
            gap: 12px;
            justify-content: center;
            align-items: center;
            height: 56px;
            background: ${variant !== "action" &&
            (type === "Landing" || type === "Home")
              ? "tranparent"
              : "white"};
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
            padding: 16px;
            padding-right: ${variant === "notification" && "20px"};
          }
          .notification {
            position: absolute;
            top: -16px;
            right: -24px;
          }
          .notification2 {
            position: absolute;
            top: -16px;
            right: -18px;
          }
          .parent-notification {
            position: relative;
            width: fit-content;
            display: flex;
            align-items: center;
          }
        `}
      </style>
      <>
        {variant === "action" && type !== "Home" ? (
          <div className="container">
            <ArrowBack
              color={Colors.neutral.greyish_brown}
              style={{ height: 24, width: 24, cursor: "pointer" }}
              // onClick={onClickArrowBack}
              onClick={() => {
                handleValue(``);
                onClickArrowBack && onClickArrowBack();
              }}
            />
            {search ? (
              <InputSearchField
                onClick={() => setShow(true)}
                fullWidth
                inputValue={Value}
                placeholder={placeholder}
              />
            ) : type === "Landing" ? (
              <div
                style={{
                  display: "flex",
                  flexGrow: 1,
                  justifyContent: "center",
                }}
              >
                <Logo width={80} height={24} />
              </div>
            ) : (
              <div style={{ display: "flex", flexGrow: 1 }}>
                <Heading4
                  color={Colors.primary.mid_blue}
                  align="center"
                  width="100%"
                >
                  {title}
                </Heading4>
              </div>
            )}
          </div>
        ) : type === "Home" || type === "Search Lowongan" ? (
          <div className="container">
            <img
              alt=""
              src="/images/Principle/Logo/Karir/Avatar/State=Girl.png"
              width={24}
              height={24}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setProfile(!profile);
                setDashboard(false);
              }}
            />
            <InputSearchField
              onClick={() => setShow(true)}
              fullWidth
              inputValue={Value}
              placeholder={placeholder}
            />
            <div className="parent-notification pointer">
              <img alt="" src="/images/Principle/Logo/Notification.png" />
              {variant === "notification" && (
                <div className="notification2">
                  <Notification state="counter" />
                </div>
              )}
            </div>
            <div className="parent-notification pointer">
              <img
                alt=""
                src="/images/Principle/Logo/Dashboard.png"
                onClick={() => {
                  setDashboard(!dashboard);
                  setProfile(false);
                }}
              />
              {variant === "notification" && (
                <div className="notification">
                  <Notification state="counter" value={100} />
                </div>
              )}
            </div>
          </div>
        ) : type === "Status Lamaran" || type === "Lowongan Disimpan" ? (
          <div className="container">
            <div
              onClick={() => {
                setShow(true);
              }}
            >
              <Search
                style={{
                  cursor: "pointer",
                  color: Colors.neutral.brown_grey,
                  width: 24,
                  height: 24,
                }}
              />
            </div>
            <div style={{ display: "flex", flexGrow: 1 }}>
              <Heading4
                color={Colors.primary.mid_blue}
                align="center"
                width="100%"
              >
                {type}
              </Heading4>
            </div>
            <div className="parent-notification pointer">
              <img alt="" src="/images/Principle/Logo/Notification.png" />
              {variant === "notification" && (
                <div className="notification">
                  <Notification state="counter" value={100} />
                </div>
              )}
            </div>
          </div>
        ) : type === "Setting" ? (
          <div className="container">
            <div
              // onClick={() => {
              //   setShow(true);
              // }}
            >
              <CloseRounded
                style={{
                  cursor: "pointer",
                  color: Colors.neutral.brown_grey,
                  width: 24,
                  height: 24,
                }}
              />
            </div>
            <div style={{ display: "flex", flexGrow: 1 }}>
              <Heading4
                color={Colors.primary.mid_blue}
                align="center"
                width="100%"
              >
                {type}
              </Heading4>
            </div>
            <div className="parent-notification pointer">
              {/* <img alt="" src="/images/Principle/Logo/Notification.png" />
              {variant === "notification" && (
                <div className="notification">
                  <Notification state="counter" value={100} />
                </div>
              )} */}
            </div>
          </div>
        ) : type === "Email" ? (
          <div className="container">
            <div
              // onClick={() => {
              //   setShow(true);
              // }}
            >
              <CloseRounded
                style={{
                  cursor: "pointer",
                  color: Colors.neutral.brown_grey,
                  width: 24,
                  height: 24,
                }}
              />
            </div>
            <div style={{ display: "flex", flexGrow: 1 }}>
              <Heading4
                color={Colors.primary.mid_blue}
                align="center"
                width="100%"
              >
                {type}
              </Heading4>
            </div>
            <div className="parent-notification pointer">
              {/* <img alt="" src="/images/Principle/Logo/Notification.png" />
              {variant === "notification" && (
                <div className="notification">
                  <Notification state="counter" value={100} />
                </div>
              )} */}
            </div>
          </div>
        )
        : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 16,
            }}
          >
            <Logo width={80} height={24} />
          </div>
        )}
        {Show && (
          <div
            style={{
              position: "fixed",
              backgroundColor: "white",
              top: 0,
              padding: 16,
              zIndex: 100,
              width: "100%",
              height: "100vh",
              display: "block",
              left: 0,
            }}
          >
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
                    // setValue(``);
                    // handleValue(``);
                    setShow(false);
                  }}
                >
                  <ArrowBack
                    color={Colors.neutral.greyish_brown}
                    style={{ height: 24, width: 24, cursor: "pointer" }}
                  />
                </div>
                <form onSubmit={onSubmitValue} style={{ width: "100%" }}>
                  <InputSearchField
                    inputValue={Value}
                    handleClear={() => handleClear()}
                    fullWidth
                    onChange={(e) => handleValue(e.target.value)}
                    placeholder={placeholder}
                  />
                </form>
              </div>
            )}
            {Value.length < 2 || autocompleteSearch.loading ? (
              <div>
                {TerakhirDilihat && terakhirDilihat && (
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
                    {terakhirDilihat && (
                      <Row style={{ margin: 0 }}>
                        {terakhirDilihat.map((el, idx) => (
                          <Pill
                            variant="close"
                            skeleton={skeletonChild}
                            key={idx}
                          >
                            {el}
                          </Pill>
                        ))}
                      </Row>
                    )}
                  </>
                )}
                {RiwayatPencarian && riwayatPencarian && (
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
                          onClick={() => handleDeleteRiwayat("all")}
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
                    {riwayatPencarian && riwayatPencarian.length > 0 && (
                      <Row style={{ margin: 0 }}>
                        {riwayatPencarian?.map((el, idx) => (
                          <InputChip
                            size="small"
                            skeleton={skeletonChild}
                            key={idx}
                            onClick={() => handleDeleteRiwayat(el)}
                            onClickChip={() => {
                              handleValue(el);
                              setShow(false);
                            }}
                          >
                            {el}
                          </InputChip>
                        ))}
                      </Row>
                    )}
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
                  {!popularSearch.loading &&
                    popularSearch.data.map((el, idx) => (
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
                      Hasil pencarian untuk "{Value}"
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
                      Hasil pencarian untuk "{Value}"
                    </Heading4>
                    {autocompleteSearch.data?.job_position &&
                      autocompleteSearch.data?.job_position.map((el) => (
                        <>
                          <div className="d-flex pointer">
                            <Heading5>
                              {el.substring(
                                0,
                                el.toLowerCase().indexOf(Value.toLowerCase())
                              )}
                            </Heading5>
                            <Body2>{Value}</Body2>
                            <Heading5>
                              {el.substring(
                                el.toLowerCase().indexOf(Value.toLowerCase()) +
                                  Value.length,
                                el.length
                              )}
                            </Heading5>
                          </div>
                          <Divider />
                        </>
                      ))}
                    {autocompleteSearch.data?.job_position && (
                      <div className="d-flex">
                        <Heading5>
                          {autocompleteSearch.data?.job_position[0].substring(
                            0,
                            autocompleteSearch.data?.job_position[0]
                              .toLowerCase()
                              .indexOf(Value.toLowerCase())
                          )}
                        </Heading5>
                        <Body2>{Value}</Body2>
                        <Heading5>
                          {autocompleteSearch.data?.job_position[0].substring(
                            autocompleteSearch.data?.job_position[0]
                              .toLowerCase()
                              .indexOf(Value.toLowerCase()) + Value.length,
                            autocompleteSearch.data?.job_position[0].length
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
                    {autocompleteSearch.data?.companies &&
                      autocompleteSearch.data?.companies.map((el) => (
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
                              el.name.toLowerCase().indexOf(Value.toLowerCase())
                            )}
                            <Heading5>
                              {el.name.substring(
                                0,
                                el.name
                                  .toLowerCase()
                                  .indexOf(Value.toLowerCase())
                              )}
                            </Heading5>
                            <Body2>{Value}</Body2>
                            <Heading5>
                              {el.name.substring(
                                el.name
                                  .toLowerCase()
                                  .indexOf(Value.toLowerCase()) + Value.length,
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
          </div>
        )}
      </>
    </>
  );
}
