import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import InputPrefixRp from "../../components/Atom/Input Field/Prefix/PrefixRp";
import InputSelectField from "../../components/Atom/Input Field/SelectField";
import InputTextField from "../../components/Atom/Input Field/TextField";
import {
  Body1,
  Font,
  Heading2,
  Heading5,
} from "../../components/Atom/Typography";
import Stepper from "../../components/Molecul/Stepper";
import { Colors, Elevation, Radius } from "../../themes";
import {
  isLargeScreen,
  isMediumScreen,
  isMobile,
  isSmallScreen,
  isTablet,
} from "../../utils/useMediaQuery";
import Education from "./StepperContent/Education";
import Experience from "./StepperContent/Experience";
import JobRecommend from "./StepperContent/JobRecommend";
import Skill from "./StepperContent/Skill";
import axios from "axios";
import { API } from "../../api/service";

export default function OnBoarding({ step, handleStep, handleBack, user }) {
  const [data, setData] = useState({});

  const [preference, setPreference] = useState({});
  // const [willingToBeContacted, setWillingToBeContacted] = useState();
  const [isExperienced, setIsExperienced] = useState();

  const [currentStep, setCurrentStep] = useState(0);
  const [experience, setExperience] = useState({});
  const [education, setEducation] = useState({ max_gpa: "4" });
  const [skill, setSkill] = useState([]);

  // Resolutions
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();
  const MediumScreen = isMediumScreen();
  const LargeScreen = isLargeScreen();

  // Functions
  const CheckIsButtonDisabled = () => {
    let status = false;
    const requiredFields = [
      "job_position",
      "job_functions",
      "job_types",
      "job_locations",
      "expected_salary",
    ];
    requiredFields.forEach((field) => {
      if (preference[field] === undefined || /^\s*$/.test(preference[field])) {
        status = true;
      }
    });

    return status;
  };

  const handleChangePreference = (key, val) => {
    setPreference({ ...preference, [key]: val });
  };

  useEffect(() => {
    if (step === 1) {
      setTimeout(() => {
        handleStep(2);
      }, 1500);
    }
  }, [step]);

  useEffect(() => {
    // if (step === 1 || step === 3)
    //   window.scroll({ top: 500, behavior: `smooth` });

    window.scroll({ top: 0, behavior: `smooth` });
  }, [step]);

  useEffect(() => {
    Mobile && window.scroll({ top: 0, behavior: `smooth` });
  }, [currentStep]);

  useEffect(async () => {
    // Master Job Functions
    await axios
      .get("https://karir-ms.staging.qareer.com/v1/master_job_functions")
      .then((res) => {
        setData((prev) => ({
          ...prev,
          job_functions: res?.data?.data,
        }));
      })
      .catch((err) => {
        console.log("err");
      });

    // Master Job Types
    setData((prev) => ({
      ...prev,
      job_types: [
        { id: 1, name: "Purna Waktu" },
        { id: 2, name: "Paruh Waktu" },
        { id: 3, name: "Magang" },
        { id: 4, name: "Sementara" },
        { id: 5, name: "Kontrak" },
      ],
    }));

    // Master Locations
    await axios
      .get("https://karir-ms.staging.qareer.com/v1/master_locations")
      .then((res) => {
        setData((prev) => ({
          ...prev,
          locations: res?.data?.data,
        }));
      })
      .catch((err) => {
        console.log("err");
      });

    // Master Job Industries
    await axios
      .get("https://karir-ms.staging.qareer.com/v1/master_industries")
      .then((res) => {
        setData((prev) => ({
          ...prev,
          job_industries: res?.data?.data,
        }));
      })
      .catch((err) => {
        console.log("err");
      });

    // Master Job Levels
    await axios
      .get("https://karir-ms.staging.qareer.com/v1/master_job_levels")
      .then((res) => {
        setData((prev) => ({
          ...prev,
          job_levels: res?.data?.data,
        }));
      })
      .catch((err) => {
        console.log("err");
      });

    // Master Degrees
    await axios
      .get("https://karir-ms.staging.qareer.com/v1/master_degrees")
      .then((res) => {
        setData((prev) => ({
          ...prev,
          degrees: res?.data?.data,
        }));
        console.log("res: ");
      })
      .catch((err) => {
        console.log("err");
      });

    // Master Majors
    await axios
      .get("https://karir-ms.staging.qareer.com/v1/master_majors")
      .then((res) => {
        setData((prev) => ({
          ...prev,
          majors: res?.data?.data,
        }));
      })
      .catch((err) => {
        console.log("err");
      });

    // Countries
    await axios
      .get("https://karir-ms.staging.qareer.com/v1/master_countries")
      .then((res) => {
        setData((prev) => ({
          ...prev,
          countries: res?.data?.data,
        }));
      })
      .catch((err) => {
        console.log("err");
      });

    // Cities
    await axios
      .get("https://karir-ms.staging.qareer.com/v1/master_locations")
      .then((res) => {
        setData((prev) => ({
          ...prev,
          cities: res?.data?.data,
        }));
      })
      .catch((err) => {
        console.log("err");
      });
  }, []);

  // Stepper Funct
  const handleForm = (state, data) => {
    if (state === `experience`) setExperience((prev) => ({ ...prev, ...data }));
    if (state === `education`) setEducation((prev) => ({ ...prev, ...data }));
    if (state === `skill`) setSkill((prev) => [...prev, ...data]);
  };

  const CheckingForm = () => {
    let status = false;

    if (currentStep === 0 && isExperienced) {
      const requiredFields = [
        "job_function_name",
        "company_name",
        "country_id",
        // "location_id",
        "start_month",
        "start_year",
        "job_function_id",
        "industry_id",
        "job_level_id",
        "job_type_id",
        "description",
      ];

      requiredFields.forEach((field) => {
        if (
          experience?.[field] === undefined ||
          /^\s*$/.test(experience?.[field])
        ) {
          status = true;
        }
      });
    } else if (currentStep === 1) {
      const requiredFields = [
        "school_name",
        "degree_id",
        "major_id",
        "country_id",
        // "location_id",
        "start_month",
        "start_year",
        "gpa",
        "max_gpa",
      ];

      if (!isExperienced) {
        requiredFields.push("certificate");
        requiredFields.push("transcript");
        requiredFields.push("honors");
      }

      requiredFields.forEach((field) => {
        if (
          education?.[field] === undefined ||
          /^\s*$/.test(education?.[field])
        ) {
          status = true;
        }
      });
    } else if (currentStep === 2) {
      if (skill?.length === 0) status = true;
    }

    return status;
  };

  const handleBrowseFile = (name) => {
    document.getElementById(`select-${name}`).click();
  };

  const onFileChange = (e, key) => {
    const file = e.target.files[0];

    if (file) {
      const fileName = file.name;
      const fileType = file.type;
      const fileSize = file.size;
      const filePath = URL.createObjectURL(file);

      if (fileType === "application/pdf") {
        if (fileSize <= 5242880) {
          setEducation((prev) => ({
            ...prev,
            helperText: { ...education?.helperText, [key]: "" },
            [key]: {
              fileName: fileName.slice(0, -4),
              fileType: ".pdf",
              filePath: filePath,
            },
          }));
          // setHelperText({ ...helperText, [key]: "" });
        } else {
          setEducation((prev) => ({
            ...prev,
            helperText: {
              ...education?.helperText,
              [key]: "Ukuran file melebihi 5MB!",
            },
          }));
          // setHelperText({ ...helperText, [key]: "Ukuran file melebihi 5MB!" });
        }
      } else {
        setEducation((prev) => ({
          ...prev,
          helperText: {
            ...education?.helperText,
            [key]: "Pastikan file yang diupload PDF",
          },
        }));

        // setHelperText({
        //   ...helperText,
        //   [key]: "Pastikan file yang diupload PDF",
        // });
      }
    }

    e.target.value = null;
  };

  const handleRemoveFile = (key) => {
    setEducation((prev) => ({ ...prev, [key]: "" }));
  };

  const handleDelete = (index) => {
    const removedData = skill?.filter((e, id) => id !== index);
    setSkill(removedData);
  };

  const handleSavePreference = async (val) => {
    const job_functions = preference?.job_functions?.map((id) => {
      return { master_job_function_id: id };
    });

    const job_locations = preference?.job_locations?.map((id) => {
      return { master_location_id: id };
    });

    await API({
      method: `POST`,
      url: `https://karir-api.staging.qareer.com/v1/save/user/preferences`,
      data: {
        user_id: user?.source_id, // 7603278, // user?.source_id
        user_preference: {
          actively_looking: val,
          received_information: val,
          expected_salary: preference?.expected_salary,
          auto_apply: null,
        },
        user_master_job_function_preferences: job_functions,
        user_master_location_preferences: job_locations,
        user_job_type_ids: preference?.job_types,
        user_job_position_preference: preference?.job_position,
        unsubscribed: false,
      },
    })
      .then((res) => console.log("save preference successfully", res))
      .catch((err) => console.log("err", err));

    handleStep(step + 1);
  };

  const handleSaveProfile = async (activeStep) => {
    const userID = user?.source_id; //7603278;
    let url = "";
    let data = {};

    if (activeStep === 0) {
      // experience
      url = `https://karir-ms.staging.qareer.com/v1/user/workexperience/upsert`;
      data = {
        user_id: userID,
        work_experience: [
          {
            company_name: experience?.company_name,
            job_function_name: experience?.job_function_name,
            job_function_id: experience?.job_function_id, // integer
            description: experience?.description,
            start_date: `01-${experience?.start_month}-${experience?.start_year}`,
            end_date:
              experience?.end_month && experience?.end_year
                ? `01-${experience?.end_month}-${experience?.end_year}`
                : null, // isi null berarti masih bekerja, isi tanggal jika sudah resign
            // monthly_salary: 20000,
            job_type_id: experience?.job_type_id,
            job_level_id: experience?.job_level_id,
            industry_id: experience?.industry_id,
            location_id: experience?.location_id,
            country_id: experience?.country_id,
          },
        ],
      };
    }

    if (activeStep === 1) {
      // education
      url = `https://karir-ms.staging.qareer.com/v1/user/education/upsert`;
      data = {
        education: [
          {
            user_id: userID,
            school_name: education?.school_name,
            start_year: parseInt(education?.start_year),
            end_year: education?.end_year
              ? parseInt(education?.end_year)
              : null,
            degree_id: education?.degree_id,
            major_id: education?.major_id,
            gpa: parseFloat(education?.gpa),
            honors: education?.honors,
            start_month: parseInt(education?.start_month),
            end_month: parseInt(education?.end_month)
              ? parseInt(education?.end_month)
              : null,
            location_id: education?.location_id,
            country_id: education?.country_id,
            max_gpa: parseFloat(education?.max_gpa),
          },
        ],
      };
    }

    if (activeStep === 2) {
      // skill
      const skill_ = skill?.map((name) => {
        return {
          user_id: userID,
          name: name,
          skill_level_id: 1,
        };
      });

      url = `https://karir-ms.staging.qareer.com/v1/user/skill/upsert`;
      data = { skill: skill_ };
    }

    if (
      (activeStep === 0 && isExperienced) ||
      activeStep === 1 ||
      activeStep === 2
    ) {
      await API({
        method: `POST`,
        url: url,
        data: data,
      })
        .then((res) => console.log("res: ", res))
        .catch((err) => console.log("err:", err?.response));
    }
  };

  const handleSavePreference2 = async (val) => {
    await API({
      method: `POST`,
      url: `https://karir-ms.staging.qareer.com/v1/user/upsert`,
      data: {
        user: {
          id: user?.source_id,
        },
        user_profile: {
          user_id: user?.source_id,
          fresh_graduate: !val,
        },
      },
    })
      .then((res) => console.log("res: ", res))
      .catch((err) => console.log("err", err));

    setIsExperienced(val);
    handleStep(5);
  };

  // Styles
  const classes = {
    BoxContainer: {
      position: `relative`,
      background: `white`,
      width: `100%`,
      height: Mobile && (step === 5 ? `100%` : `100%`),
      maxWidth: Mobile || step === 5 ? `100%` : step === 1 ? `792px` : `588px`,
      mx: Mobile ? 0 : `auto`,
      borderRadius: Mobile
        ? 0
        : step === 5
        ? `42px 42px 0px 0px`
        : Radius.medium,
      boxShadow: Mobile ? `none` : Elevation.navigationMenu,
    },
    BackspaceWrapper: {
      display: Mobile ? `none` : `flex`,
      justifyContent: `space-between`,
      alignItems: `center`,
      color: Colors.primary.mid_blue,
      marginBottom: `16px`,

      Button: {
        display: `flex`,
        alignItems: `center`,
        width: `fit-content`,
        gap: `4px`,
        cursor: `pointer`,
      },
    },
    DividerContainer: {
      position: `relative`,
      display: `flex`,
      alignItems: `center`,
      my: `24px`,
      caption: {
        position: `absolute`,
        width: `fit-content`,
        backgroundColor: `white`,
        padding: `0 4px`,
        left: 0,
        right: 0,
        margin: `auto`,
      },
    },
    Card: {
      width: `100%`,
      cursor: `pointer`,
      padding: `12px`,
      borderRadius: Radius.medium,
      boxShadow: Elevation.navigationMenu,
    },
    FooterContainer: {
      marginTop: Mobile ? `32px` : `24px`,
      padding: `12px 24px`,
      textAlign: `center`,
      backgroundColor: Colors.primary.pale_gray,
    },
    ButtonWrapper: {
      width: `100%`,
      display: `flex`,
      flexDirection: Mobile ? `row-reverse` : `column`,
      gap: Mobile ? `8px` : `16px`,
      position: Mobile ? `fixed` : `relative`,
      bottom: 0,
      left: 0,
      background: `#fff`,
      padding: Mobile ? `12px 16px` : 0,
      zIndex: 100,
    },
  };
  return (
    <Box sx={classes.BoxContainer}>
      {step === 1 && (
        <Box
          className="center"
          my={Mobile ? `72px` : `34px`}
          pt={Mobile ? `80px` : `50px`}
        >
          <img
            src="/images/Principle/Illustration/Success.png"
            alt="success.png"
          />
          <Heading2 mt="5px">Registrasi Berhasil</Heading2>
          <Body1 mt={Mobile ? `8px` : `4px`} mb="32px">
            Selamat Anda berhasil membuat Akun di Karir.com
          </Body1>

          <CircularProgress />
        </Box>
      )}

      <Box
        px={
          Mobile
            ? step === 5
              ? 0
              : `16px`
            : step === 5
            ? LargeScreen
              ? `120px`
              : `64px`
            : `24px`
        }
        py={Mobile ? `8px` : `24px`}
      >
        {/* CARD HEADER */}
        {step > 1 && (
          <Box sx={classes.BackspaceWrapper}>
            <Box
              sx={classes.BackspaceWrapper.Button}
              onClick={() => handleBack()}
            >
              <ArrowBackIcon sx={{ height: `16px`, width: `16px` }} />
              <Heading5>Kembali</Heading5>
            </Box>

            <Box sx={classes.BackspaceWrapper.Button}>
              <HelpOutlineIcon sx={{ height: `16px`, width: `16px` }} />
              <Heading5>Bantuan</Heading5>
            </Box>
          </Box>
        )}

        {step === 2 && (
          <>
            <Box mb={Mobile ? `24px` : `32px`}>
              <Heading2 mb="4px">Preferensi Pekerjaan</Heading2>
              <Font
                type={Mobile ? `Body3` : `Body1`}
                color={Colors.neutral.brown_grey}
              >
                Temukan lowongan sesuai Preferensi Anda! Jangan khawatir
                preferensi dapat Anda perbarui kapanpun.
              </Font>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              gap={Mobile ? `16px` : `32px`}
              mb={Mobile ? `80px` : `32px`}
            >
              <InputTextField
                label="Posisi Pekerjaan*"
                fullWidth
                multiple
                minWidth="0px"
                handleChange={(val) =>
                  handleChangePreference("job_position", val)
                }
              />

              <InputSelectField
                label="Fungsi Pekerjaan*"
                fullWidth
                multiple
                minWidth="0px"
                options={data?.job_functions?.map((item) => {
                  return { label: item?.name, value: item?.id };
                })}
                handleChange={(val) =>
                  handleChangePreference("job_functions", val)
                }
              />

              <InputSelectField
                label="Tipe Pekerjaan*"
                fullWidth
                multiple
                minWidth="0px"
                options={data?.job_types?.map((item) => {
                  return { label: item?.name, value: item?.id };
                })}
                handleChange={(val) => handleChangePreference("job_types", val)}
              />

              <InputSelectField
                label="Lokasi Pekerjaan*"
                defaultValue={preference?.job_location}
                fullWidth
                multiple
                minWidth="0px"
                options={data?.locations?.map((item) => {
                  return { label: item?.name, value: item?.id };
                })}
                handleChange={(val) =>
                  handleChangePreference("job_locations", val)
                }
              />

              <InputPrefixRp
                label="Gaji Diinginkan"
                helperText="Masukan gaji Anda inginkan untuk meningkatkan pengalaman Anda dalam mencari lowongan."
                fullWidth
                minWidth="0px"
                handleChange={(val) =>
                  handleChangePreference("expected_salary", val)
                }
              />
            </Box>

            <Box sx={classes.ButtonWrapper}>
              <RectangleButton
                disable={CheckIsButtonDisabled()}
                size={Mobile ? `medium` : `large`}
                fullWidth
                customStyle={{ margin: 0 }}
                onClick={() => handleStep(step + 1)}
              >
                Lanjutkan
              </RectangleButton>

              <RectangleButton
                size={Mobile ? `medium` : `large`}
                state="alternate"
                fullWidth
                customStyle={{ margin: 0 }}
                onClick={() => {
                  setPreference({});
                  handleStep(step + 1);
                }}
              >
                {Mobile ? `Lewati` : `Belum Memiliki Preferensi`}
              </RectangleButton>
            </Box>
          </>
        )}

        {step === 3 && (
          <>
            <Box className="center" mt="20px" mb={Mobile ? 0 : `32px`}>
              <img
                src="/images/Principle/Illustration/Landing-Card/4.png"
                alt="onboardingimage.png"
              />
              <Heading2
                mt={Mobile ? `64px` : `16px`}
                mb={Mobile ? `8px` : `4px`}
              >
                {Mobile && `Bersedia dihubungi HR?`}
                {!Mobile && `Bersedia dihubungi HR melalui resume search?`}
              </Heading2>
              <Font
                type="Body1"
                width="fit-content"
                maxWidth={Mobile ? `360px` : `100%`}
                mx="auto"
                color={Colors.neutral.brown_grey}
              >
                Jika bersedia, HR dapat mencari dan menawarkan pekerjaan untuk
                Anda.
              </Font>
            </Box>

            <Box sx={classes.ButtonWrapper}>
              <RectangleButton
                size={Mobile ? `medium` : `large`}
                fullWidth
                customStyle={{ margin: 0 }}
                onClick={() => handleSavePreference(true)}
              >
                Bersedia
              </RectangleButton>

              <RectangleButton
                size={Mobile ? `medium` : `large`}
                state="alternate"
                fullWidth
                customStyle={{ border: `none`, margin: 0 }}
                onClick={() => handleSavePreference(false)}
              >
                Tidak Bersedia
              </RectangleButton>
            </Box>
          </>
        )}

        {step === 4 && (
          <>
            <Box className="center" mt="20px" mb={Mobile ? `64px` : `32px`}>
              <img
                src="/images/Principle/Illustration/Boarding 3.png"
                alt="onboardingimage.png"
              />
              <Heading2
                mt={Mobile ? `64px` : `16px`}
                mb={Mobile ? `8px` : `4px`}
              >
                {Mobile && `Punya Pengalaman?`}
                {!Mobile && `Rekomendasi Pekerjaan Sesuai Profil Anda`}
              </Heading2>
              <Font type="Body2" color={Colors.neutral.brown_grey}>
                Isi pengalaman, pendidikan, dan skill terakhir Anda, untuk
                dapatkan persentase kecocokan dan rekomendasi pekerjaan sesuai
                profil Anda.
              </Font>

              {!Mobile && (
                <Font type="Heading3" mt="24px">
                  Punya Pengalaman?
                </Font>
              )}

              <Box
                className="d-flex"
                width="fit-content !important"
                gap="40px"
                mx="auto"
                mt="24px"
              >
                <Box
                  sx={{ ...classes.Card, px: `8px` }}
                  onClick={() => handleSavePreference2(true)}
                >
                  <img
                    src="/images/Principle/Logo/Suitcase.svg"
                    alt="Experienced"
                    width="66px"
                    height="66px"
                  />

                  <Heading5 color={Colors.primary.mid_blue}>
                    Berpengalaman
                  </Heading5>
                </Box>

                <Box
                  sx={{ ...classes.Card, px: `8px` }}
                  onClick={() => handleSavePreference2(false)}
                >
                  <img
                    src="/images/Principle/Logo/Graduation.svg"
                    alt="Fresh Graduate"
                    width="66px"
                    height="66px"
                  />

                  <Heading5 color={Colors.primary.mid_blue}>
                    Fresh graduate
                  </Heading5>
                </Box>
              </Box>
            </Box>

            <Box sx={classes.ButtonWrapper}>
              <RectangleButton
                size={Mobile ? `medium` : `large`}
                state="alternate"
                fullWidth
                customStyle={{ border: `none`, margin: 0 }}
                onClick={() => (window.location.href = "/")}
              >
                Lewati
              </RectangleButton>
            </Box>
          </>
        )}

        {step === 5 && (
          <>
            {!Mobile && <Heading2 mt="32px">Rekomendasi Pekerjaan</Heading2>}
            <Stepper
              state={0} //0
              label
              description
              defaultButton
              fullWidth
              isDisabled={CheckingForm()}
              currentStep={setCurrentStep}
              handleDone={() => (window.location.href = "/")}
              handleSubmit={(activeStep) => handleSaveProfile(activeStep)}
              contentStyle={{
                my: `40px`,
                maxWidth: currentStep === 3 ? `1000px` : `792px`,
              }}
              steps={[
                {
                  label: `Pengalaman Kerja Terakhir`,
                  description: `Masukan informasi pengalaman kerja terakhir Anda`,
                  content: (
                    <Experience
                      Mobile={Mobile}
                      form={experience}
                      handleForm={handleForm}
                      isExperienced={isExperienced}
                      data={data}
                    />
                  ),
                },
                {
                  label: `Pendidikan Terakhir`,
                  description: `Masukan informasi pendidikan terakhir Anda`,
                  content: (
                    <Education
                      Mobile={Mobile}
                      form={education}
                      handleForm={handleForm}
                      handleBrowseFile={handleBrowseFile}
                      handleRemoveFile={handleRemoveFile}
                      isExperienced={isExperienced}
                      data={data}
                    />
                  ),
                },
                {
                  label: `Skills`,
                  description: `Masukan Skill yang sesuai dengan diri Anda`,
                  content: (
                    <Skill
                      Mobile={Mobile}
                      form={skill}
                      handleForm={handleForm}
                      handleDelete={handleDelete}
                    />
                  ),
                },
                {
                  label: `Rekomendasi Pekerjaan`,
                  description: `Selamat ini rekomendasi pekerjaan sesuai dengan Profil Anda`,
                  content: <JobRecommend Mobile={Mobile} />,
                },
              ]}
            />
          </>
        )}
      </Box>

      <input
        id="select-certificate"
        type="file"
        style={{ display: `none` }}
        onChange={(e) => onFileChange(e, "certificate")}
      />

      <input
        id="select-transcript"
        type="file"
        style={{ display: `none` }}
        onChange={(e) => onFileChange(e, "transcript")}
      />
    </Box>
  );
}
