import React from "react";
import { useEffect, useState } from "react";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import {
  Body1,
  Body2,
  Body3,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Label,
} from "../../components/Atom/Typography";
import { Colors, Elevation } from "../../themes";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Ticker from "../../components/Molecul/Ticker";
import ModalPopupLogoutAll from "./popup/ModalPopupLogoutAll";
import ModalPopupLogoutSingle from "./popup/ModalPopupLogoutSingle";
import Toaster from "../../components/Molecul/Toaster";
import useMediaQuery from "../../utils/useMediaQuery";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Dialog, AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import InputPasswordField from "../../components/Atom/Input Field/PasswordField";

const columns = [
  { id: "namaDevice", label: "Nama Device", minWidth: 240, maxWidth: 90 },
  { id: "ipAddress", label: "IP Address", minWidth: 240, maxWidth: 90 },
  {
    id: "terakhirAktif",
    label: "Terakhir Aktif",
    minWidth: 170,
    maxWidth: 90,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "logout",
    minWidth: 70,
    align: "left",
    maxWidth: 70,
  },
];

function createData(namaDevice, ipAddress, terakhirAktif, logout) {
  return { namaDevice, ipAddress, terakhirAktif, logout };
}

const rows = [
  createData(
    "Samsung Galaxy Note 8",
    "128.128.128.128",
    "10/10/2022",
    "logout"
  ),
  createData("Macbook Pro", "128.128.128.128", "10/10/2022", "logout"),
  createData("iPad Pro", "128.128.128.128", "10/10/2022", "logout"),
];

