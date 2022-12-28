import React, { useState, useEffect } from "react";
import Header from "../../components/Organism/Header";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Organism/Footer";
import { Box } from "@mui/system";
import ProfileStrength from "../../components/Organism/ProfileStrength";
import { Body1, Body2, Heading3 } from "../../components/Atom/Typography";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import { Colors, Elevation, Radius } from "../../themes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SidebarProfile from "../../components/Molecul/Sidebar/Profile";
import CircleAvatar from "../../components/Atom/Avatar/Circle";
import Personal from "./content/Personal";
import Experience from "./content/Experience";
import Education from "./content/Education";
import Skill from "./content/Skill";
// import Skills from "./content/Skills";
import CV from "./content/CV";
import Language from "./content/Language";
import Certificate from "./content/Certificate";
import Organization from "./content/Organization";
import AdditionalProfile from "./content/AdditionalProfile";
import Divider from "../../components/Atom/Divider";
// import useMediaQuery from "../../utils/useMediaQuery";
import { isMobile, isTablet } from "../../utils/useMediaQuery";
import Ticker from "../../components/Molecul/Ticker";
import { useDispatch, useSelector } from "react-redux";
import {
  getMasterCountries,
  getMasterLocations,
} from "../../redux/action/MasterActions";

export default function Profile() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.masterCountries.data);
  const locations = useSelector((state) => state.masterLocations.data);

  useEffect(() => {
    countries === null && dispatch(getMasterCountries());
    locations === null && dispatch(getMasterLocations());
  }, []);

  const [data, setData] = useState({});

  const title = [
    "Biodata Diri",
    "Pengalaman Kerja",
    "Pendidikan",
    "Skill",
    "CV",
    "Bahasa",
    "Sertifikat",
    "Pengalaman Organisasi",
    "Profil Tambahan",
  ];

  const [showForm, setShowForm] = useState({ status: false });
  // const [command,setCommand] = "" // save or update

  const Mobile = isMobile();
  const Tablet = isTablet();

  const [activeSidebar, setActiveSidebar] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleChangeSidebar = (val) => {
    scrollTo();
    setActiveSidebar(val);
  };

  // TESTING
  const handleSaveDB = (newData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);

    setData({ ...data, ...newData });
    scrollTo();
  };

  useEffect(() => {
    setData({
      personal: {
        avatar: "/images/Principle/Logo/Karir/Avatar/State=Avatar.png",
        name: "",
        email: "maudygunawan@gmail.com",
        phone: "089512345678",
        address: "Jl. Kebenaran",
        country_id: 1,
        location_id: 1,
        province_id: 1,
        birth: `01-01-1990`,
        gender: `male`,
        profile_summary: "ini adalah profile summary",
      },
      experience: [
        { id: 1, job_position: `Frontend Dev` },
        { id: 2, job_position: `Backend Engineering` },
        { id: 3, job_position: `IT Consultant` },
      ],
      education: [
        { id: 1, school_name: `Universitas Indonesia` },
        { id: 2, school_name: `SMA Indonesia 123` },
        { id: 3, school_name: `SMP Indonesia 123` },
      ],
      skill: ["UI/UX", "Wireframe", "Analyst"],
      cv: ["cv.pdf", "cv2baru.pdf", "CV (FIX!!!).pdf"],
      language: [
        {
          id: 1,
          language: `Indonesia`,
          level: "Bagus",
          file: "sertifikat-bahasa.pdf",
        },
        { id: 2, language: `English`, level: "Cukup", file: "" },
        { id: 3, language: `Tagalog`, level: "Sedang", file: "" },
      ],
      certificate: [
        {
          id: 1,
          name: "Create User Interface",
          institute: "BNSP",
          file: {
            name: "sertifikasi membuat UI.png",
          },
        },
        {
          id: 2,
          name: "Create User Experience",
          institute: "BNSP",
          file: {
            name: "sertifikasi membuat UX.png",
          },
        },
      ],
      organization: [
        {
          id: 1,
          position: "Ketua Himpunan",
          organization_name: "PPM",
          country: 69,
          location_id: 63,
          description: "",
        },
      ],
      additional: {
        portofolio: [
          { id: 1, name: "https://dribbble.com" },
          { id: 2, name: "https://dribbble.com" },
          { id: 3, name: "https://dribbble.com" },
        ],
        website: [{ id: 1, name: "https://dribbble.com" }],
        journal: [
          { id: 1, name: "jurnal pertama", url: "https://dribbble.com" },
          { id: 2, name: "jurnal kedua", url: "https://dribbble.com" },
          { id: 3, name: "jurnal ketiga", url: "https://dribbble.com" },
        ],
        referral: [],
      },
    });
  }, []);

  useEffect(() => {
    (showForm?.value === "add" || showForm?.value === "edit") && scrollTo();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [showForm || activeSidebar]);

  const scrollTo = () => {
    const el = document.getElementsByClassName("main-content")[0];
    window.scrollTo({
      top: Mobile ? 0 : el.offsetTop - 80,
      behavior: "smooth",
    });
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
    Main: {
      width: `100%`,
      minHeight: Mobile ? `calc(100vh - 200px)` : 0,
      height: `100%`,
      p: Mobile ? `16px` : `24px`,
      mb: Mobile ? `60px` : 0,
      background: `#fff`,
      borderRadius: Mobile ? 0 : Radius.medium,
      boxShadow: Elevation.card,
    },
  };

  return (
    <>
      <style jsx>
        {`
          .body {
            background: url("/images/Principle/Background/Light Blue Desktop.png")
              no-repeat top;
            background-size: 100%;
          }
        `}
      </style>
      <div className="body">
        <Box position="relative">
          <Header
            variant="action"
            title={`${
              showForm?.value === `edit`
                ? "Edit "
                : showForm?.value === `add`
                ? "Tambah "
                : ""
            }${title[activeSidebar]}`}
            state="sticky"
          />
        </Box>

        <Layout>
          <Box className="d-flex" gap={Tablet ? `16px` : `24px`}>
            {/* Profile */}
            {!Mobile && (
              <Box
                width="100%"
                minWidth="200px"
                maxWidth={Tablet ? "200px" : "282px"}
                textAlign="center"
                px={Tablet ? 0 : "33px"}
              >
                <Box
                  width="100px"
                  height="100px"
                  margin="auto"
                  borderRadius={Radius.circle}
                  mb="8px"
                >
                  <img
                    src="/images/Principle/Logo/Karir/Avatar/State=Avatar.png"
                    alt="avatar"
                    style={{
                      width: `100%`,
                      height: `100%`,
                      borderRadius: Radius.circle,
                      objectFit: `cover`,
                    }}
                  />
                </Box>
                <Heading3
                  sx={{
                    marginTop: `16px`,
                    whiteSpace: `nowrap`,
                    overflow: `hidden`,
                    textOverflow: `ellipsis`,
                  }}
                >
                  Dimas
                  {/* {user?.personal?.fullName} */}
                </Heading3>
                <Body2 color={Colors.neutral.brown_light_grey}>
                  Last update: 2 Oktober 2021
                </Body2>
                <RectangleButton
                  fullWidth
                  customStyle={{
                    margin: 0,
                    marginTop: `16px`,
                    marginBottom: `12px`,
                  }}
                >
                  Edit Preferensi
                </RectangleButton>
                <RectangleButton
                  fullWidth
                  state="alternate"
                  customStyle={{ margin: 0 }}
                >
                  CV Generator
                </RectangleButton>
              </Box>
            )}

            {/* Profile Strength */}
            <Box width="100%">
              <ProfileStrength
                state={0}
                profileGuide={"zzzz"}
                textButton={Mobile ? false : "Isi Biodata Diri"}
                onClick={() => console.log("Profile Strength + 1")}
              />
            </Box>
          </Box>

          {/* Ticker */}
          {Mobile && (
            <Ticker type="type" variant="icon" radius={false}>
              Profil Anda belum lengkap. Lengkapi profile Anda dan raih
              pekerjaan di perusahaan impian.
            </Ticker>
          )}

          <Box
            className="d-flex "
            alignItems="flex-start !important"
            height="100%"
            gap={Tablet ? `16px` : `24px`}
            my={Mobile ? 0 : `24px`}
          >
            {/* Sidebar */}
            {!Mobile && (
              <Box width="100%" maxWidth={Tablet ? "200px" : "282px"}>
                <SidebarProfile>
                  <SidebarProfile.Content
                    title="Biodata Diri*"
                    icon="/images/Principle/Logo/Profile.svg"
                    isSelected={activeSidebar === 0}
                    handleClick={() => handleChangeSidebar(0)}
                  />

                  <SidebarProfile.Content
                    title="Pengalaman Kerja"
                    icon="/images/Principle/Logo/Suitcase.svg"
                    isSelected={activeSidebar === 1}
                    handleClick={() => handleChangeSidebar(1)}
                  />

                  <SidebarProfile.Content
                    title="Pendidikan*"
                    icon="/images/Principle/Logo/Graduation.svg"
                    isSelected={activeSidebar === 2}
                    handleClick={() => handleChangeSidebar(2)}
                  />

                  <SidebarProfile.Content
                    title="Skills*"
                    icon="/images/Principle/Logo/Atom.svg"
                    isSelected={activeSidebar === 3}
                    handleClick={() => handleChangeSidebar(3)}
                  />

                  <SidebarProfile.Content
                    title="CV*"
                    icon="/images/Principle/Logo/Note.svg"
                    isSelected={activeSidebar === 4}
                    handleClick={() => handleChangeSidebar(4)}
                  />

                  <SidebarProfile.Content
                    title="Bahasa*"
                    icon="/images/Principle/Logo/Brain.svg"
                    isSelected={activeSidebar === 5}
                    handleClick={() => handleChangeSidebar(5)}
                  />

                  <SidebarProfile.Content
                    title="Sertifikasi"
                    icon="/images/Principle/Logo/Certificate.svg"
                    isSelected={activeSidebar === 6}
                    handleClick={() => handleChangeSidebar(6)}
                  />

                  <SidebarProfile.Content
                    title="Pengalaman Organisasi"
                    icon="/images/Principle/Logo/Paper.svg"
                    isSelected={activeSidebar === 7}
                    handleClick={() => handleChangeSidebar(7)}
                  />

                  <SidebarProfile.Content
                    title="Profil Tambahan"
                    icon="/images/Principle/Logo/Bulb.svg"
                    isSelected={activeSidebar === 8}
                    handleClick={() => handleChangeSidebar(8)}
                  />

                  <Divider />

                  <SidebarProfile.Content
                    title="Pengaturan"
                    name="setting"
                    icon="/images/Principle/Logo/Setting.svg"
                    handleClick={() => window.open("/setting", "_blank")}
                  />
                </SidebarProfile>
              </Box>
            )}

            {/* Content */}
            <Box
              className="main-content"
              sx={activeSidebar !== 8 ? classes.Main : { width: `100%` }}
            >
              {activeSidebar === 0 && (
                <Personal
                  Mobile={Mobile}
                  isLoading={isLoading}
                  data={data?.personal}
                  handleSaveDB={handleSaveDB}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  master={{ countries, locations }}
                />
              )}
              {activeSidebar === 1 && (
                <Experience
                  Mobile={Mobile}
                  isLoading={isLoading}
                  data={data?.experience}
                  handleSaveDB={handleSaveDB}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  master={{ countries, locations }}
                  date={{ months: months, years: years }}
                />
              )}
              {activeSidebar === 2 && (
                <Education
                  Mobile={Mobile}
                  isLoading={isLoading}
                  data={data?.education}
                  handleSaveDB={handleSaveDB}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  master={{ countries, locations }}
                  date={{ months: months, years: years }}
                />
              )}
              {activeSidebar === 3 && (
                <Skill
                  Mobile={Mobile}
                  isLoading={isLoading}
                  data={data?.skill}
                  handleSaveDB={handleSaveDB}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  master={{ countries, locations }}
                />
              )}
              {activeSidebar === 4 && (
                <CV
                  Mobile={Mobile}
                  isLoading={isLoading}
                  data={data?.cv}
                  handleSaveDB={handleSaveDB}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  master={{ countries, locations }}
                />
              )}
              {activeSidebar === 5 && (
                <Language
                  Mobile={Mobile}
                  isLoading={isLoading}
                  data={data?.language}
                  handleSaveDB={handleSaveDB}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  master={{ countries, locations }}
                />
              )}
              {activeSidebar === 6 && (
                <Certificate
                  Mobile={Mobile}
                  isLoading={isLoading}
                  data={data?.certificate}
                  handleSaveDB={handleSaveDB}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  master={{ countries, locations }}
                  date={{ months: months, years: years }}
                />
              )}
              {activeSidebar === 7 && (
                <Organization
                  Mobile={Mobile}
                  isLoading={isLoading}
                  data={data?.organization}
                  handleSaveDB={handleSaveDB}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  master={{ countries, locations }}
                  date={{ months: months, years: years }}
                />
              )}
              {activeSidebar === 8 && (
                <AdditionalProfile
                  Mobile={Mobile}
                  isLoading={isLoading}
                  data={data?.additional}
                  handleSaveDB={handleSaveDB}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  master={{ countries, locations }}
                />
              )}
            </Box>
          </Box>

          {Mobile && !showForm?.status && (
            <Box
              className="d-flex"
              justifyContent={activeSidebar > 0 ? `space-between` : `flex-end`}
              position="fixed"
              bottom="0"
              gap="64px"
              p="12px 16px"
              sx={{
                background: `#fff`,
                boxShadow: Elevation.card,
                zIndex: 1000,
              }}
            >
              {activeSidebar > 0 && (
                <RectangleButton
                  fullWidth
                  state="alternate"
                  customStyle={{ margin: 0, maxWidth: `132px` }}
                  onClick={() => handleChangeSidebar(activeSidebar - 1)}
                >
                  Sebelumnya
                </RectangleButton>
              )}

              {activeSidebar < 8 && (
                <RectangleButton
                  fullWidth
                  customStyle={{ margin: 0, maxWidth: `132px` }}
                  onClick={() => handleChangeSidebar(activeSidebar + 1)}
                >
                  Selanjutnya
                </RectangleButton>
              )}
            </Box>
          )}
        </Layout>

        {!Mobile && <Footer />}
      </div>
    </>
  );
}
