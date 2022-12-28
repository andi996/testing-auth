import React, { useState, useEffect } from "react";
import Modal from "./modal/ReportModal";
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
import BottomSheet from "../Bottom Sheet";
import { isMobile } from "../../../utils/useMediaQuery";
import axios from "axios";

export default function ReportPopup({
  userId,
  opportunityId,
  isOpen,
  handleClose,
}) {
  const Mobile = isMobile();

  const [loading, setLoading] = useState(false);
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

  const handleSubmitReport = async () => {
    setLoading(true);
    const reportData = {
      user_id: userId,
      opportunity_id: opportunityId,
      reason: parseInt(selectedReport),
      chronology: description,
      image_urls: imageValue,
    };

    await axios({
      method: `POST`,
      url: `https://karir-ms.staging.qareer.com/v1/opportunity/report`,
      data: reportData,
      // headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setIsShow(false);
        setTimeout(() => {
          setLoading(false);
          handleClose();
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  return Mobile ? (
    <BottomSheet
      loading={loading}
      variant="modal"
      visible={isOpen}
      onClose={handleClose}
      title="Lapor Lowongan"
      submitBtnTitle="Lapor Lowongan"
      onSubmit={() => handleSubmitReport()}
    >
      <Box
        sx={{
          margin: `24px 8px 32px 8px`,
          background: "white",
        }}
      >
        <Heading4 color={Colors.neutral.greyish_brown} marginBottom={`8px`}>
          Laporan
        </Heading4>
        <RadioButton
          type="mobile"
          variant="left"
          gap="16px"
          options={[
            { label: `Informasi Tidak Lengkap`, value: 1 },
            {
              label: `Lowongan Penipuan (Meminta bayaran/ Lowongan Mencurigakan)`,
              value: 0,
            },
            {
              label: `Konten mengandung diskriminatif,dan sara`,
              value: 2,
            },
            {
              label: `Perusahaan tidak sesuai ( contoh: Alamat, Deskripsi)`,
              value: 3,
            },
            { label: `Lainnya`, value: 4 },
          ]}
          onChange={(e) => setSelectedReport(e.target.value)}
        />
        <Heading4
          color={Colors.neutral.greyish_brown}
          marginTop={`16px`}
          marginBottom={`8px`}
        >
          Kronologi
        </Heading4>
        <InputTextArea
          label={`Tuliskan kronologi penipuan, jika terdapat bukti video harap diungah melalui youtube dan dapat menyertakan link disini*`}
          inputValue={description}
          fullWidth
          handleChange={(e) =>
            e.target.value.length <= 2000 && setDescription(e.target.value)
          }
          characterCount={2000}
          helperText="Minimal 30 kata"
        />
        <Heading4
          color={Colors.neutral.greyish_brown}
          marginTop={`16px`}
          marginBottom={`20px`}
        >
          Unggah Bukti
        </Heading4>
        <Box sx={{ display: `flex`, flex: `wrap`, gap: `16px` }}>
          <InputPictureField
            value={imageValue[0]}
            onChange={(e) => getBase64(e, 0)}
          />

          {imageFilled > 0 && (
            <InputPictureField
              value={imageValue[1]}
              helperText={false}
              onChange={(e) => getBase64(e, 1)}
            />
          )}

          {imageFilled > 1 && (
            <InputPictureField
              value={imageValue[2]}
              helperText={false}
              onChange={(e) => getBase64(e, 2)}
            />
          )}
        </Box>
      </Box>
    </BottomSheet>
  ) : (
    <Modal
      show={isOpen}
      loading={loading}
      title="Lapor Lowongan"
      submitBtnTitle="Lapor Lowongan"
      handleSubmit={() => handleSubmitReport()}
      handleClose={handleClose}
      isDisabled={false}
    >
      <Box minHeight="358px">
        <Heading3 color={Colors.neutral.greyish_brown} marginBottom={`16px`}>
          Laporan
        </Heading3>
        <RadioButton
          variant="left"
          options={[
            { label: `Informasi Tidak Lengkap`, value: 1 },
            {
              label: `Lowongan Penipuan (Meminta bayaran/ Lowongan Mencurigakan)`,
              value: 0,
            },
            {
              label: `Konten mengandung diskriminatif,dan sara`,
              value: 2,
            },
            {
              label: `Perusahaan tidak sesuai ( contoh: Alamat, Deskripsi)`,
              value: 3,
            },
            { label: `Lainnya`, value: 4 },
          ]}
          onChange={(e) => setSelectedReport(e.target.value)}
        />
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
            e.target.value.length <= 2000 && setDescription(e.target.value)
          }
          characterCount={2000}
          helperText="Minimal 30 kata"
        />

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
                  helperText={false}
                  onChange={(e) => getBase64(e, 2)}
                />
              </Col>
            )}
          </Row>
        </Container>
      </Box>
    </Modal>
  );
}
