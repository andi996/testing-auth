import React, { useState, useEffect } from "react";
import Modal from "./modal";
import { Body1, Body3, Heading3, Heading4 } from "../../Atom/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import RectangleButton from "../../Atom/Button/RectangleButton";
import { Colors, Radius } from "../../../themes";
import RadioButton from "../../Atom/Selection Control/Radio";
// import styled from "@emotion/styled/base";
import Box from "@mui/material/Box";
import InputTextArea from "../../Atom/Input Field/TextArea";
import InputPictureField from "../../Atom/Input Field/PictureField";
import { Container, Col, Row } from "react-grid-system";

export default function ModalPopup({ isOpen, onClick }) {
  const [selectedReport, setSelectedReport] = useState("");
  const [description, setDescription] = useState("");
  const [imageFilled, setImageFilled] = useState(0);
  const [imageValue, setImageValue] = useState([false, false, false]);

  function getBase64(e, index) {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let newValue = [...imageValue];
      newValue[index] = reader.result;
      setImageValue(newValue);
      setImageFilled(index + 1);
    };

    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  useEffect(() => {
    setSelectedReport("");
    setDescription("");
  }, [isOpen]);

  return (
    <>
      <Modal show={isOpen}>
        <Box m="24px">
          <Modal.Header>
            <Box className="d-flex-fullwidth">
              <Heading3>Lapor Perusahaan</Heading3>
              <CloseIcon style={{ cursor: `pointer` }} onClick={onClick} />
            </Box>
          </Modal.Header>

          <Modal.Body>
            <Box minHeight="358px">
              <Heading3
                color={Colors.neutral.greyish_brown}
                marginBottom={`16px`}
              >
                Laporan
              </Heading3>
              <Box ml="5px">
                <RadioButton
                  variant="left"
                  options={[
                    { label: `Informasi Tidak Lengkap`, value: "1" },
                    {
                      label: `Lowongan Penipuan (Meminta bayaran/ Lowongan Mencurigakan)`,
                      value: "2",
                    },
                    {
                      label: `Konten mengandung diskriminatif,dan sara`,
                      value: "3",
                    },
                    {
                      label: `Perusahaan tidak sesuai ( contoh: Alamat, Deskripsi)`,
                      value: "4",
                    },
                    { label: `Lainnya`, value: "5" },
                  ]}
                  onChange={(e) => setSelectedReport(e.target.value)}
                />
              </Box>
              <Heading3
                color={Colors.neutral.greyish_brown}
                marginTop={`24px`}
                marginBottom={`16px`}
              >
                Kronologi
              </Heading3>
              <InputTextArea
                label={`Tuliskan kronologi penipuan, jika terdapat bukti video harap diungah melalui youtube dan dapat menyertakan link disini*`}
                inputValue={description}
                fullWidth={true}
                handleChange={(e) =>
                  e.target.value.length <= 2000 &&
                  setDescription(e.target.value)
                }
              />
              <Box
                className="d-flex-fullwidth"
                color={Colors.neutral.brown_grey}
              >
                <Body3>Minimal 20 Kata</Body3>
                <Body3>{`${description?.length}/2000`}</Body3>
              </Box>

              <Heading3
                color={Colors.neutral.greyish_brown}
                marginTop={`24px`}
                marginBottom={`16px`}
              >
                Unggah Bukti
              </Heading3>
              <Container>
                <Row>
                  <Col lg={3}>
                    <InputPictureField
                      value={imageValue[0]}
                      onChange={(e) => getBase64(e, 0)}
                    />
                  </Col>
                  {imageFilled > 0 && (
                    <Col lg={3}>
                      <InputPictureField
                        value={imageValue[1]}
                        onChange={(e) => getBase64(e, 1)}
                      />
                    </Col>
                  )}
                  {imageFilled > 1 && (
                    <Col lg={3}>
                      <InputPictureField
                        value={imageValue[2]}
                        onChange={(e) => getBase64(e, 2)}
                      />
                    </Col>
                  )}
                </Row>
              </Container>
            </Box>
          </Modal.Body>

          <Modal.Footer>
            <RectangleButton
              size="large"
              disable={
                selectedReport && description.length >= 20 ? false : true
              }
              customStyle={{ width: 240 }}
              onClick={onClick}
              // onClick={() => handleButton("continue")}
            >
              Lapor Perusahaan
            </RectangleButton>
          </Modal.Footer>
        </Box>
      </Modal>
    </>
  );
}
