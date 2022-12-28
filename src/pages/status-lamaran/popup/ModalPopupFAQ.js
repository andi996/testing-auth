import React, { useState, useEffect } from "react";
import Modal from "../modal/modalFAQ";
import {
  Body1,
  Body3,
  Heading3,
  Heading4,
} from "../../../components/Atom/Typography";
import CloseIcon from "@mui/icons-material/Close";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import { Colors, Radius } from "../../../themes";
import styled from "@emotion/styled/base";
import Box from "@mui/material/Box";
import parse from "html-react-parser";
import Sidebar from "../../../components/Molecul/Sidebar";
import PageControl from "../../../components/Atom/PageControl";

export default function ModalPopupFAQ({ isOpen, onClick }) {
  const [bar, setBar] = useState(0);
  const variant = 6;

  const [selectedSidebar, setSelectedSidebar] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const KlikMenu1 = (val) => {
    if (val == 0) {
      setSelectedSidebar([true, false, false, false, false, false]);
    }
    if (val == 1) {
      setSelectedSidebar([false, true, false, false, false, false]);
    }
    if (val == 2) {
      setSelectedSidebar([false, false, true, false, false, false]);
    }
    if (val == 3) {
      setSelectedSidebar([false, false, false, true, false, false]);
    }
    if (val == 4) {
      setSelectedSidebar([false, false, false, false, true, false]);
    }
    if (val == 5) {
      setSelectedSidebar([false, false, false, false, false, true]);
    }

    setBar(val);
  };

  useEffect(() => {
    if (bar == 0) {
      KlikMenu1(0);
    }
    if (bar == 1) {
      KlikMenu1(1);
    }
    if (bar == 2) {
      KlikMenu1(2);
    }
    if (bar == 3) {
      KlikMenu1(3);
    }
    if (bar == 4) {
      KlikMenu1(4);
    }
    if (bar == 5) {
      KlikMenu1(5);
    }
  }, [bar]);

  const handleButton = (val) => {
    if (val === "continue") {
      const maxBar = variant;
      if (bar + 1 <= maxBar) {
        setBar(bar + 1);
      }
    } else if (val === "back") {
      if (bar - 1 >= 0) {
        setBar(bar - 1);
      }
    }
    if (val === "cancel") {
      setBar(0);
      onClick();
    }
  };

  const Flex = styled("div")`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const Header = ({ children }) => {
    return (
      <Flex>
        <Flex>{children}</Flex>
        <CloseIcon
          style={{ cursor: `pointer` }}
          onClick={() => {
            setBar(0);
            onClick();
          }}
        />
      </Flex>
    );
  };

  const isiBar0 = "Anda dapat mengecek semua status lamaran Anda di sini.";
  const isiBar1 =
    "Semua lamaran yang belum diproses oleh HR akan berada di menu lamaran terkirim.";
  const isiBar2 =
    "Shortlist -> Jika lamaran Anda dishortlist.<br>TLD -> Tes Logika Dasar.<br>MCU -> Medical Checkup.";
  const isiBar3 =
    "Lamaran Anda akan berada di menu ini, jika sudah sampai tahap proses interview.<p>ORVI -> Online Recording Video Interview<br>Interview 1, 2, 3 -> Interview (Online / Offline)</p>";
  const isiBar4 =
    "Offering -> Tahap Offering.<br>Berhasil  -> Offering sudah diterima.";
  const isiBar5 = "Lamaran tidak cocok oleh HR akan masuk ke “Gagal”.";

  const ModalBody1 = () => {
    return (
      <>
        <style jsx>
          {`
            .wrapper {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 40px;
              margin-bottom: 40px;
              width: fit-content;
            }
            ::-webkit-scrollbar:horizontal {
              height: 8px;
              background-color: red;
            }
            ::-webkit-scrollbar-thumb:horizontal {
              background: #000;
              border-radius: 10px;
            }
          `}
        </style>
        <Modal.Body>
          <div
            // style={{
            //   display: "flex",
            //   flexDirection: "column",
            //   alignItems: "flex-start",
            //   gap: "40px",
            //   marginBottom: "40px",
            //   width: "fit-content",
            // }}
            className="wrapper"
          >
            <Box minHeight="260px">
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "40px",
                }}
              >
                <Box>
                  <Sidebar>
                    <Sidebar.Content
                      isSelected={selectedSidebar[0]}
                      onClick={() => KlikMenu1("0")}
                    >
                      Semua
                    </Sidebar.Content>
                    <Sidebar.Content
                      onClick={() => KlikMenu1("1")}
                      isSelected={selectedSidebar[1]}
                    >
                      Lamaran Terkirim
                    </Sidebar.Content>
                    <Sidebar.Content
                      onClick={() => KlikMenu1("2")}
                      isSelected={selectedSidebar[2]}
                    >
                      Diproses
                    </Sidebar.Content>
                    <Sidebar.Content
                      onClick={() => KlikMenu1("3")}
                      isSelected={selectedSidebar[3]}
                    >
                      Undangan Interview
                    </Sidebar.Content>
                    <Sidebar.Content
                      onClick={() => KlikMenu1("4")}
                      isSelected={selectedSidebar[4]}
                    >
                      Berhasil
                    </Sidebar.Content>
                    <Sidebar.Content
                      onClick={() => KlikMenu1("5")}
                      isSelected={selectedSidebar[5]}
                    >
                      Gagal
                    </Sidebar.Content>
                  </Sidebar>
                </Box>
                <Box style={{ width: "376px", minWidth: "376px" }}>
                  <Heading4>
                    {bar == 0 && "Semua"}
                    {bar == 1 && "Lamaran Terkirim"}
                    {bar == 2 && "Diproses"}
                    {bar == 3 && "Undangan Interview"}
                    {bar == 4 && "Berhasil"}
                    {bar == 5 && "Gagal"}
                  </Heading4>
                  <br />
                  <Body1>
                    {bar == 0 && parse(isiBar0)}
                    {bar == 1 && parse(isiBar1)}
                    {bar == 2 && parse(isiBar2)}
                    {bar == 3 && parse(isiBar3)}
                    {bar == 4 && parse(isiBar4)}
                    {bar == 5 && parse(isiBar5)}
                  </Body1>
                </Box>
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <PageControl
                steps={variant}
                // steps={bar}
                activeStep={bar}
              />
            </Box>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {bar > 0 && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              <RectangleButton
                size="large"
                state="alternate"
                customStyle={{ width: "100%", maxWidth: 240 }}
                onClick={() => handleButton("back")}
              >
                Kembali
              </RectangleButton>
            </div>
          )}
          {bar <= 4 ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <RectangleButton
                size="large"
                customStyle={{ width: "100%", maxWidth: 240 }}
                onClick={() => handleButton("continue")}
              >
                Lanjut
              </RectangleButton>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <RectangleButton
                size="large"
                customStyle={{ width: "100%", maxWidth: 240 }}
                onClick={() => handleButton("cancel")}
              >
                Tutup
              </RectangleButton>
            </div>
          )}
        </Modal.Footer>
      </>
    );
  };

  return (
    <>
      <Modal show={isOpen}>
        <Box m="24px" mb="24px">
          <Modal.Header>
            <Header>
              <Heading3>FAQ Status Lamaran</Heading3>
            </Header>
          </Modal.Header>

          <ModalBody1 />
        </Box>
      </Modal>
    </>
  );
}
