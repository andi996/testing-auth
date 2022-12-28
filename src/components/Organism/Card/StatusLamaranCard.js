import {
  AccessTimeOutlined,
  Check,
  Close,
  DateRange,
  MoreHoriz,
  Person,
  Add,
} from "@mui/icons-material";
import Toaster from "../../Molecul/Toaster";
import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState, useRef } from "react";
import { Colors, Elevation, Radius } from "../../../themes";
import RectangleAvatar from "../../Atom/Avatar/Rectangle";
import BottomSheet from "../Bottom Sheet";
import Divider from "../../Atom/Divider";
import {
  Small,
  Body1,
  Body2,
  Body3,
  Heading4,
  Heading5,
  Heading6,
  Font,
} from "../../Atom/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ProfileMatch from "../../Atom/Label/ProfileMatch";
import Label from "../../Atom/Label";
import RectangleButton from "../../Atom/Button/RectangleButton";
import { isMobile, isTablet } from "../../../utils/useMediaQuery";
import ReportPopup from "../Header/ReportPopup";
import useOutsideAlerter from "../../../utils/handleClickOutside";
import moment from "moment/moment";
import "moment/locale/id";
import { useDispatch } from "react-redux";
import { saveOpportunity } from "../../../redux/action/OpportunityAction";
import { readStatusLamaran } from "../../../redux/action/StatusLamaranAction";

