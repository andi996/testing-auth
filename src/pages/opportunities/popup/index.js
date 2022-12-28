import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Colors, Radius, Elevation } from "../../../themes";
import {
  Label,
  Body1,
  Body2,
  Body3,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Font,
} from "../../../components/Atom/Typography";
import ProgressBar from "../../../components/Atom/ProgressBar";
import styled from "@emotion/styled/base";
import { Box } from "@mui/system";
import Toaster from "../../../components/Molecul/Toaster";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import ChevronCircleButton from "../../../components/Atom/Button/CircleButton/Chevron";
import Divider from "../../../components/Atom/Divider";
import useMediaQuery from "../../../utils/useMediaQuery";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import JobCard from "../../../components/Organism/Card/JobCard";
import CheckboxButton from "../../../components/Atom/Selection Control/Checkbox";
import RadioButton from "../../../components/Atom/Selection Control/Radio";
import Dialog from "../../../components/Molecul/Modal/Dialog";

// MUI
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { isMobile } from "../../../utils/useMediaQuery";
import ModalContainer from "../modal";

import { applyOpportunity } from "../../../redux/action/OpportunityAction";

export default function Popup({ userId, data, show, onClose, cvs, cb }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state?.opportunity);
  const Mobile = isMobile();

  const [showToaster, setShowToaster] = useState(false);
  const [labelToaster, setLabelToaster] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [closeConfirm, setCloseConfirm] = useState(false);

  const [bar, setBar] = useState(0); //0
  const [isFinished, setIsFinished] = useState(false);

  // Second Step State
  const [selectedCV, setSelectedCV] = useState(); //value of CV
  const [removedCV, setRemovedCV] = useState({ id: null, fileName: null });
  const [showEditView, setShowEditView] = useState();

  const submitTitle =
    bar === 2 ? (showEditView ? "Review" : "Kirim") : "Lanjutkan";
  const cancelTitle = bar === 2 && showEditView ? null : "Kembali";

  const handleCancel = () => {
    const num = bar - 1;
    setBar(num);
  };

  const handleSubmit = () => {
    const num = bar + 1;

    if (num <= 2) setBar(num);
    else if (showEditView) setShowEditView(false);
    else {
      const result = dispatch(
        applyOpportunity({
          user_id: userId,
          opportunity_id: data?.id,
        })
      );
      result
        .then(() => setIsFinished(true))
        .catch((err) => console.log("err", err));
    }
  };

  const Title = () => (
    <Font type={Mobile ? `Heading5` : `Heading3`}>
      Lamar ke
      <span style={{ color: Colors.primary.mid_blue }}>
        {` ${data?.company_name} `}
      </span>
      sebagai
      <span style={{ color: Colors.primary.mid_blue }}>
        {` ${data?.job_position} `}
      </span>
    </Font>
  );

  const onFileChange = (e) => {
    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    const file = e.target.files[0];

    if (file) {
      const id = Math.floor(Math.random() * 899999) + 100000;
      const fileName = file.name;
      const uniqueFileName = `${fileName}-${date.getTime()}`;
      const fileType = file.type;
      const fileSize = file.size;

      if (fileType === "" || fileType === "application/pdf") {
        if (fileSize <= 5242880) {
          if (cvs?.length === 0) {
            setSelectedCV(id);
          }

          const newdata = [
            ...cvs,
            {
              id: id,
              fileName: fileName,
              filePath: URL.createObjectURL(file),
              uniqueFileName: uniqueFileName,
              upload_date: currentDate,
            },
          ];
          cb("SET_USER", newdata);
        } else {
          alert("Ukuran file melebihi 5mb!");
        }
      } else {
        alert("Hanya boleh upload file DOCS/PDF!");
      }
    }

    e.target.value = null;
  };

  const handleDeleteCV = () => {
    const data_ = cvs?.filter((x) => x?.id !== parseInt(removedCV?.id));
    cb("SET_USER", data_);
    setOpenDialog(false);

    setShowToaster(false);
    setTimeout(() => {
      setShowToaster(true);
      setLabelToaster(
        `${
          cvs?.find((x) => x?.id === parseInt(removedCV?.id))?.fileName
        } telah dihapus`
      );
    }, 100);
  };

  const CheckIsButtonDisabled = () => {
    let status = false;
    if (bar === 1 || (bar === 2 && showEditView))
      if (cvs?.length <= 0) status = true;
    return status;
  };

  useEffect(() => {
    setSelectedCV(cvs[0]?.id);
  }, [data]);

  // Component

  const Contact_View = () => {
    return (
      <>
        <Box
          className="d-flex"
          mb={Mobile ? `16px` : `24px`}
          gap={Mobile ? `8px` : `16px`}
        >
          {bar === 0 && (
            <img src="/images/Principle/Logo/Profile.svg" alt="Profile" />
          )}
          <Font type={bar === 0 || !Mobile ? `Heading3` : `Heading4`}>
            Info Kontak
          </Font>
        </Box>

        <Box
          className="d-flex"
          alignItems="flex-start !important"
          flexDirection="column"
          gap="16px"
        >
          <Font type={Mobile ? `Body2` : `Body1`}>
            <Box style={{ color: Colors.neutral.brown_light_grey }}>Nama</Box>
            <Box style={{ color: Colors.neutral.greyish_brown }}>Maudy</Box>
          </Font>

          <Font type={Mobile ? `Body2` : `Body1`}>
            <Box style={{ color: Colors.neutral.brown_light_grey }}>Email</Box>
            <Box style={{ color: Colors.neutral.greyish_brown }}>
              maudy123456789@gmail.com
            </Box>
          </Font>

          <Font type={Mobile ? `Body2` : `Body1`}>
            <Box style={{ color: Colors.neutral.brown_light_grey }}>
              Nomor Hp
            </Box>
            <Box style={{ color: Colors.neutral.greyish_brown }}>
              0812345678999
            </Box>
          </Font>
        </Box>
      </>
    );
  };

  const CV_View = () => {
    return (
      <>
        <Box mb={Mobile ? `16px` : `40px`}>
          <Heading3 mb={Mobile ? `8px` : `16px`}>Pilih CV</Heading3>
          <Font type={Mobile ? `Body3` : `Body1`}>
            Pastikan kamu menggunakan CV paling update dan sesuai dengan
            lowongan yang kamu daftar
          </Font>
        </Box>

        <RadioGroup
          value={selectedCV}
          defaultValue={selectedCV}
          onChange={(e) => setSelectedCV(e.target.value)}
        >
          {cvs?.map((item, index) => {
            return (
              <Box
                key={index}
                className="d-flex-fullwidth"
                sx={{ ":not(:last-child)": { mb: `8px` } }}
              >
                <FormControlLabel
                  label={<Font type="Body2">{item?.fileName}</Font>}
                  value={item?.id}
                  control={<Radio />}
                  sx={{
                    ml: 0,
                    gap: `4px`,
                    "& .MuiRadio-root": {
                      padding: 0,
                      color:
                        item?.id === parseInt(selectedCV)
                          ? Colors.primary.mid_blue
                          : Colors.neutral.brown_light_grey,
                    },
                    "& .MuiFormControlLabel-label": {
                      color:
                        item?.id === parseInt(selectedCV)
                          ? Colors.primary.mid_blue
                          : Colors.neutral.brown_grey,
                      "& p": {
                        minWidth: Mobile ? `100px` : `300px`,
                        maxWidth: Mobile ? `100px` : `300px`,
                        whiteSpace: `nowrap`,
                        textOverflow: `ellipsis`,
                        overflow: `hidden`,
                      },
                    },
                  }}
                />
                <Box
                  className="d-flex pointer"
                  style={{
                    width: `fit-content`,
                    flexDirection: Mobile ? `row-reverse` : `row`,
                    gap: `8px`,
                  }}
                >
                  <img
                    src="/images/Principle/Logo/Delete Trash.svg"
                    alt="delete"
                    onClick={() => {
                      setRemovedCV({
                        id: item?.id,
                        fileName: item?.fileName,
                      });
                      setOpenDialog(true);
                    }}
                  />
                  <Font type="Body2" color={Colors.secondary.clear_blue}>
                    {`Diupload ${item?.upload_date}`}
                  </Font>
                </Box>
              </Box>
            );
          })}
        </RadioGroup>

        <Box
          className="d-flex pointer"
          sx={{
            width: `fit-content !important`,
            padding: Mobile ? `8px` : 0,
            pl: 0,
            my: Mobile ? `16px` : `40px`,
            gap: `4px`,
            color:
              cvs.length < 5
                ? Colors.primary.mid_blue
                : Colors.neutral.brown_grey,
          }}
          onClick={(e) => {
            if (cvs.length < 5) {
              e.stopPropagation();
              document.getElementById("select-file").click();
            }
          }}
        >
          <input
            id="select-file"
            type="file"
            onChange={(e) => onFileChange(e)}
            style={{ display: `none` }}
          />
          <AddCircleIcon />
          <Font type={Mobile ? `Label` : `Body1`} size="small">
            Upload CV
          </Font>
        </Box>
      </>
    );
  };

  return (
    <>
      <ModalContainer
        loading={loading}
        show={show}
        title={<Title />}
        submitBtnTitle={isFinished ? false : submitTitle}
        cancelBtnTitle={isFinished ? false : bar > 0 && cancelTitle}
        handleBack={() => console.log("handleBack")}
        handleSubmit={() => handleSubmit()}
        handleCancel={() => handleCancel()}
        handleClose={() => (isFinished ? onClose() : setCloseConfirm(true))}
        isDisabled={CheckIsButtonDisabled()}
        position={closeConfirm && !isMobile ? `relative` : `fixed`}
      >
        {/* Close Confirmation Dekstop */}
        <ModalContainer
          show={!Mobile && show && closeConfirm}
          title={<Title />}
          submitBtnTitle="Lanjutkan"
          cancelBtnTitle="Batal"
          handleBack={() => console.log("handleBack")}
          handleSubmit={() => {
            setCloseConfirm(false);
            onClose();
          }}
          handleCancel={() => setCloseConfirm(false)}
          position="absolute"
          maxWidth="100%"
          zIndex={1050}
          bottom="unset"
          left={0}
          right={0}
        >
          <Body1 my="40px">
            Anda belum selesai mengirim lamaran, apakah anda yakin ingin menutup
            lamaran ini?
          </Body1>
        </ModalContainer>

        {/* Close Confirmation Mobile */}
        <Dialog
          show={Mobile && show && closeConfirm}
          title="Menutup Lamaran"
          description="Anda belum selesai mengirim lamaran, apakah anda yakin ingin menutup lamaran ini?"
          primaryButtonText="Lanjutkan"
          secondaryButtonText="Batal"
          handlePrimaryButton={() => {
            setCloseConfirm(false);
            onClose();
          }}
          handleSecondaryButton={() => setCloseConfirm(false)}
          handleClose={() => setCloseConfirm(false)}
        />

        {/* Delete Confirmation CV */}
        <Dialog
          show={show && openDialog}
          title="Hapus CV"
          description={`Apakah anda yakin untuk menghapus ${removedCV?.fileName}?`}
          primaryButtonText="Lanjutkan"
          secondaryButtonText="Batal"
          handlePrimaryButton={() => handleDeleteCV()}
          handleSecondaryButton={() => setOpenDialog(false)}
          handleClose={() => setOpenDialog(false)}
        />

        <Toaster
          open={showToaster}
          variant="success"
          noBar
          label={labelToaster}
          handleClick={() => setShowToaster(false)}
          setOpen={() => setShowToaster(false)}
        />

        {!isFinished && (
          <>
            <Box mb={Mobile ? `4px` : `40px`}>
              {Mobile && (
                <Box mb="8px">
                  <Title />
                </Box>
              )}
              <ProgressBar
                type={Mobile ? `mobile` : `dekstop`}
                variant="2 bar"
                state={bar}
              />
            </Box>

            {/* STEP 0 */}
            {bar === 0 && <Contact_View />}

            {bar === 1 && <CV_View />}

            {bar === 2 && (
              <>
                {!showEditView && (
                  <>
                    <Heading3 mb={Mobile ? `8px` : `20px`}>
                      Profile Review
                    </Heading3>
                    <Box
                      sx={{
                        border: `1px solid ${Colors.neutral.light_grey}`,
                        borderRadius: Radius.small,
                        padding: `16px`,
                        mb: Mobile ? `8px` : `20px`,
                      }}
                    >
                      <Contact_View />
                    </Box>
                    <Box
                      sx={{
                        border: `1px solid ${Colors.neutral.light_grey}`,
                        borderRadius: Radius.small,
                        padding: `16px`,
                      }}
                    >
                      <Box className="d-flex-fullwidth" mb="16px">
                        <Font type={Mobile ? `Heading4` : `Heading3`}>CV</Font>
                        <Box
                          className="d-flex pointer"
                          width="fit-content !important"
                          gap="4px"
                          color={Colors.primary.mid_blue}
                          onClick={() => setShowEditView(true)}
                        >
                          <EditIcon />
                          <Font type="Label" size="small">
                            Edit
                          </Font>
                        </Box>
                      </Box>

                      <FormControlLabel
                        label={
                          <Font type="Body2">
                            {
                              cvs?.find((x) => x?.id === parseInt(selectedCV))
                                ?.fileName
                            }
                          </Font>
                        }
                        control={<Radio defaultChecked={true} />}
                        sx={{
                          ml: 0,
                          gap: `4px`,
                          "& .MuiRadio-root": {
                            padding: 0,
                            color: Colors.primary.mid_blue,
                          },
                          "& .MuiFormControlLabel-label": {
                            color: Colors.primary.mid_blue,
                            "& p": {
                              minWidth: Mobile ? `100px` : `300px`,
                              maxWidth: Mobile ? `100px` : `300px`,
                              whiteSpace: `nowrap`,
                              textOverflow: `ellipsis`,
                              overflow: `hidden`,
                            },
                          },
                        }}
                      />
                    </Box>

                    <CheckboxButton
                      defaultValue="subscribe"
                      variant="left"
                      options={[
                        {
                          label: (
                            <Font type={Mobile ? `Body2` : `Body1`}>
                              Subscribe Microsoft
                            </Font>
                          ),
                          value: "subscribe",
                        },
                      ]}
                    />
                  </>
                )}

                {showEditView && <CV_View />}
              </>
            )}
          </>
        )}

        {isFinished && (
          <Box className="d-flex center" flexDirection="column" gap="16px">
            <Font
              type={Mobile ? `Heading4` : `Heading3`}
              color={Colors.primary.mid_blue}
            >
              Lamaran Berhasil Terkirim,
              <br /> Kerjakan Test Sekarang?
            </Font>
            <Box>
              <img
                src="/images/Principle/Illustration/Success.png"
                alt="success.png"
              />
            </Box>
            <Box
              className="d-flex"
              flexDirection="column"
              gap="8px"
              maxWidth="240px"
            >
              <RectangleButton
                size={Mobile ? `small` : `large`}
                fullWidth
                customStyle={{ borderRadius: `4px`, margin: 0 }}
                onClick={() => onClose()}
              >
                Mulai Test
              </RectangleButton>
              <RectangleButton
                state="alternate"
                fullWidth
                size={Mobile ? `small` : `large`}
                customStyle={{ borderRadius: `4px`, margin: 0 }}
                onClick={() => onClose()}
              >
                Kerjakan Nanti
              </RectangleButton>
            </Box>
          </Box>
        )}
      </ModalContainer>
    </>
  );
}
