import React, { useState, useEffect, useRef } from "react";
import {
  Body1,
  Body2,
  Body3,
  Heading3,
  Heading4,
  Heading6,
  Font,
} from "../../../components/Atom/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import parse from "html-react-parser";
import { Box } from "@mui/system";
import InputTextField from "../../../components/Atom/Input Field/TextField";
import InputTextArea from "../../../components/Atom/Input Field/TextArea";
import InputSelectField from "../../../components/Atom/Input Field/SelectField";
import { Colors, Elevation, Radius } from "../../../themes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import CheckboxButton from "../../../components/Atom/Selection Control/Checkbox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useOutsideAlerter from "../../../utils/handleClickOutside";
import BottomBar from "./BottomBar";
import {
  isMobile,
  isTablet,
  isSmallScreen,
} from "../../../utils/useMediaQuery";
import { AddButton, EditButton, ActionButton } from "./Button";

import { Checkbox } from "@mui/material";
import InputDatePicker from "../../../components/Atom/DatePicker";
import moment from "moment/moment";

export default function Experience({
  // Mobile,
  isLoading,
  data,
  handleSaveDB,
  showForm,
  setShowForm,
  master,
  date,
}) {
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();
  const Dekstop = !Mobile && !Tablet && !SmallScreen;

  const months = date?.months;
  const years = date?.years;

  const isEmpty = data?.length === 0;

  const [form, setForm] = useState({});

  const handleForm = (key, val) => setForm({ ...form, [key]: val });

  useEffect(() => {
    if (!Mobile && isEmpty) {
      setShowForm({ status: true, value: `add` });
    } else {
      setShowForm({ status: false });
    }
  }, [Mobile]);

  return (
    <>
      {isLoading && (
        <Box className="center">
          <CircularProgress />
        </Box>
      )}

      {!isLoading && (
        <Box
        // sx={{ height: "100%", maxHeight: `100%`, overflow: `auto` }}
        >
          {/* Header */}
          <Box className="d-flex-fullwidth" mb={Mobile ? 0 : `40px`}>
            {!Mobile && <Heading3>Pengalaman Kerja</Heading3>}
            {!showForm?.status && (
              <AddButton
                handleClick={() => {
                  setForm({});
                  setShowForm({ status: true, value: `add` });
                }}
              />
            )}
          </Box>

          {/* FORM VIEW */}
          {showForm?.status && (
            <>
              {/* POSISI & NAMA PERUSAHAAN */}
              <Box
                className="d-flex"
                flexDirection={Mobile ? `column` : `row`}
                gap={Mobile ? `16px` : `24px`}
                mb={Mobile ? `16px` : `40px`}
              >
                <InputTextField
                  fullWidth
                  minWidth="0"
                  defaultValue={form?.job_position}
                  label="Posisi Pekerjaan"
                  handleChange={(val) => handleForm("job_position", val)}
                />
                <InputTextField
                  fullWidth
                  minWidth="0"
                  defaultValue={form?.job_position}
                  label="Nama Perusahaan"
                />
              </Box>

              {/* NEGARA & KOTA */}
              <Box
                className="d-flex"
                gap={Mobile ? `8px` : `24px`}
                mb={Mobile ? `16px` : `40px`}
              >
                <Box width="100%">
                  <InputSelectField
                    label="Negara*"
                    minWidth="0px"
                    fullWidth
                    defaultValue={
                      master?.countries?.find((x) => x.id === form?.country_id)
                        ?.name
                    }
                    options={master?.countries?.map((country) => {
                      return { label: country?.name, value: country?.id };
                    })}
                    handleChange={(val) => {
                      if (val !== 62)
                        form?.location_id && handleForm("location_id", null);
                      handleForm("country_id", val);
                    }}
                  />
                </Box>
                <Box width="100%">
                  <InputSelectField
                    disable={form?.country_id !== 62}
                    label="Kota*"
                    minWidth="0px"
                    fullWidth
                    defaultValue={
                      master?.locations?.find((x) => x.id === form?.location_id)
                        ?.name
                    }
                    options={master?.locations?.map((location) => {
                      return { label: location?.name, value: location?.id };
                    })}
                    handleChange={(val) => handleForm("location_id", val)}
                  />
                </Box>
              </Box>

              {/* TANGGAL / BULAN */}
              {Mobile && (
                <Box mb="24px">
                  <Box mb="16px">
                    <Font
                      type={Mobile ? `Body3` : `Body2`}
                      color={Colors.neutral.brown_light_grey}
                      mb="8px"
                    >
                      {`Tanggal Mulai*`}
                    </Font>
                    <InputDatePicker
                      value={
                        form?.start_month &&
                        form?.start_year &&
                        `${months[form?.start_month - 1]} ${form?.start_year}`
                      }
                      handleChange={(e) => {
                        handleForm(
                          "start_month",
                          moment(new Date(e)).format("MM")
                        );
                        handleForm(
                          "start_year",
                          moment(new Date(e)).format("YYYY")
                        );
                      }}
                    />
                  </Box>

                  <Box>
                    <Font
                      type={Mobile ? `Body3` : `Body2`}
                      color={
                        form?.isChecked
                          ? Colors.neutral.light_grey
                          : Colors.neutral.brown_light_grey
                      }
                      mb="8px"
                    >
                      Tanggal Berakhir (atau ekspetasi)
                    </Font>
                    <InputDatePicker
                      isDisabled={form?.isChecked}
                      value={
                        form?.end_month &&
                        form?.end_year &&
                        `${months[form?.end_month - 1]} ${form?.end_year}`
                      }
                      handleChange={(e) => {
                        handleForm(
                          "end_month",
                          moment(new Date(e)).format("MM")
                        );
                        handleForm(
                          "end_year",
                          moment(new Date(e)).format("YYYY")
                        );
                      }}
                    />
                    <Box className="d-flex" gap="4px" mt="8px">
                      <Checkbox
                        defaultChecked={form?.isChecked}
                        onChange={(e) => {
                          handleForm("end_month", "");
                          handleForm("end_year", "");
                          handleForm("isChecked", e.target.checked);
                        }}
                        sx={{ padding: 0 }}
                      />
                      <Font
                        type={Mobile ? `Body2` : `Body1`}
                        color={
                          form?.isChecked
                            ? Colors.primary.mid_blue
                            : Colors.neutral.brown_grey
                        }
                      >
                        Saya masih bekerja di sini
                      </Font>
                    </Box>
                  </Box>
                </Box>
              )}

              {!Mobile && (
                <>
                  <Box
                    sx={{
                      display: `flex`,
                      flexDirection: Mobile ? `column` : `row`,
                      width: `100%`,
                    }}
                    gap="24px"
                    mb="8px"
                  >
                    <Box width="100%">
                      <Font
                        type={Mobile ? `Body3` : `Body2`}
                        color={Colors.neutral.brown_light_grey}
                      >
                        {`Tanggal Mulai*`}
                      </Font>
                    </Box>
                    <Box width="100%">
                      <Font
                        type={Mobile ? `Body3` : `Body2`}
                        color={
                          form?.isChecked
                            ? Colors.neutral.light_grey
                            : Colors.neutral.brown_light_grey
                        }
                      >
                        Tanggal Berakhir (atau ekspetasi)
                      </Font>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: `flex`,
                      flexDirection: Mobile ? `column` : `row`,
                      width: `100%`,
                    }}
                    gap="24px"
                    mb="40px"
                  >
                    {/* START */}
                    <Box
                      sx={{
                        display: `flex`,
                        flexDirection: Mobile ? `column` : `row`,
                        width: `100%`,
                      }}
                      gap="24px"
                      width="100%"
                    >
                      <Box width="100%">
                        <InputSelectField
                          label="Bulan"
                          minWidth="0px"
                          fullWidth
                          defaultValue={
                            form?.start_month && months[form?.start_month - 1]
                          }
                          options={months?.map((month, index) => {
                            return {
                              label: month,
                              value:
                                index + 1 < 10 ? `0${index + 1}` : index + 1,
                            };
                          })}
                          handleChange={(val) => handleForm("start_month", val)}
                        />
                      </Box>

                      <Box width="100%">
                        <InputSelectField
                          label="Tahun"
                          minWidth="0px"
                          fullWidth
                          defaultValue={form?.start_year}
                          options={years?.map((year) => {
                            return { label: year, value: year };
                          })}
                          handleChange={(val) => handleForm("start_year", val)}
                        />
                      </Box>
                    </Box>

                    {/* END */}
                    <Box width="100%">
                      <Box
                        sx={{
                          display: `flex`,
                          flexDirection: Mobile ? `column` : `row`,
                          width: `100%`,
                        }}
                        gap="24px"
                      >
                        <Box width="100%">
                          <InputSelectField
                            disable={form?.isChecked}
                            label="Bulan"
                            minWidth="0px"
                            fullWidth
                            defaultValue={
                              form?.end_month && months[form?.end_month - 1]
                            }
                            options={months?.map((month, index) => {
                              return {
                                label: month,
                                value:
                                  index + 1 < 10 ? `0${index + 1}` : index + 1,
                              };
                            })}
                            handleChange={(val) => handleForm("end_month", val)}
                          />
                        </Box>

                        <Box width="100%">
                          <InputSelectField
                            disable={form?.isChecked}
                            label="Tahun"
                            minWidth="0px"
                            fullWidth
                            defaultValue={form?.end_year}
                            options={years?.map((year) => {
                              return { label: year, value: year };
                            })}
                            handleChange={(val) => handleForm("end_year", val)}
                          />
                        </Box>
                      </Box>
                      {/* CHECKBOX */}
                      <Box className="d-flex" gap="4px" mt="8px">
                        <Checkbox
                          defaultChecked={form?.isChecked}
                          onChange={(e) => {
                            handleForm("end_month", "");
                            handleForm("end_year", "");
                            handleForm("isChecked", e.target.checked);
                          }}
                          sx={{ padding: 0 }}
                        />
                        <Font
                          type={Mobile ? `Body2` : `Body1`}
                          color={
                            form?.isChecked
                              ? Colors.primary.mid_blue
                              : Colors.neutral.brown_grey
                          }
                        >
                          Saya masih bekerja di sini
                        </Font>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}

              {/* FUNGSI & INDUSTRI PERUSAHAAN */}
              <Box
                className="d-flex"
                flexDirection={Mobile ? `column` : `row`}
                gap={Mobile ? `16px` : `24px`}
                mb={Mobile ? `16px` : `40px`}
              >
                <Box width="100%">
                  <InputSelectField
                    label="Fungsi Pekerjaan"
                    minWidth="0px"
                    fullWidth
                    defaultValue={
                      master?.countries?.find((x) => x.id === form?.country_id)
                        ?.name
                    }
                    options={master?.countries?.map((country) => {
                      return { label: country?.name, value: country?.id };
                    })}
                    handleChange={(val) => handleForm("job_function_id", val)}
                  />
                </Box>
                <Box width="100%">
                  <InputSelectField
                    label="Industri Perusahaan"
                    minWidth="0px"
                    fullWidth
                    defaultValue={
                      master?.locations?.find((x) => x.id === form?.location_id)
                        ?.name
                    }
                    options={master?.locations?.map((location) => {
                      return { label: location?.name, value: location?.id };
                    })}
                    handleChange={(val) => handleForm("industry_id", val)}
                  />
                </Box>
              </Box>

              {/* LEVEL & TIPE PEKERJAAN */}
              <Box
                className="d-flex"
                gap={Mobile ? `8px` : `24px`}
                mb={Mobile ? `16px` : `40px`}
              >
                <Box width="100%">
                  <InputSelectField
                    label="Level Pekerjaan"
                    minWidth="0px"
                    fullWidth
                    defaultValue={
                      master?.countries?.find((x) => x.id === form?.country_id)
                        ?.name
                    }
                    options={master?.countries?.map((country) => {
                      return { label: country?.name, value: country?.id };
                    })}
                    handleChange={(val) => handleForm("job_level_id", val)}
                  />
                </Box>
                <Box width="100%">
                  <InputSelectField
                    label="Tipe Pekerjaan"
                    minWidth="0px"
                    fullWidth
                    defaultValue={
                      master?.locations?.find((x) => x.id === form?.location_id)
                        ?.name
                    }
                    options={master?.locations?.map((location) => {
                      return { label: location?.name, value: location?.id };
                    })}
                    handleChange={(val) => handleForm("job_type_id", val)}
                  />
                </Box>
              </Box>

              {/* DESKRIPSI */}
              <InputTextArea
                label="Deskripsi Pekerjaan*"
                inputValue={form?.job_desc}
                fullWidth={true}
                handleChange={(e) =>
                  e.target.value.length <= 2000 &&
                  handleForm("job_desc", e.target.value)
                }
              />

              {showForm?.value === `edit` && Mobile && (
                <Box
                  sx={{
                    width: `fit-content`,
                    margin: `24px auto 40px auto`,
                    cursor: `pointer`,
                  }}
                  onClick={() => alert("hapus")}
                >
                  <Font type="Label" size="small" color={Colors.secondary.red}>
                    Hapus Pengalaman
                  </Font>
                </Box>
              )}
            </>
          )}

          {/* FILLED VIEW */}
          {!showForm?.status && (
            <Box
              display="flex"
              flexDirection="column"
              gap={Mobile ? `8px` : `40px`}
            >
              {data?.map((item, index) => {
                return (
                  <Box
                    key={index}
                    className="d-flex-fullwidth"
                    sx={{
                      alignItems: `flex-start !important`,
                      borderRadius: Mobile ? Radius.medium : 0,
                      boxShadow: Mobile ? Elevation.card : 0,
                      padding: Mobile ? `8px` : 0,
                    }}
                  >
                    <Box sx={{ display: `flex`, gap: `24px`, width: `100%` }}>
                      {/* Tanggal Mulai - Akhir (Dekstop) */}
                      <Box
                        sx={{
                          display: Dekstop ? `block` : `none`,
                          minWidth: Dekstop ? `240px` : 0,
                        }}
                      >
                        <Body1>
                          {index === 0
                            ? `Januari 2020 - Februari 2021`
                            : index === 1
                            ? `Februari 2021 - Maret 2022`
                            : `Agustus 2022 - Agustus 2024`}
                          {""}
                        </Body1>
                        <Body2 color={Colors.neutral.brown_grey}>
                          1 tahun 100 bulan
                        </Body2>
                      </Box>

                      <Box sx={{ width: `100%` }}>
                        <Font type={Dekstop ? `Heading3` : `Heading6`}>
                          {item?.job_position}
                        </Font>
                        <Font type={Dekstop ? `Body1` : `Body3`}>
                          Google {Mobile ? <br /> : "|"} Jakarta Selatan,
                          Indonesia
                        </Font>

                        {Mobile ? (
                          <>
                            <Body3 sx={{ my: `8px` }}>
                              Accociate • Contract
                            </Body3>
                            <Body3 sx={{ mb: `8px` }}>
                              Januari 2019 - Juni 2020
                              <span
                                style={{
                                  display: `block`,
                                  color: Colors.neutral.brown_light_grey,
                                }}
                              >
                                1 tahun 4 bulan
                              </span>
                            </Body3>
                          </>
                        ) : (
                          <Box mt="24px">
                            <Box
                              className="d-flex"
                              sx={{ wordBreak: `break`, gap: `24px` }}
                            >
                              <Font
                                type={Dekstop ? `Heading4` : `Heading6`}
                                minWidth={Dekstop ? `180px` : `100px`}
                                color={Colors.neutral.brown_light_grey}
                              >
                                Fungsi Pekerjaan
                              </Font>
                              <Font type={Dekstop ? `Body1` : `Body3`}>
                                {item?.job_position}
                              </Font>
                            </Box>
                            <Box
                              className="d-flex"
                              sx={{ wordBreak: `break`, gap: `24px` }}
                            >
                              <Font
                                type={Dekstop ? `Heading4` : `Heading6`}
                                minWidth={Dekstop ? `180px` : `100px`}
                                color={Colors.neutral.brown_light_grey}
                              >
                                Industri
                              </Font>
                              <Font type={Dekstop ? `Body1` : `Body3`}>
                                {item?.job_position}
                              </Font>
                            </Box>
                            <Box
                              className="d-flex"
                              sx={{ wordBreak: `break`, gap: `24px` }}
                            >
                              <Font
                                type={Dekstop ? `Heading4` : `Heading6`}
                                minWidth={Dekstop ? `180px` : `100px`}
                                color={Colors.neutral.brown_light_grey}
                              >
                                Level Pekerjaan
                              </Font>
                              <Font type={Dekstop ? `Body1` : `Body3`}>
                                {item?.job_position}
                              </Font>
                            </Box>
                            <Box
                              className="d-flex"
                              sx={{ wordBreak: `break`, gap: `24px` }}
                            >
                              <Font
                                type={Dekstop ? `Heading4` : `Heading6`}
                                minWidth={Dekstop ? `180px` : `100px`}
                                color={Colors.neutral.brown_light_grey}
                              >
                                Tipe Pekerjaan
                              </Font>
                              <Font type={Dekstop ? `Body1` : `Body3`}>
                                {item?.job_position}
                              </Font>
                            </Box>
                          </Box>
                        )}

                        <Font
                          type={Dekstop ? `Body1` : `Body3`}
                          // sx={
                          //   {
                          //     whiteSpace: "pre-wrap",
                          //     wordBreak: `break-word`,
                          //   }
                          // }
                          sx={{ mt: `24px`, "& ul": { pl: 2, mb: 0 } }}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: ` <ul>
                                            <li>Melaksanakan proses UX.</li>
                                            <li>Membuat prototype.</li>
                                        </ul>`,
                            }}
                          />
                        </Font>

                        {/* {item?.job_position} */}
                      </Box>
                    </Box>

                    <ActionButton
                      id={index}
                      handleEdit={() => {
                        setForm(item);
                        setShowForm({ status: true, value: `edit` });
                      }}
                      handleDelete={() => alert("Deleted Successfully!")}
                    />
                    {/* <EditButton
                  handleClick={() => {
                    setForm(item);
                    setShowForm({ status: true, value: `edit` });
                  }}
                /> */}
                  </Box>
                );
              })}
            </Box>
          )}

          {/* BOTTOM BAR */}
          {showForm?.status && (
            <BottomBar
              // disable={CheckingForm()}
              disable={false}
              showCancelButton={Mobile ? true : !isEmpty}
              handleCancel={() => {
                setShowForm({ status: false });
                const el = document.getElementsByClassName("main-content")[0];
                window.scrollTo({
                  top: Mobile ? 0 : el.offsetTop - 80,
                  behavior: "smooth",
                });
              }}
              handleSubmit={() => {
                // save to DB
                // ...
                // TESTING

                const arr = [...data];

                // Add
                if (showForm?.value === `add`) {
                  arr.push({
                    id: Math.floor(Math.random() * 899) + 100,
                    ...form,
                  });
                }

                // Update
                if (showForm?.value === `edit`) {
                  const index = arr.findIndex((x) => x.id === form?.id);
                  arr[index] = form;
                }

                handleSaveDB({ experience: arr });
                setShowForm({ status: false });
              }}
              cancelBtnTitle="BATAL"
              submitBtnTitle="SIMPAN"
            />
          )}
        </Box>
      )}
    </>
  );
}
