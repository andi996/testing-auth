import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FloatingButton from "../../components/Atom/Button/FloatingButton";
import { Heading2, Heading6 } from "../../components/Atom/Typography";
import Sidebar from "../../components/Molecul/Sidebar/index";
import TabLeft from "../../components/Molecul/Tab/TabLeft";
import Footer from "../../components/Organism/Footer";
import Header from "../../components/Organism/Header";
import {
  confirmAttendance,
  getStatusLamaran,
} from "../../redux/action/StatusLamaranAction";
import { Colors, Elevation, Radius } from "../../themes";
import Berhasil from "./Berhasil";
import Diproses from "./Diproses";
import Gagal from "./Gagal";
import LamaranTerkirim from "./LamaranTerkirim";
import CoachMark from "./popup/CoachMark";
import ModalDetail from "./popup/ModalDetail";
import SemuaLamaran from "./SemuaLamaran";
import UndanganInterview from "./UndanganInterview";

import ModalPopupFAQ from "./popup/ModalPopupFAQ";

import useMediaQuery, { isMobile } from "../../utils/useMediaQuery";
import { readStatusLamaran } from "../../redux/action/StatusLamaranAction";
import css from "styled-jsx/css";
import StatusLamaranCard from "../../components/Organism/Card/StatusLamaranCard";

export const scrollBar = css`
  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #d2d2d2;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #d2d2d2;
    border-radius: 2px;
  }
`;