const HistoryLogin = () => {
  const isMobile = useMediaQuery("(max-width: 1008px)");
  const isSmallScreen = useMediaQuery("(max-width: 640px");
  const isMedium = useMediaQuery("(max-width: 810px");
  const [show, setShow] = useState(false);
  const [showSingle, setShowSingle] = useState(false);
  const [data, setData] = useState(rows);
  const [state, setState] = useState({
    id: 1,
    name: "Maudy",
    email: "maudy123456789@gmail.com",
    password: "123456",
    ponsel: "081345678910",
  });

  const [namaDevice, setNamaDevice] = useState("");
  const [isDataNull, setIsDataNull] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [openToaster, setOpenToaster] = useState(false);
  const [password, setPassword] = useState("");
  const [logoutAll, setLogoutAll] = useState(false);

  useEffect(() => {
    setData(rows);
  }, []);

  useEffect(() => {
    setPassword(state?.password);
  }, [state]);

  const handleModalPopup = (val) => {
    if (val === "open") {
      setShow(true);
    } else if (val === "close") {
      setShow(false);
      // console.log("clicked");
    }
  };

  const handleModalPopupSingle = (val, namaDevice) => {
    if (val === "open") {
      setShowSingle(true);
      setNamaDevice(namaDevice);
    } else if (val === "close") {
      setShowSingle(false);
    }
  };

  const handleConfirmation = (val, namaDevice) => {
    if (val === "open") {
      setConfirmation(true);
      console.log(confirmation);
      setNamaDevice(namaDevice);
    } else if (val === "close") {
      setConfirmation(false);
    }
  };

  const handleLogoutAll = (val) => {
    if (val == true) {
      setData([]);
      setIsDataNull(true);
    }
  };

  const handleLogout = (isDone, device) => {
    const dataDevice = data.map(function (x) {
      return x;
    });
    const dataAfterLogout = dataDevice.filter((isiData) => {
      return isiData.namaDevice !== device;
    });

    if (isDone == true) {
      setData(dataAfterLogout);
    }
  };

  const handleClose = () => {
    setShowHistory(false);
    setConfirmation(false);
    setLogoutAll(false);
  };

  const handlePassword = (value) => {
    setInputPassword(value);
    if (inputPassword !== value) {
      setIsPasswordError(false);
    }
  };

  const handleButton = (val) => {
    if (val === "continue") {
      if (password == inputPassword) {
        // setIsDone(true);
        // onClick();
        setOpenToaster(false);
        setTimeout(() => {
          setOpenToaster(true);
          setConfirmation(false);
        }, 1000);
      } else {
        // alert("password salah");
        setIsPasswordError(true);
      }
    } else if (val === "cancel") {
      setConfirmation(false);
    }
  };
  return (
    <>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            //   padding: 24px;
            position: static;
            width: 100%;
            height: 100%;
            // margin-left: 24px;
            // margin-top: 40px;
          }
          .box-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            min-width: 602px;
            padding: 24px;
            // margin-bottom: 24px;
            background-color: white;
            border-radius: 8px;
            box-shadow: ${Elevation.card};
          }
          .wrap-content {
            width: 100%;
          }
          .wrap-edit {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }

          // responsive
          @media screen and (max-width: 768px) {
          }
          .m-wrapper {
            padding: 0px 16px 0px 16px;
            width: 100%;
          }
        `}
      </style>

      <ModalPopupLogoutAll
        isOpen={show}
        onClick={() => handleModalPopup("close")}
        handleChange={handleLogoutAll}
        state={state}
      />

      <ModalPopupLogoutSingle
        isOpen={showSingle}
        onClick={() => handleModalPopupSingle("close")}
        handleChange={handleLogout}
        state={state}
        namaDevice={namaDevice}
        data={data}
      />
      {/* ===========DIALOG HISTORY LOGIN========== */}

      <Toaster
        open={openToaster}
        variant="success"
        label={`Device berhasil di-logout`}
        setOpen={() => setOpenToaster(false)}
      />
      <Dialog fullScreen open={showHistory} onClose={handleClose}>
        <AppBar sx={{ position: "relative" }} elevation={0}>
          <Toolbar style={{ background: "white" }}>
            <IconButton
              edge="start"
              onClick={handleClose}
              aria-label="close"
              backgroundColor={Colors.neutral.brown_grey}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box m="auto">
              <Heading4
                style={{
                  color: Colors.primary.mid_blue,
                }}
              >
                History Login
              </Heading4>
            </Box>
          </Toolbar>
        </AppBar>
        {logoutAll ? (
          <Box
            mt="16px"
            style={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              // justifyContent: "center",
              margin: "0 16px",
            }}
          >
            <Body3 style={{ marginBottom: 20 }}>
              Masukan Password Anda untuk me-logout Semua device
            </Body3>
            <div style={{ width: "100%" }}>
              <InputPasswordField
                label="Password"
                handleChange={handlePassword}
                fullWidth={true}
                error={isPasswordError}
                helperText={
                  isPasswordError ? "Password yang anda masukkan salah!" : null
                }
              />
            </div>
            <RectangleButton
              size="large"
              customStyle={{
                width: "100%",
                marginBottom: isPasswordError ? "20px" : null,
                marginTop: "24px",
              }}
              onClick={() => handleButton("continue")}
              // variant="text"
              disable={!inputPassword}
            >
              <Heading5>Logout Device</Heading5>
            </RectangleButton>
          </Box>
        ) : !confirmation ? (
          <>
            <div style={{ margin: "0px 16px" }}>
              <Body3>Cek nama device, IP address, dan terakhir aktif.</Body3>
              <TableContainer sx={{ maxHeight: 440, overflowX: "unset" }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  // sx={{ minWidth: 650 }}
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            width: column.maxWidth,
                            borderBottom: "none",
                            padding: "unset",
                          }}
                        >
                          <Body3
                            style={{
                              color: Colors.secondary.clear_blue,
                              width: column.maxWidth,
                            }}
                          >
                            {column.label}
                          </Body3>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ width: isMobile && "auto" }}>
                    {data.length !== 0 ? (
                      data.map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                            style={{ marginTop: "20px" }}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    padding: "16px 0 10px 0",
                                    color:
                                      value == "logout"
                                        ? Colors.primary.mid_blue
                                        : Colors.neutral.brown_grey,
                                    cursor: value == "logout" && "pointer",
                                    width: isMobile && 120,
                                  }}
                                >
                                  {value == "logout" ? (
                                    <div
                                      onClick={() =>
                                        handleConfirmation(
                                          "open",
                                          row.namaDevice
                                        )
                                      }
                                    >
                                      {/* <Body3
                                      style={{ textTransform: "capitalize",width: }}
                                    >
                                      {value}
                                    </Body3> */}
                                      <LogoutOutlinedIcon
                                        style={{
                                          transform: "rotate(180deg)",
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <Body3 style={{ width: isMobile && 110 }}>
                                      {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </Body3>
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                        style={{ marginTop: "20px" }}
                      >
                        {columns.map((column) => {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                padding: "16px 0 0 0",
                                color: Colors.neutral.brown_grey,
                              }}
                            >
                              {column.id == "namaDevice" && (
                                <Body1>Tidak Ada Device</Body1>
                              )}
                              {column.id !== "namaDevice" &&
                                column.id !== "logout" && <Body1>-</Body1>}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div style={{ marginTop: "24px", marginBottom: "24px" }}>
              <Ticker variant="icon" width="100%" height="48px" radius={false}>
                Perhatian! Ganti password jika ada aktifivitas yang
                mencurigakan.
              </Ticker>
            </div>
            <div style={{ margin: "0 16px" }}>
              <RectangleButton
                variant="ghost"
                icon="left"
                iconOut={true}
                customStyle={{ width: "100%" }}
                disable={isDataNull}
                onClick={() => setLogoutAll(true)}
              >
                Logout dari Semua Device
              </RectangleButton>
            </div>
          </>
        ) : (
          <Box
            mt="16px"
            style={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              // justifyContent: "center",
              margin: "0 16px",
            }}
          >
            <Body3 style={{ marginBottom: 20 }}>
              Masukan Password Anda untuk me-logout device
            </Body3>
            <div style={{ width: "100%" }}>
              <InputPasswordField
                label="Password"
                handleChange={handlePassword}
                fullWidth={true}
                error={isPasswordError}
                helperText={
                  isPasswordError ? "Password yang anda masukkan salah!" : null
                }
              />
            </div>
            <RectangleButton
              size="large"
              customStyle={{
                width: "100%",
                marginBottom: isPasswordError ? "20px" : null,
                marginTop: "24px",
              }}
              onClick={() => handleButton("continue")}
              // variant="text"
              disable={!inputPassword}
            >
              <Heading5>Logout Device</Heading5>
            </RectangleButton>
          </Box>
        )}
      </Dialog>
      {isSmallScreen ? (
        <div className="m-wrapper">
          <div
            className="wrap-edit"
            style={{ marginTop: "16px", cursor: "pointer" }}
            onClick={() => {
              setShowHistory(true);
            }}
          >
            <Heading6
              style={{
                color: Colors.neutral.greyish_brown,
              }}
            >
              History Login
            </Heading6>
            <div>
              <ArrowForwardIosRoundedIcon
                style={{
                  cursor: "pointer",
                  color: Colors.neutral.brown_light_grey,
                  width: 24,
                  height: 18,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="container" style={{ marginTop: isMedium ? "16px" : 0 }}>
          {/* ---------------- HISTORY LOGIN ----------------- */}
          <div className="box-card">
            <div className="wrap-content">
              <div className="wrap-edit">
                <Heading3>History Login</Heading3>
              </div>
              <div style={{ marginTop: "24px", marginBottom: "24px" }}>
                <Body1>Cek nama device, IP address, dan terakhir aktif.</Body1>
              </div>
              <TableContainer sx={{ maxHeight: 440, overflowX: "unset" }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  // sx={{ minWidth: 650 }}
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            width: column.minWidth,
                            borderBottom: "none",
                            padding: "unset",
                          }}
                        >
                          <Heading4
                            style={{
                              color: Colors.secondary.clear_blue,
                            }}
                          >
                            {column.label}
                          </Heading4>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ width: isMobile && "auto" }}>
                    {data.length !== 0 ? (
                      data.map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                            style={{ marginTop: "20px" }}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    padding: "16px 0 10px 0",
                                    color:
                                      value == "logout"
                                        ? Colors.primary.mid_blue
                                        : Colors.neutral.brown_grey,
                                    cursor: value == "logout" && "pointer",
                                    width: isMobile && 120,
                                  }}
                                >
                                  {value == "logout" ? (
                                    <div
                                      onClick={() =>
                                        handleModalPopupSingle(
                                          "open",
                                          row.namaDevice
                                        )
                                      }
                                    >
                                      <Heading6
                                        style={{ textTransform: "capitalize" }}
                                      >
                                        {value}
                                      </Heading6>
                                    </div>
                                  ) : (
                                    <Body1 style={{ width: isMobile && 160 }}>
                                      {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </Body1>
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                        style={{ marginTop: "20px" }}
                      >
                        {columns.map((column) => {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                padding: "16px 0 0 0",
                                color: Colors.neutral.brown_grey,
                              }}
                            >
                              {column.id == "namaDevice" && (
                                <Body1>Tidak Ada Device</Body1>
                              )}
                              {column.id !== "namaDevice" &&
                                column.id !== "logout" && <Body1>-</Body1>}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <div style={{ marginTop: "24px", marginBottom: "24px" }}>
                <Ticker variant="icon" width="100%" height="48px">
                  Perhatian! Ganti password jika ada aktifivitas yang
                  mencurigakan.
                </Ticker>
              </div>
              <div>
                <RectangleButton
                  variant="ghost"
                  icon="left"
                  iconOut={true}
                  customStyle={{ width: 320 }}
                  disable={isDataNull}
                  onClick={() => handleModalPopup("open")}
                >
                  Logout dari Semua Device
                </RectangleButton>
              </div>
            </div>
          </div>
          {/* ---------------- END HISTORY LOGIN ----------------- */}
        </div>
      )}
    </>
  );
};

export default HistoryLogin;