export default function StatusLamaranCard(props) {
  moment.locale(`id`);

  const { data, skeleton, state = `active`, handleClick } = props;

  // Media Query
  const Mobile = isMobile();
  const Tablet = isTablet();

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState();
  const [isShow, setIsShow] = useState();
  const [shareToaster, setShareToaster] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsOpen);

  const id = data?.current_status?.id; // id status lamaran
  const statusName = data?.current_status?.name; // status name
  const attend = data?.current_status?.attend; // attend
  const date_ = data?.current_status?.date;
  const start_time = data?.current_status?.start_time;
  const end_time = data?.current_status?.end_time;

  const [label, setLabel] = useState(""); // status lamaran
  const [labelColor, setLabelColor] = useState(""); // status lamaran
  const [description, setDescription] = useState({ icon: "", text: "" });

  useEffect(() => {
    let newLabel = "";
    let newLabelColor = "orange";
    let newDescription = { icon: "", text: "" };

    // Label
    if (statusName === "New Applicant") newLabel = "Terkirim";
    if (statusName === "Shortlisted") newLabel = "Shortlist";
    if (statusName === "TLD") newLabel = "Tes Logika Dasar";
    if (statusName === "MCU") newLabel = "Medical Checkup";
    if (statusName === "ORVI") newLabel = "ORVI";
    if (statusName === "Interview 1") newLabel = "Interview 1";
    if (statusName === "Interview 2") newLabel = "Interview 2";
    if (statusName === "Interview 3") newLabel = "Interview 3";
    if (statusName === "Rejected" || statusName === "Not Suitable")
      newLabel = "Gagal";
    if (statusName === "Matched" || statusName === "Hired")
      newLabel = "Berhasil";

    // Label Color
    if (statusName === "New Applicant") newLabelColor = `grey`;
    if (
      statusName === "Shortlisted" ||
      statusName === "TLD" ||
      statusName === "MCU"
    )
      newLabelColor = `light blue`;
    if (
      statusName === "ORVI" ||
      statusName === "Interview 1" ||
      statusName === "Interview 2" ||
      statusName === "Interview 3"
    )
      newLabelColor = `purple`;
    if (statusName === "Not Suitable" || statusName === "Rejected")
      newLabelColor = `red`;
    if (statusName === "Matched" || statusName === "Hired")
      newLabelColor = `green`;

    // Description
    if (statusName === "TLD") {
      if (attend === null) {
        newDescription.icon = `calendar`;
        newDescription.text = `Kerjakan sebelum ${date_}`;
      }
      if (attend === true) {
        newDescription.icon = `checklist`;
        newDescription.text = `TLD Terkirim`;
      }
      if (attend === false) {
        newDescription.icon = `close`;
        newDescription.text = `Melewati Masa Waktu TLD`;
      }
    }

    if (statusName === "MCU") {
      // if (attend === null) {
      newDescription.icon = `calendar`;
      newDescription.text = `${date_}${
        (start_time || end_time) &&
        ` | ${start_time}${end_time ? `-${end_time}` : ""} WIB`
      }`;
      // }
    }

    if (statusName === "ORVI") {
      if (attend === null) {
        newDescription.icon = `calendar`;
        newDescription.text = `Kerjakan sebelum ${date_}`;
      }
      if (attend === true) {
        newDescription.icon = `checklist`;
        newDescription.text = `ORVI Terkirim`;
      }
      if (attend === false) {
        newDescription.icon = `close`;
        newDescription.text = `Melewati Batas Waktu ORVI`;
      }
    }

    if (
      statusName === "Interview 1" ||
      statusName === "Interview 2" ||
      statusName === "Interview 3"
    ) {
      if (attend === null || attend === true) {
        newDescription.icon = `calendar`;
        newDescription.text = `${date_}${
          (start_time || end_time) &&
          ` | ${start_time}${end_time ? `-${end_time}` : ""} WIB`
        }`;
      } else {
        newDescription.icon = `close`;
        newDescription.text = `Melewati batas waktu konfirmasi interview`;
      }
    }

    if (statusName === "Rejected") {
      newDescription.icon = `close`;
      newDescription.text = `Mengundurkan diri`;
    }

    setLabel(newLabel);
    setLabelColor(newLabelColor);
    setDescription(newDescription);
  }, [data]);

  const handleButton = (e) => {
    if (label === "Tes Logika Dasar" || label === "ORVI") {
      data?.current_status?.notes
        ? (window.location.href = data?.current_status?.notes)
        : alert("Link tidak ditemukan");
    } else {
      handleClick(e, label, data);
    }
  };

  // Dropdown
  const DropDownList = styled("ul")`
    position: absolute;
    top: 30px;
    right: -24px;
    background-color: white;
    min-width: 220px;
    overflow: auto;
    box-shadow: ${Elevation.navigationMenu};
    border: 0.5px solid #d2d2d2;
    z-index: 12;
    margin-top: 0;
    margin-left: 48px;
    padding: 4px;

    list-style: none;
    border-radius: 8px;
    cursor: default;

    &:last-of-type {
      border-bottom: none;
    }
  `;

  const ListItem = styled("li")`
    padding: 12px 16px;
    text-align: left;
    text-decoration: none;
    display: block;
    cursor: pointer;
    color: ${Colors.neutral.brown_grey};

    :active {
      background-color: ${Colors.primary.mid_blue};
      color: white;
      border-radius: 8px;
    }

    :hover {
      background-color: ${Colors.primary.mid_blue};
      color: white;
      border-radius: 8px;
    }

    &.active {
      background-color: ${Colors.primary.mid_blue};
      color: white;
      border-radius: 8px;
    }
  `;

  return (
    <>
      <style jsx>
        {`
          .wrapper-container {
            // cursor: pointer;
            border-radius: 8px;
            background: ${!data?.is_read ? Colors.primary.pale_gray : "white"};
            cursor: pointer;
            // min-width: ${Mobile ? "328px" : "400px"};
          }
          .container {
            width: 100%;
            display: flex;
            flex-direction: column;
            // align-items: flex-start;
            box-shadow: ${Elevation.card};
            position: relative;
            border-radius: 8px 8px 0 0;
            padding: ${Mobile ? "12px 8px" : "16px 16px"};
          }
          .container-bottom {
            width: 100%;
            display: flex;
            flex-direction: column;
            box-shadow: ${Elevation.card};
            position: relative;
            border-radius: 0 0 8px 8px;
            background-color: ${Colors.primary.pale_gray};
            padding: ${Mobile ? "8px" : "12px 16px"};
          }
          .info-company-button-stack {
            margin-top: ${Mobile ? " 4px" : "16px"};
            display: flex;
            flex-direction: row;
            align-self: stretch;
            justify-content: space-between;
            height: 100%;
          }
          .info-company-stack {
            margin-left: 12px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            align-self: stretch;
          }
          .top-stack {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            // align-self: stretch;
          }
          .bottom-stack {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .right-bottom {
            display: flex;
            align-items: center;
            align-self: flex-start;
          }
          .lowongan-ditutup {
            width: 100%;
            // height: 265px;
            border-radius: ${Radius.medium};
            position: absolute;
            background: #ffffff;
            opacity: 0.5;
          }
        `}
      </style>

      {/* Toaster */}
      <Toaster
        open={shareToaster}
        noBar
        variant="success"
        label="Link Berhasil dicopy di Clipboard"
        setOpen={() => setShareToaster(false)}
      />

      {/* Report Popup */}
      <ReportPopup
        isOpen={isShow}
        userId={data?.user_id}
        opportunityId={data?.opportunity?.id}
        handleClose={() => setIsShow(false)}
      />

      <div
        ref={wrapperRef}
        className="wrapper-container"
        style={{ opacity: data?.opportunity?.is_expired ? 0.5 : 1 }}
        onClick={() =>
          dispatch(
            readStatusLamaran({
              status: [data?.current_status?.id],
            })
          )
        }
      >
        <div className="container">
          <div className="top-stack">
            <div className="d-flex" style={{ width: "auto" }}>
              <Font
                type={Mobile ? `Body3` : `Body1`}
                color={Colors.greyish_brown}
              >
                Status:
              </Font>
              <Label
                skeleton={skeleton}
                size={Mobile ? "small" : "large"}
                variant={labelColor}
              >
                {label}
              </Label>
            </div>
            <ProfileMatch
              value={data?.match_percentage}
              skeleton={skeleton}
              variant={Mobile ? "micro" : Tablet ? "short" : "default"}
            />
          </div>
          <Divider
            costumStyle={{
              width: Mobile && "calc(100% + 16px)",
              marginLeft: Mobile && -8,
            }}
          />
          <div className="info-company-button-stack">
            {skeleton ? (
              <Skeleton
                variant="circular"
                width={64}
                height={64}
                animation="wave"
              />
            ) : (
              <RectangleAvatar state="karir" type="blue" />
            )}

            <div className="info-company-stack">
              {/* Title */}
              {skeleton ? (
                <Skeleton width="100%" animation="wave" />
              ) : (
                <Font
                  type={Mobile ? `Heading5` : `Heading4`}
                  color={Colors.neutral.greyish_brown}
                  onClick={(e) => {
                    window.open(
                      `${process.env.NEXTAUTH_URL}/opportunities/${data?.opportunity?.id}`
                    );
                  }}
                >
                  {data?.opportunity?.job_position}
                </Font>
              )}

              {/* Company */}
              {skeleton ? (
                <Skeleton width="100%" animation="wave" />
              ) : (
                <Font
                  type={Mobile ? `Body3` : `Body1`}
                  color={Colors.secondary.clear_blue}
                >
                  {data?.opportunity?.company?.name}
                </Font>
              )}

              {/* Location */}
              {skeleton ? (
                <Skeleton width="100%" animation="wave" />
              ) : (
                <Font
                  type={Mobile ? `Body3` : `Body1`}
                  color={Colors.neutral.brown_grey}
                >
                  {data?.opportunity?.location?.name}
                </Font>
              )}

              {skeleton ? (
                <Skeleton width="100%" animation="wave" />
              ) : (
                <>
                  {description?.icon &&
                    description?.text &&
                    !data?.opportunity.is_expired && (
                      <Box
                        className="d-flex"
                        sx={{ gap: `4px`, marginTop: Mobile ? 0 : `8px` }}
                      >
                        {description?.icon === "calendar" && (
                          <img src="/images/Principle/Logo/Calendar Green.svg" />
                        )}

                        {description?.icon === "checklist" && (
                          <Check
                            style={{
                              color: Colors.secondary.highlight_green,
                              height: 16,
                              width: 16,
                            }}
                          />
                        )}

                        {description?.icon === "close" && (
                          <Close
                            style={{
                              color: Colors.secondary.red,
                              height: 16,
                              width: 16,
                            }}
                          />
                        )}

                        <Font
                          type={Mobile ? `Heading6` : `Heading5`}
                          color={
                            description?.icon === "calendar" ||
                            description?.icon === "checklist"
                              ? Colors.secondary.highlight_green
                              : Colors.secondary.red
                          }
                        >
                          {description?.text}
                        </Font>
                      </Box>
                    )}
                </>
              )}
            </div>
            {skeleton ? (
              <></>
            ) : (
              <div className="right-bottom">
                <Box
                  className="pointer"
                  onClick={() => {
                    dispatch(
                      saveOpportunity({
                        user_id: data?.user_id,
                        opportunities: [data?.opportunity?.id],
                      })
                    );
                  }}
                >
                  {data?.is_saved ? (
                    <BookmarkIcon
                      style={{
                        color: Colors.primary.mid_blue,
                        height: 24,
                        width: 24,
                      }}
                    />
                  ) : (
                    <BookmarkBorderIcon
                      style={{
                        color: Colors.primary.mid_blue,
                        height: 24,
                        width: 24,
                      }}
                    />
                  )}
                </Box>

                <Box position="relative" onClick={() => setIsOpen(!isOpen)}>
                  <MoreHoriz
                    sx={{
                      color: Colors.neutral.brown_grey,
                      height: `24px`,
                      width: `24px`,
                      cursor: `pointer`,
                    }}
                  />

                  {Mobile ? (
                    <BottomSheet
                      visible={isOpen}
                      variant="list"
                      onClose={setIsOpen}
                    >
                      <Box
                        key={1}
                        className="d-flex"
                        gap="32px"
                        py="16px"
                        onClick={() => setShareToaster(true)}
                      >
                        <img
                          src="/images/Principle/Logo/ShareBlue.svg"
                          alt="share.svg"
                        />
                        <Body1 color={Colors.primary.mid_blue}>Share</Body1>
                      </Box>
                      <Box
                        key={2}
                        className="d-flex"
                        gap="32px"
                        py="16px"
                        onClick={() => {
                          setIsOpen(false);
                          setIsShow(true);
                        }}
                      >
                        <img
                          src="/images/Principle/Logo/FlagRed.svg"
                          alt="flag.svg"
                        />
                        <Body1 color={Colors.secondary.red}>
                          Lapor Lowongan
                        </Body1>
                      </Box>
                    </BottomSheet>
                  ) : (
                    isOpen && (
                      <DropDownList>
                        <ListItem onClick={() => setShareToaster(true)}>
                          Share
                        </ListItem>
                        <ListItem onClick={() => setIsShow(true)}>
                          Lapor Lowongan
                        </ListItem>
                      </DropDownList>
                    )
                  )}
                </Box>
              </div>
            )}
          </div>
        </div>

        <div className="container-bottom">
          <div className="bottom-stack">
            {skeleton ? (
              <>
                <Skeleton width="25%" />
                <Skeleton width="25%" />
              </>
            ) : (
              <>
                <Box>
                  <Font
                    type={Mobile ? `Body3` : `Body2`}
                    color={Colors.primary.mid_blue}
                  >
                    {data?.apply_from === `default`
                      ? `Lamar Pribadi`
                      : data?.apply_from}
                  </Font>
                  <Font
                    type={Mobile ? `Small` : `Body2`}
                    color={Colors.neutral.brown_grey}
                  >
                    {data?.created_at &&
                      `Pada ${moment(data?.created_at).format("DD MMM YYYY")}`}
                  </Font>
                </Box>

                {data?.opportunity?.is_expired ? (
                  <Heading5 color={Colors.secondary.red}>
                    Lowongan di tutup
                  </Heading5>
                ) : (
                  <Box>
                    {((label !== "Terkirim" &&
                      label !== "Shortlist" &&
                      label !== "Gagal" &&
                      data?.current_status?.attend === null) ||
                      ((label === "Interview 1" ||
                        label === "Interview 2" ||
                        label === "Interview 3") &&
                        data?.current_status?.attend !== false)) && (
                      <RectangleButton
                        size={Mobile && "small"}
                        skeleton={skeleton}
                        state={
                          data?.current_status?.attend === null
                            ? `default`
                            : (label === "Interview 1" ||
                                label === "Interview 2" ||
                                label === "Interview 3") &&
                              `alternate`
                        }
                        onClick={handleButton}
                        customStyle={{
                          width: Mobile ? 150 : 200,
                          height: Mobile ? 32 : 40,
                        }}
                      >
                        {label === `Tes Logika Dasar` && `Mulai Tes`}
                        {label === `ORVI` && `Mulai Orvi`}
                        {(label === `Medical Checkup` ||
                          label === `Berhasil`) &&
                          `Lihat Detail`}

                        {(label === `Interview 1` ||
                          label === `Interview 2` ||
                          label === `Interview 3`) &&
                          data?.current_status?.attend === null &&
                          `Konfirmasi Interview`}

                        {(label === `Interview 1` ||
                          label === `Interview 2` ||
                          label === `Interview 3`) &&
                          data?.current_status?.attend === true &&
                          `Lihat Detail`}
                      </RectangleButton>
                    )}
                  </Box>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
