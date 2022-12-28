import { Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import InputSelectField from "../../../components/Atom/Input Field/SelectField";
import InputTextArea from "../../../components/Atom/Input Field/TextArea";
import InputTextField from "../../../components/Atom/Input Field/TextField";
import { Font } from "../../../components/Atom/Typography";
import { Colors } from "../../../themes";
import moment from "moment/moment";
import InputDatePicker from "../../../components/Atom/DatePicker";

const Experience = ({ Mobile, form, handleForm, isExperienced, data }) => {
  // *data for select field
  const handleChange = (key, val) => {
    handleForm(`experience`, { [key]: val });
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
      <Box
        sx={classes.FormWrapper}
        gap={Mobile ? `16px` : `24px`}
        mb={Mobile ? `16px` : `40px`}
      >
        <InputTextField
          label={`Posisi Pekerjaan${isExperienced ? "*" : ""}`}
          minWidth="0px"
          fullWidth
          defaultValue={form?.job_function_name}
          handleChange={(val) => handleChange("job_function_name", val)}
        />
        <InputTextField
          label={`Nama Perusahaan${isExperienced ? "*" : ""}`}
          minWidth="0px"
          fullWidth
          defaultValue={form?.company_name}
          handleChange={(val) => handleChange("company_name", val)}
        />
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

      {/* INPUT DATE */}
      {Mobile && (
        <Box mb="24px">
          <Box mb="16px">
            <Font
              type={Mobile ? `Body3` : `Body2`}
              color={Colors.neutral.brown_light_grey}
              mb="8px"
            >
              {`Tanggal Mulai${isExperienced ? "*" : ""}`}
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
              Tanggal Berakhir
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
                Saya masih bekerja di sini
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
                {`Tanggal Mulai${isExperienced ? "*" : ""}`}
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
                Tanggal Berakhir
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
                  Saya masih bekerja di sini
                </Font>
              </Box>
            </Box>
          </Box>
        </>
      )}

      <Box
        sx={classes.FormWrapper}
        gap={Mobile ? `16px` : `24px`}
        mb={Mobile ? `16px` : `40px`}
      >
        <Box width="100%">
          <InputSelectField
            label={`Fungsi Pekerjaan${isExperienced ? "*" : ""}`}
            minWidth="0px"
            fullWidth
            defaultValue={
              data?.job_functions?.find((x) => x.id === form?.job_function_id)
                ?.name
            }
            options={data?.job_functions?.map((item) => {
              return { label: item?.name, value: item?.id };
            })}
            handleChange={(val) => handleChange("job_function_id", val)}
          />
        </Box>
        <Box width="100%">
          <InputSelectField
            label={`Industri Perusahaan${isExperienced ? "*" : ""}`}
            minWidth="0px"
            fullWidth
            defaultValue={
              data?.job_industries?.find((x) => x.id === form?.industry_id)
                ?.name
            }
            options={data?.job_industries?.map((item) => {
              return { label: item?.name, value: item?.id };
            })}
            handleChange={(val) => handleChange("industry_id", val)}
          />
        </Box>
      </Box>

      <Box
        sx={classes.FormWrapper}
        gap={Mobile ? `16px` : `24px`}
        mb={Mobile ? `16px` : `40px`}
      >
        <Box width="100%">
          <InputSelectField
            label={`Level Pekerjaan${isExperienced ? "*" : ""}`}
            minWidth="0px"
            fullWidth
            defaultValue={
              data?.job_levels?.find((x) => x.id === form?.job_level_id)?.name
            }
            options={data?.job_levels?.map((item) => {
              return { label: item?.name, value: item?.id };
            })}
            handleChange={(val) => handleChange("job_level_id", val)}
          />
        </Box>
        <Box width="100%">
          <InputSelectField
            label={`Tipe Pekerjaan${isExperienced ? "*" : ""}`}
            minWidth="0px"
            fullWidth
            defaultValue={
              data?.job_types?.find((x) => x.id === form?.job_type_id)?.name
            }
            options={data?.job_types?.map((item) => {
              return { label: item?.name, value: item?.id };
            })}
            handleChange={(val) => handleChange("job_type_id", val)}
          />
        </Box>
      </Box>

      <Box width="100%">
        <InputTextArea
          fullWidth
          label={`Deskripsi Pekerjaan${isExperienced ? "*" : ""}`}
          inputValue={form?.description}
          handleChange={(e) =>
            e.target.value.length <= 2000 &&
            handleChange("description", e.target.value)
          }
          helperText="Tulis tugas dan tanggung jawab atau pencapaianmu selama bekerja di
          sini"
        />
      </Box>
    </Box>
  );
};

export default Experience;