export default function StatusLamaran() {
  // Media Query
  const maxWidth3 = useMediaQuery("(max-width: 943px)");
  const Mobile = isMobile();

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.statusLamaran);

  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [invitationId, setInvitationId] = useState();
  const [userId, setUserId] = useState();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState(``);

  const [helpButtonClicked, setHelpButtonClicked] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [tab, setTab] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const [selectedSidebar, setSelectedSidebar] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const KlikMenu = (value) => {
    const newSelectedSidebar = selectedSidebar.map((x, index) => {
      return index === value ? true : false;
    });

    let ids = [];

    if (value === 1) ids = [0];
    if (value === 2) ids = [2, 8, 9];
    if (value === 3) ids = [4, 5, 6, 7];
    if (value === 4) ids = [1, 11];
    if (value === 5) ids = [3, 12];

    if (value !== 0) {
      if (data) {
        let hasUnreadStatus = false;
        data?.map((item) => {
          if (ids.includes(item?.current_status.id)) {
            if (!item?.is_read) {
              hasUnreadStatus = true;
            }
          }
        });

        hasUnreadStatus &&
          dispatch(
            readStatusLamaran({
              status: ids,
            })
          );
      }
    }

    setSelectedSidebar(newSelectedSidebar);
    setTab(value);
    window.scrollTo(0, 0);
  };

  const handleModalPopupFAQ = (val) => {
    if (val === "open") {
      setShowFAQ(true);
      console.log("clicked FAQ");
    }
    if (val === "close") {
      setShowFAQ(false);
    }
  };

  const handleClick = (e, label, data) => {
    e.preventDefault();
    setShowPopup(true);

    setInvitationId(data?.current_status?.invitation_id);
    setUserId(data?.user_id);
    setNotes(data?.current_status?.notes);
    if (data?.current_status?.name.includes("Interview")) {
      if (data?.current_status?.attend === null) {
        setTitle("Konfirmasi Interview");
      }
      if (data?.current_status?.attend === true) {
        setTitle("Detail Interview");
      }
    } else {
      setTitle(label);
    }
  };

  const handleSubmit = ({ attend, notes }) => {
    dispatch(
      confirmAttendance({
        id: invitationId,
        karir_user_id: userId,
        attend: attend,
        candidate_notes: notes,
      })
    );
  };

  const hasUnreadStatus = (val) => {
    let unreadCount = [];

    if (val === `sent`) {
      unreadCount = data?.filter(
        (item) => item.current_status.name === `New Applicant` && !item?.is_read
      );
    }

    if (val === `processed`) {
      unreadCount = data?.filter(
        (item) =>
          (item?.current_status?.name === "Shortlisted" ||
            item?.current_status?.name === "TLD" ||
            item?.current_status?.name === "MCU") &&
          !item?.is_read
      );
    }

    if (val === `interview`) {
      unreadCount = data?.filter(
        (item) =>
          (item?.current_status?.name === "ORVI" ||
            item?.current_status?.name.includes("Interview")) &&
          !item?.is_read
      );
    }

    if (val === `successed`) {
      unreadCount = data?.filter(
        (item) =>
          (item?.current_status?.name === "Hired" ||
            item?.current_status?.name === "Matched") &&
          !item?.is_read
      );
    }

    if (val === `failed`) {
      unreadCount = data?.filter(
        (item) =>
          (item?.current_status?.name === "Not Suitable" ||
            item?.current_status?.name === "Rejected") &&
          !item?.is_read
      );
    }

    return unreadCount?.length > 0 ? unreadCount?.length : false;
  };

  useEffect(() => {
    !data && dispatch(getStatusLamaran());
  }, []);

  useEffect(() => {
    !loading && setShowPopup(false);
  }, [loading]);

  // ----------------------------------------------------------------------------------------

  const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ value }) => ({
      textTransform: "none",
      color: helpButtonClicked
        ? value === activeTab && Colors.primary.mid_blue
        : Colors.neutral.brown_grey,
      "&.Mui-selected": {
        color: helpButtonClicked
          ? Colors.neutral.brown_grey
          : Colors.primary.mid_blue,
      },
      minWidth: 0,
      minHeight: 0,
      padding: "10px 8px",
      ":first-child": { paddingLeft: 8 },
      ":last-child": { paddingRight: 8 },

      borderTopLeftRadius: helpButtonClicked && value === activeTab ? `4px` : 0,
      borderTopRightRadius:
        helpButtonClicked && value === activeTab ? `4px` : 0,
      borderBottom:
        helpButtonClicked && value === activeTab
          ? `2px solid ${Colors.primary.mid_blue}`
          : 0,
      background: helpButtonClicked && value === activeTab && `#fff`,
      // zIndex: helpButtonClicked && value === activeTab ? 1000 : 999,
      zIndex: helpButtonClicked && value === activeTab ? 1000 : 999,
    })
  );

  return (
    <>
      <style jsx>
        {`
          .body {
            background: url("/images/Principle/Background/Light Blue Desktop.png")
              no-repeat top;
            background-size: 100%;
            padding: ${Mobile ? 0 : `80px 5% 8px 5%`};
          }

          .title-status-lamaran {
            color: ${Colors.neutral.greyish_brown};
            margin-right: 10px;
          }

          @media screen and (max-width: 768px) {
            .title-status-lamaran {
              margin-right: 8px;
            }
          }
        `}
      </style>

      <ModalPopupFAQ
        isOpen={showFAQ}
        onClick={() => handleModalPopupFAQ("close")}
      />

      <ModalDetail
        show={showPopup}
        loading={loading}
        title={title}
        notes={notes}
        onClick={() => console.log("click")}
        handleSubmit={handleSubmit}
        handleClose={() => {
          !loading && setShowPopup(false);
        }}
        submitBtnTitle={
          title.includes("Interview") && "Konfirmasi Undangan Interview"
        }
      />

      {/* CoachMark */}
      {helpButtonClicked && (
        <CoachMark
          active={activeTab}
          handleBack={() => {
            setTab(activeTab - 1);
            setActiveTab(activeTab - 1);
          }}
          handleNext={() => {
            if (activeTab < 5) {
              setTab(activeTab + 1);
              setActiveTab(activeTab + 1);
            } else {
              setHelpButtonClicked(false);
              setTab(0);
              setActiveTab(0);
            }
          }}
          handleClose={() => {
            setHelpButtonClicked(false);
            setTab(0);
            setActiveTab(0);
          }}
        />
      )}

      <Header
        type="Status Lamaran"
        title="Status Lamaran"
        state="navigation"
        placeholder="Cari Lowongan atau Perusahaan"
        handleChange={(val) => setInput(val)}
        handleSubmitSearch={() => setKeyword(input?.toLowerCase())}
      />

      <div className="body">
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: Mobile ? `column` : `row`,
            alignItems: "flex-start",
            marginBottom: "8px",
            gap: Mobile ? 0 : 24,
          }}
        >
          {/* LEFT CONTAINER */}
          {!Mobile && (
            <div
              style={{
                // display: "flex",
                // flexDirection: "column",
                // alignItems: "flex-start",
                // marginTop: "40px",
                // marginBottom: "40px",
                position: "sticky",
                top: maxWidth3 ? 0 : `80px`,
                zIndex: 12,
                // marginTop: "-16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div className="title-status-lamaran">
                  <Heading2>Status Lamaran</Heading2>
                </div>
                <HelpOutlineIcon
                  style={{
                    color: Colors.primary.mid_blue,
                    width: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleModalPopupFAQ("open")}
                />
              </div>

              <Sidebar>
                <Sidebar.Content
                  isSelected={selectedSidebar[0]}
                  onClick={() => KlikMenu(0)}
                >
                  Semua
                </Sidebar.Content>
                <Sidebar.Content
                  notification={hasUnreadStatus(`sent`)}
                  count={hasUnreadStatus(`sent`)}
                  onClick={() => KlikMenu(1)}
                  isSelected={selectedSidebar[1]}
                >
                  Lamaran Terkirim
                </Sidebar.Content>
                <Sidebar.Content
                  notification={hasUnreadStatus(`processed`)}
                  count={hasUnreadStatus(`processed`)}
                  onClick={() => KlikMenu(2)}
                  isSelected={selectedSidebar[2]}
                >
                  Diproses
                </Sidebar.Content>
                <Sidebar.Content
                  notification={hasUnreadStatus(`interview`)}
                  count={hasUnreadStatus(`interview`)}
                  onClick={() => KlikMenu(3)}
                  isSelected={selectedSidebar[3]}
                >
                  Undangan Interview
                </Sidebar.Content>
                <Sidebar.Content
                  notification={hasUnreadStatus(`successed`)}
                  count={hasUnreadStatus(`successed`)}
                  onClick={() => KlikMenu(4)}
                  isSelected={selectedSidebar[4]}
                >
                  Berhasil
                </Sidebar.Content>

                <Sidebar.Content
                  notification={hasUnreadStatus(`failed`)}
                  count={hasUnreadStatus(`failed`)}
                  onClick={() => KlikMenu(5)}
                  isSelected={selectedSidebar[5]}
                >
                  Gagal
                </Sidebar.Content>
              </Sidebar>
            </div>
          )}
          {Mobile && (
            <Box
              sx={{
                width: `100%`,
                // background: `#fff`,
                backgroundColor: helpButtonClicked ? `#7f7f7f` : `white`,
                position: `sticky`,
                top: 56,
                transition: `all 0.2s ease`,
                zIndex: 999,
              }}
            >
              <TabLeft
                indicatorSpanStyles={{ maxWidth: "80%" }}
                value={tab}
                onChange={(e, index) => {
                  if (!helpButtonClicked) {
                    setInput("");
                    setKeyword("");
                    KlikMenu(index);
                    setTab(index);
                  }
                }}
                fullWidth
              >
                <AntTab value={0} label={<Heading6>Semua</Heading6>} />
                <AntTab
                  value={1}
                  label={<Heading6>Lamaran Terkirim</Heading6>}
                />
                <AntTab value={2} label={<Heading6>Diproses</Heading6>} />
                <AntTab
                  value={3}
                  label={<Heading6>Undangan Interview</Heading6>}
                />
                <AntTab value={4} label={<Heading6>Berhasil </Heading6>} />
                <AntTab value={5} label={<Heading6>Gagal </Heading6>} />
              </TabLeft>
            </Box>
          )}
          {/* RIGHT CONTAINER */}
          <div style={{ width: "100%", marginTop: Mobile ? 56 : 0 }}>
            <Box
              sx={{
                backgroundColor: `#fff`,
                minHeight: `330px`,
                borderRadius: Radius.medium,
                boxShadow: Elevation.card,
                padding: Mobile ? `16px` : `24px`,
              }}
            >
              {(!data && loading) || error ? (
                <StatusLamaranCard skeleton />
              ) : (
                <>
                  {selectedSidebar[0] && (
                    <SemuaLamaran
                      data={data}
                      keyword={keyword}
                      handleButton={handleClick}
                      handleHelpButton={() => setHelpButtonClicked(true)}
                    />
                  )}

                  {selectedSidebar[1] && (
                    <LamaranTerkirim
                      data={data?.filter(
                        (item) => item?.current_status?.name === "New Applicant"
                      )}
                      keyword={keyword}
                      handleButton={handleClick}
                    />
                  )}
                  {selectedSidebar[2] && (
                    <Diproses
                      data={data?.filter(
                        (item) =>
                          item?.current_status?.name === "Shortlisted" ||
                          item?.current_status?.name === "TLD" ||
                          item?.current_status?.name === "MCU"
                      )}
                      keyword={keyword}
                      handleButton={handleClick}
                    />
                  )}
                  {selectedSidebar[3] && (
                    <UndanganInterview
                      data={data?.filter(
                        (item) =>
                          item?.current_status?.name === "ORVI" ||
                          item?.current_status?.name.includes("Interview")
                      )}
                      keyword={keyword}
                      handleButton={handleClick}
                    />
                  )}
                  {selectedSidebar[4] && (
                    <Berhasil
                      data={data?.filter(
                        (item) =>
                          item?.current_status?.name === "Hired" ||
                          item?.current_status?.name === "Matched"
                      )}
                      keyword={keyword}
                      handleButton={handleClick}
                    />
                  )}
                  {selectedSidebar[5] && (
                    <Gagal
                      data={data?.filter(
                        (item) =>
                          item?.current_status?.name === "Not Suitable" ||
                          item?.current_status?.name === "Rejected"
                      )}
                      keyword={keyword}
                      handleButton={handleClick}
                    />
                  )}
                </>
              )}
            </Box>
          </div>
        </div>
      </div>

      <FloatingButton
        size="small"
        onClick={() =>
          window.open(
            "https://api.whatsapp.com/send/?phone=6281314917268&text&type=phone_number&app_absent=0",
            "_blank"
          )
        }
      />
      {Mobile ? <Box mb="40px" /> : <Footer />}
    </>
  );
}
