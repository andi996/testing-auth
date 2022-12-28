import { Error } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import InputSelectField from "../../../components/Atom/Input Field/SelectField";
import InputTextArea from "../../../components/Atom/Input Field/TextArea";
import InputTextField from "../../../components/Atom/Input Field/TextField";
import { Body2, Body3, Font } from "../../../components/Atom/Typography";
import { Colors } from "../../../themes";
import InputDatePicker from "../../../components/Atom/DatePicker";
import moment from "moment";

const Education = ({
  Mobile,
  form,
  handleForm,
  handleBrowseFile,
  handleRemoveFile,
  isExperienced,
  data,
}) => {
  const handleChange = (key, val) => {
    handleForm(`education`, { [key]: val });
  };

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const years = [
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
  ];

  const classes = {
    FormWrapper: {
      display: `flex`,
      flexDirection: Mobile ? `column` : `row`,
      width: `100%`,
    },
  };

  return (
    <Box sx={{ ml: Mobile ? 0 : `64px` }} mb={Mobile ? 0 : `40px`}>
      <Box mb={Mobile ? `16px` : `40px`}>
        <InputTextField
          label="Nama Institusi*"
          minWidth="0px"
          fullWidth
          defaultValue={form?.school_name}
          handleChange={(val) => handleChange("school_name", val)}
        />
      </Box>

      {/* GELAR / JURUSAN */}
      <Box
        sx={classes.FormWrapper}
        gap={Mobile ? `16px` : `24px`}
        mb={Mobile ? `16px` : `40px`}
      >
        <Box width="100%">
          <InputSelectField
            label="Gelar*"
            minWidth="0px"
            fullWidth
            defaultValue={
              data?.degrees?.find((x) => x.id === form?.degree_id)?.name
            }
            options={data?.degrees?.map((item) => {
              return { label: item?.name, value: item?.id };
            })}
            handleChange={(val) => handleChange("degree_id", val)}
          />
        </Box>

        <Box width="100%">
          <InputSelectField
            label="Jurusan*"
            minWidth="0px"
            fullWidth
            defaultValue={
              data?.majors?.find((x) => x.id === form?.major_id)?.name
            }
            options={data?.majors?.map((item) => {
              return { label: item?.name, value: item?.id };
            })}
            handleChange={(val) => handleChange("major_id", val)}
          />
        </Box>
      </Box>

      {/* NEGARA / KOTA */}
      <Box
        sx={classes.FormWrapper}
        gap={Mobile ? `16px` : `24px`}
        mb={Mobile ? `24px` : `40px`}
      >
        <Box width="100%">
          <InputSelectField
            label={`Negara${isExperienced ? "*" : ""}`}
            minWidth="0px"
            fullWidth
            defaultValue={
              data?.countries?.find((x) => x.id === form?.country_id)?.name
            }
            options={data?.countries?.map((country) => {
              return { label: country?.name, value: country?.id };
            })}
            handleChange={(val) => {
              if (val !== 62)
                form?.location_id && handleChange("location_id", null);
              handleChange("country_id", val);
            }}
          />
        </Box>

        <Box width="100%">
          <InputSelectField
            disable={form?.country_id !== 62}
            label={`Kota${isExperienced ? "*" : ""}`}
            minWidth="0px"
            fullWidth
            defaultValue={
              data?.cities?.find((x) => x.id === form?.location_id)?.name
            }
            options={data?.cities?.map((location_id) => {
              return { label: location_id?.name, value: location_id?.id };
            })}
            handleChange={(val) => handleChange("location_id", val)}
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
                handleChange("start_month", moment(new Date(e)).format("MM"));
                handleChange("start_year", moment(new Date(e)).format("YYYY"));
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
                handleChange("end_month", moment(new Date(e)).format("MM"));
                handleChange("end_year", moment(new Date(e)).format("YYYY"));
              }}
            />
            <Box className="d-flex" gap="4px" mt="8px">
              <Checkbox
                defaultChecked={form?.isChecked}
                onChange={(e) => {
                  handleChange("end_month", "");
                  handleChange("end_year", "");
                  handleChange("isChecked", e.target.checked);
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
                Saya masih bersekolah di sini
              </Font>
            </Box>
          </Box>
        </Box>
      )}

      {!Mobile && (
        <>
          <Box sx={classes.FormWrapper} gap="24px" mb="8px">
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

          <Box sx={classes.FormWrapper} gap="24px" mb="40px">
            {/* START */}
            <Box sx={classes.FormWrapper} gap="24px" width="100%">
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
                      value: index + 1 < 10 ? `0${index + 1}` : index + 1,
                    };
                  })}
                  handleChange={(val) => handleChange("start_month", val)}
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
                  handleChange={(val) => handleChange("start_year", val)}
                />
              </Box>
            </Box>

            {/* END */}
            <Box width="100%">
              <Box sx={classes.FormWrapper} gap="24px">
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
                        value: index + 1 < 10 ? `0${index + 1}` : index + 1,
                      };
                    })}
                    handleChange={(val) => handleChange("end_month", val)}
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
                    handleChange={(val) => handleChange("end_year", val)}
                  />
                </Box>
              </Box>
              {/* CHECKBOX */}
              <Box className="d-flex" gap="4px" mt="8px">
                <Checkbox
                  defaultChecked={form?.isChecked}
                  onChange={(e) => {
                    handleChange("end_month", "");
                    handleChange("end_year", "");
                    handleChange("isChecked", e.target.checked);
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
                  Saya masih bersekolah di sini
                </Font>
              </Box>
            </Box>
          </Box>
        </>
      )}

      {/* IPK */}
      <Box
        className="d-flex"
        maxWidth="197px"
        gap="8px"
        mb={Mobile ? `24px` : `40px`}
      >
        <Box width="100%">
          <InputTextField
            label="IPK*"
            minWidth="0px"
            fullWidth
            defaultValue={form?.gpa}
            handleChange={(val) => handleChange("gpa", val)}
          />
        </Box>
        <Body2 width="fit-content" color={Colors.neutral.brown_light_grey}>
          dari
        </Body2>
        <Box width="100%">
          <InputTextField
            label="MAX"
            minWidth="0px"
            fullWidth
            defaultValue={form?.max_gpa}
            handleChange={(val) => handleChange("max_gpa", val)}
          />
        </Box>
      </Box>

      {/* IJAZAH */}
      <Box width="100%" mb={Mobile ? `16px` : `40px`}>
        <Font
          type={Mobile ? `Body2` : `Heading5`}
          color={Colors.neutral.brown_light_grey}
          mb="4px"
        >
          {`Ijazah${!isExperienced ? "*" : ""}`}
        </Font>

        <Box className="d-flex" gap="12px" mb="4px">
          <RectangleButton
            state={form?.certificate?.fileName ? "" : "alternate"}
            variant={form?.certificate?.fileName ? "ghost" : "filled"}
            fullWidth
            selected
            customStyle={{ margin: 0, maxWidth: Mobile ? `100%` : `282px` }}
            onClick={() => handleBrowseFile("certificate")}
          >
            {form?.certificate?.fileName ? (
              <span>
                {form?.certificate?.fileName.substring(0, 20)}
                {form?.certificate?.fileName.length > 20 && "..."}
                {form?.certificate?.fileType}
              </span>
            ) : (
              "Upload Ijazah"
            )}
          </RectangleButton>

          {(Mobile || form?.certificate?.fileName) && (
            <img
              className="pointer"
              src={`/images/Principle/Logo/${
                form?.certificate?.fileName
                  ? "Delete Trash"
                  : "Delete Trash Grey"
              }.svg`}
              alt="delete"
              onClick={() =>
                form?.certificate?.fileName && handleRemoveFile("certificate")
              }
            />
          )}
        </Box>

        {form?.helperText?.certificate ? (
          <Box className="d-flex" color={Colors.secondary.red}>
            <Error style={{ width: 16, height: 16, marginRight: 4 }} />
            <Body3 sx={{ pt: `2px` }}>{form?.helperText?.certificate}</Body3>
          </Box>
        ) : (
          <Body3 color={Colors.neutral.brown_grey}>maksimal 5MB (.pdf)</Body3>
        )}
      </Box>

      {/* TRANSKRIP */}
      <Box width="100%" mb={Mobile ? `24px` : `40px`}>
        <Font
          type={Mobile ? `Body2` : `Heading5`}
          color={Colors.neutral.brown_light_grey}
          mb="4px"
        >
          {`Transkrip Nilai${!isExperienced ? "*" : ""}`}
        </Font>

        <Box className="d-flex" gap="12px" mb="4px">
          <RectangleButton
            state={form?.transcript?.fileName ? "" : "alternate"}
            variant={form?.transcript?.fileName ? "ghost" : "filled"}
            fullWidth
            selected
            customStyle={{ margin: 0, maxWidth: Mobile ? `100%` : `282px` }}
            onClick={() => handleBrowseFile("transcript")}
          >
            {form?.transcript?.fileName ? (
              <span>
                {form?.transcript?.fileName.substring(0, 20)}
                {form?.transcript?.fileName.length > 20 && "..."}
                {form?.transcript?.fileType}
              </span>
            ) : (
              "Upload Transkrip Nilai"
            )}
          </RectangleButton>

          {(Mobile || form?.transcript?.fileName) && (
            <img
              className="pointer"
              src={`/images/Principle/Logo/${
                form?.transcript?.fileName
                  ? "Delete Trash"
                  : "Delete Trash Grey"
              }.svg`}
              alt="delete"
              onClick={() =>
                form?.transcript?.fileName && handleRemoveFile("transcript")
              }
            />
          )}
        </Box>

        {form?.helperText?.transcript ? (
          <Box className="d-flex" color={Colors.secondary.red}>
            <Error style={{ width: 16, height: 16, marginRight: 4 }} />
            <Body3 sx={{ pt: `2px` }}>{form?.helperText?.transcript}</Body3>
          </Box>
        ) : (
          <Body3 color={Colors.neutral.brown_grey}>maksimal 5MB (.pdf)</Body3>
        )}
      </Box>

      <Box width="100%">
        <InputTextArea
          fullWidth
          label={`Deskripsi Tambahan${!isExperienced ? "*" : ""}`}
          inputValue={form?.honors}
          handleChange={(e) =>
            e.target.value.length <= 2000 &&
            handleChange("honors", e.target.value)
          }
          helperText="Tulis apa yang kamu pelajari dan prestasi Anda selama bersekolah di sini"
        />
      </Box>
    </Box>
  );
};

export default Education;
