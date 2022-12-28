import React, { useState, useEffect } from "react";
import JobHeader from "../../components/Organism/Header/JobHeader";
import { Radius, Elevation, Colors } from "../../themes";

import Sidebar from "../../components/Molecul/Sidebar";
import GoogleMapComponent from "../../components/Atom/GoogleMap";
import Popup from "./popup";
import ActionChip from "../../components/Atom/Selection Control/Chips/ActionChip";
import JobCard from "../../components/Organism/Card/JobCard";
import { Container, Row, Col } from "react-grid-system";
import Dialog from "../../components/Molecul/Modal/Dialog";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import {
  Label,
  Body1,
  Body2,
  Heading3,
  Heading4,
  Heading5,
} from "../../components/Atom/Typography";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import RectangleAvatar from "../../components/Atom/Avatar/Rectangle";
import { Box } from "@mui/system";
import Ticker from "../../components/Molecul/Ticker";
import Header from "../../components/Organism/Header";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Organism/Footer";
import useMediaQuery from "../../utils/useMediaQuery";
import Link from "react-scroll/modules/components/Link";
import axios from "axios";
import { getOpportunity } from "../../redux/action/OpportunityAction";
import Cookies from "js-cookie";

export default function JobDetailPage() {
  const router = useRouter();
  const userId = null;
  const opportunityId = parseInt(router?.query?.index); //id opportunities
  const isDekstop = useMediaQuery("(min-width: 1008px)");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state?.opportunity);

  useEffect(() => {
    !data &&
      opportunityId &&
      dispatch(
        getOpportunity({
          user_id: userId,
          id: opportunityId,
          language: "id",
        })
      );
  }, [opportunityId]);

  useEffect(() => {
    const terakhirDilihat = Cookies.get("terakhir_dilihat")
      ? JSON.parse(Cookies.get("terakhir_dilihat"))
      : [];
    if (!loading && data) {
      let newData = true;
      terakhirDilihat.map((el) => {
        if (el.url === `/opportunities/${data.id}`) newData = false;
      });
      if (newData) {
        if (terakhirDilihat.length > 3) {
          terakhirDilihat.shift();
          terakhirDilihat.push({
            url: "/opportunities/" + data.id,
            title: data.job_position,
          });
        } else {
          terakhirDilihat.push({
            url: "/opportunities/" + data.id,
            title: data.job_position,
          });
        }
      }
      Cookies.set("terakhir_dilihat", JSON.stringify(terakhirDilihat));
    }
  }, [loading]);

  const [show, setShow] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // dialog modal for custom test
  const [selectedSidebar, setSelectedSidebar] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [user, setUser] = useState({
    cvs: [
      {
        id: 1,
        fileName: "CV1.pdf",
        filePath:
          "https://196034-584727-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2022/02/Lisbon-Resume-Template-Creative.pdf",
        uniqueFileName: "CV1.pdf - 2518742",
        upload_date: "14/04/2022",
      },
    ],
  });

  const [cvs, setCvs] = useState([
    {
      id: 1,
      fileName: "CV1.pdf",
      filePath:
        "https://196034-584727-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2022/02/Lisbon-Resume-Template-Creative.pdf",
      uniqueFileName: "CV1.pdf - 2518742",
      upload_date: "14/04/2022",
    },
  ]);

  const similarJobs = [
    {
      title: "UI/UX Designer",
      company: "PT. Qerja Manfaat Bangsa",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote ",
      profileMatch: 59,
      timestamp: "2 jam lalu",
      skeleton: false,
      prioritas: false,
    },
    {
      title: "Project Manager",
      company: "PT. Qerja Manfaat Bangsa",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote ",
      profileMatch: 45,
      timestamp: "5 jam lalu",
      skeleton: false,
      prioritas: false,
    },
    {
      title: "Front End Developer",
      company: "CODE.ID",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote ",
      profileMatch: 86,
      timestamp: "8 jam lalu",
      skeleton: false,
      prioritas: false,
    },
    {
      title: "Backend Engineer",
      company: "CODE.ID",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote ",
      profileMatch: 61,
      timestamp: "12 jam lalu",
      skeleton: false,
      prioritas: false,
    },
    {
      title: "Software Analyst",
      company: "CODE.ID",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote ",
      profileMatch: 34,
      timestamp: "23 jam lalu",
      skeleton: false,
      prioritas: false,
    },
    {
      title: "QA",
      company: "CODE.ID",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote ",
      profileMatch: 28,
      timestamp: "26 jam lalu",
      skeleton: false,
      prioritas: false,
    },
  ];

  // Job Related
  const jobs = [
    {
      title: `UI/UX Designer`,
      company: `Facebook`,
      salary: `Di atas ekspetasi`,
      profileMatch: 95,
    },
    {
      title: `Interaction Designer`,
      company: `Microsoft`,
      salary: `Rp 9,5 juta - 15,6 juta/bulan`,
      profileMatch: 90,
    },
    {
      title: `Graphic Designer`,
      company: `Dribble`,
      salary: `Rp 9,5 juta - 10 juta/bulan`,
      profileMatch: 79,
    },
    {
      title: `Graphic Designer`,
      company: `Amazon`,
      salary: `Rp 9,5 juta - 15,6 juta/bulan`,
      profileMatch: 59,
    },
    {
      title: `Game Designer`,
      company: `Apple`,
      salary: `Rp 9,5 juta - 15,6 juta/bulan`,
      profileMatch: 59,
    },
    {
      title: `Product Design Lead`,
      company: `PT Qerja Manfaat Bangsa`,
      salary: `Rp 9,5 juta - 15,6 juta/bulan`,
      profileMatch: 79,
    },
  ];

  const handleSetActive = (value) => {
    const newSelectedSidebar = selectedSidebar.map((x, index) => {
      return index === value ? true : false;
    });

    setSelectedSidebar(newSelectedSidebar);
  };

  const handleClick = (name) => {
    if (name === "apply") {
      if (data?.erika_id && data?.has_quizzes) {
        setOpenDialog(true);
      } else {
        setShow(true);
      }
    }
  };

  const saveData = (type, payload) => {
    if (type === "SET_USER") setCvs([...payload]);
  };

  const handleScrollTo = (id) => {
    let index = null;
    if (id === "information") index = 0;
    if (id === "requirement") index = 1;
    if (id === "skill") index = 2;
    if (id === "location") index = 3;
    if (id === "about-company") index = 4;
    if (id === "similar-jobs") index = 5;

    if (Number.isInteger(index)) {
      let newSelectedSidebar = [false, false, false, false, false, false];
      newSelectedSidebar[index] = true;
      setSelectedSidebar([...newSelectedSidebar]);
    }

    if (!selectedSidebar[index]) {
      var element = document.getElementById(id);
      window.scrollTo({
        top: element?.offsetTop - 70,
        behavior: "smooth",
      });
    }
  };

  const container = {
    padding: 24,
    marginBottom: 16,
    background: `white`,
    borderRadius: Radius.medium,
    boxShadow: Elevation.card,
    width: `100%`,
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

          .similar-job-mobile {
            max-width: 100vw;
            gap: 12px;
            overflow-x: auto;
            &::-webkit-scrollbar {
              display: none;
            }
          }
        `}
      </style>
      <div className="body">
        <Header
          variant="action"
          title={`${data?.job_position} ${data?.company_name}`}
          state="sticky"
        />

        <Layout>
          <Dialog
            show={openDialog}
            title="Lowongan Dengan Test"
            description="Lowongan ini mewajibkan anda untuk mengerjakan test.<br/>
        test dapat dikerjakan setelah anda apply lowongan."
            primaryButtonText="Lanjutkan"
            secondaryButtonText="Simpan"
            handlePrimaryButton={() => {
              setOpenDialog(false);
              setShow(true);
            }}
            handleSecondaryButton={() => setOpenDialog(false)}
            handleClose={() => setOpenDialog(false)}
          />

          <Popup
            userId={userId}
            data={data}
            cvs={cvs}
            show={show}
            similarJobs={similarJobs}
            onClose={() => setShow(false)}
            cb={saveData}
          />

          <Box position="relative">
            {(!data && loading) || error ? (
              <CircularProgress />
            ) : (
              <JobHeader
                userId={userId}
                data={data}
                size={isDekstop ? `large` : `small`}
                onClick={handleClick}
              />
            )}
          </Box>

          {!loading && (
            <>
              {isDekstop ? (
                <Box display="flex">
                  <Box sx={{ display: isDekstop ? "block" : "none" }}>
                    <Box
                      sx={{
                        position: "sticky",
                        top: "72px",
                        marginRight: `24px`,
                        marginBottom: `24px`,
                      }}
                    >
                      <Sidebar>
                        <Link
                          to="information"
                          spy={true}
                          smooth={true}
                          offset={-220}
                          onSetActive={() => handleSetActive(0)}
                          style={{ width: `100%` }}
                        />
                        <Sidebar.Content
                          isSelected={selectedSidebar[0]}
                          onClick={() => handleScrollTo("information")}
                        >
                          Informasi Lowongan
                        </Sidebar.Content>
                        <Link
                          to="requirement"
                          spy={true}
                          smooth={true}
                          offset={-220}
                          onSetActive={() => handleSetActive(1)}
                          style={{ width: `100%` }}
                        />
                        <Sidebar.Content
                          isSelected={selectedSidebar[1]}
                          onClick={() => handleScrollTo("requirement")}
                        >
                          Persyaratan
                        </Sidebar.Content>
                        <Link
                          to="skill"
                          spy={true}
                          smooth={true}
                          offset={-220}
                          onSetActive={() => handleSetActive(2)}
                          style={{ width: `100%` }}
                        />
                        <Sidebar.Content
                          isSelected={selectedSidebar[2]}
                          onClick={() => handleScrollTo("skill")}
                        >
                          Skill yang Dibutuhkan
                        </Sidebar.Content>
                        <Link
                          to="location"
                          spy={true}
                          smooth={true}
                          offset={-220}
                          onSetActive={() => handleSetActive(3)}
                          style={{ width: `100%` }}
                        />
                        <Sidebar.Content
                          isSelected={selectedSidebar[3]}
                          onClick={() => handleScrollTo("location")}
                        >
                          Lokasi
                        </Sidebar.Content>
                        <Link
                          to="about-company"
                          spy={true}
                          smooth={true}
                          offset={-220}
                          onSetActive={() => handleSetActive(4)}
                          style={{ width: `100%` }}
                        />
                        <Sidebar.Content
                          isSelected={selectedSidebar[4]}
                          onClick={() => handleScrollTo("about-company")}
                        >
                          Tentang Perusahaan
                        </Sidebar.Content>
                        <Link
                          to="similar-jobs"
                          spy={true}
                          smooth={true}
                          offset={-220}
                          onSetActive={() => handleSetActive(5)}
                          style={{ width: `100%` }}
                        />
                        <Sidebar.Content
                          isSelected={selectedSidebar[5]}
                          onClick={() => handleScrollTo("similar-jobs")}
                        >
                          Lowongan Kerja Sejenis
                        </Sidebar.Content>
                      </Sidebar>
                    </Box>
                  </Box>
                  <Box width="100%">
                    <div id="information" style={container}>
                      <Heading3
                        color={Colors.secondary.clear_blue}
                        marginBottom="16px"
                      >
                        Informasi Lowongan
                      </Heading3>
                      <Row style={{ width: `100%` }}>
                        <Col>
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Tipe Pekerjaan
                          </Heading4>
                          <Body2
                            color={Colors.neutral.greyish_brown}
                            marginBottom="16px"
                          >
                            {data?.job_type}
                          </Body2>
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Remote/On-site
                          </Heading4>
                          <Body2
                            color={Colors.neutral.greyish_brown}
                            marginBottom="16px"
                          >
                            {data?.workplace}
                          </Body2>
                        </Col>
                        <Col>
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Fungsi Pekerjaan
                          </Heading4>
                          <Body2
                            color={Colors.neutral.greyish_brown}
                            marginBottom="16px"
                          >
                            {data?.job_functions
                              ?.map((item) => item)
                              .join(", ")}
                          </Body2>
                        </Col>
                        <Col>
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Jenjang Karir
                          </Heading4>
                          <Body2
                            color={Colors.neutral.greyish_brown}
                            marginBottom="16px"
                          >
                            {data?.job_levels?.map((item) => item).join(", ")}
                          </Body2>
                        </Col>
                      </Row>
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Job Deskripsi
                      </Heading4>
                      <Body2 color={Colors.neutral.greyish_brown}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.responsibilities,
                          }}
                        />
                      </Body2>
                    </div>
                    <div id="requirement" style={container}>
                      <Heading3
                        color={Colors.secondary.clear_blue}
                        marginBottom="16px"
                      >
                        Persyaratan
                      </Heading3>
                      <Row style={{ width: `100%` }}>
                        <Col>
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Tingkat Pendidikan
                          </Heading4>
                          <Body2
                            color={Colors.neutral.greyish_brown}
                            marginBottom="16px"
                          >
                            {data?.degrees?.map((item) => item).join(", ")}
                          </Body2>
                        </Col>
                        <Col>
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Jurusan Pendidikan
                          </Heading4>
                          <Body2
                            color={Colors.neutral.greyish_brown}
                            marginBottom="16px"
                          >
                            {data?.majors?.map((item) => item).join(", ")}
                          </Body2>
                        </Col>
                        <Col>
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Minimal Pengalaman
                          </Heading4>
                          <Body2
                            color={Colors.neutral.greyish_brown}
                            marginBottom="16px"
                          >
                            {data?.work_experience
                              ? data?.work_experience > 5
                                ? `>5 tahun`
                                : `${data?.work_experience} tahun`
                              : "-"}
                          </Body2>
                        </Col>
                      </Row>
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Deskripsi Persyaratan
                      </Heading4>
                      <Body2 color={Colors.neutral.greyish_brown}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.requirements,
                          }}
                        />
                      </Body2>
                    </div>
                    <div id="skill" style={container}>
                      <Heading3
                        color={Colors.secondary.clear_blue}
                        marginBottom="24px"
                      >
                        Skill yang Dibutuhkan
                      </Heading3>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: `wrap`,
                          gap: "12px",
                        }}
                      >
                        {data?.required_skills?.map((skill, index) => {
                          return (
                            <ActionChip key={index} size="small">
                              {skill}
                            </ActionChip>
                          );
                        })}
                      </div>
                    </div>
                    <div id="location" style={container}>
                      <Heading3
                        color={Colors.secondary.clear_blue}
                        marginBottom="16px"
                      >
                        Lokasi
                      </Heading3>
                      <Row style={{ marginBottom: 16 }}>
                        <Col lg={4}>
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Kota
                          </Heading4>
                          <Body2 color={Colors.neutral.brown_light_grey}>
                            {`${data?.location}${
                              data?.country ? `, ${data?.country}` : ""
                            }`}
                          </Body2>
                        </Col>
                        <Col lg={8}>
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Alamat
                          </Heading4>
                          <Body2 color={Colors.neutral.brown_light_grey}>
                            {data?.address}
                          </Body2>
                        </Col>
                      </Row>
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Peta
                      </Heading4>
                      <div style={{ width: 480, height: 360 }}>
                        <GoogleMapComponent
                          isMarkerShown={true}
                          // onMarkerClick={this.handleMarkerClick}
                        />
                      </div>
                    </div>
                    <Box mb="16px">
                      <Ticker variant="icon">
                        Perhatian! Semua lowongan di Karir.com tidak dipungut
                        biaya sepeserpun dalam bentuk apapapun. Lowongan ini
                        bermasalah?
                      </Ticker>
                    </Box>
                    <div id="about-company" style={container}>
                      <Heading3
                        color={Colors.secondary.clear_blue}
                        marginBottom="16px"
                      >
                        Tentang Perusahaan
                      </Heading3>
                      <div
                        className="d-flex-fullwidth"
                        style={{ marginBottom: 16, padding: 0 }}
                      >
                        <div className="d-flex">
                          <div
                            className="logo-company"
                            style={{ marginRight: 20 }}
                          >
                            <img
                              src={data?.company?.logo}
                              alt="company logo"
                              style={{
                                height: 64,
                                width: 64,
                                objectFit: `cover`,
                              }}
                            />
                          </div>
                          <div className="info-company">
                            <Heading3
                              color={Colors.neutral.greyish_brown}
                              style={{
                                overflow: `hidden`,
                                whiteSpace: `nowrap`,
                                textOverflow: `ellipsis`,
                                width: `100%;`,
                                color: `#000000`,
                              }}
                            >
                              {data?.company?.name}
                            </Heading3>
                            <Body1 color={Colors.neutral.brown_grey}>
                              {data?.company?.subscribers <= 1
                                ? `${data?.company?.subscribers} subscriber`
                                : `${data?.company?.subscribers} subscribers`}
                            </Body1>
                          </div>
                        </div>

                        <div className="button-right">
                          <RectangleButton
                            state={
                              data?.company?.is_subscribed
                                ? `default`
                                : `alternate`
                            }
                            size="large"
                            customStyle={{ width: 160 }}
                            onClick={() => {
                              if (userId) {
                                alert("Subscribed!");
                              } else {
                                window.location.href = "/login";
                              }
                            }}
                          >
                            {data?.company?.is_subscribed
                              ? `Disubscribe`
                              : `Subscribe`}
                          </RectangleButton>
                        </div>
                      </div>

                      <Row>
                        <Col>
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Industri
                          </Heading4>
                          <Body2 color={Colors.neutral.brown_light_grey}>
                            {data?.company?.industry_name}
                          </Body2>
                        </Col>
                        <Col>
                          <Heading4 color={Colors.neutral.greyish_brown}>
                            Benefit
                          </Heading4>
                          <Body2 color={Colors.neutral.brown_light_grey}>
                            {data?.company?.benefits?.length > 0 &&
                              data?.company?.benefits
                                ?.map((item) => item)
                                .join(", ")}
                          </Body2>
                        </Col>
                      </Row>

                      <Box mt="16px">
                        <Heading4 color={Colors.neutral.greyish_brown}>
                          Deskripsi Perusahaan
                        </Heading4>
                        <Body2
                          marginBottom="16px"
                          color={Colors.neutral.brown_light_grey}
                        >
                          {data?.company?.description}
                        </Body2>
                      </Box>
                      <div className="center">
                        <RectangleButton
                          variant="ghost"
                          customStyle={{ width: 382 }}
                          onClick={() => alert("go to company detail")}
                        >
                          Lihat Perusahaan
                        </RectangleButton>
                      </div>
                    </div>
                    <div
                      id="similar-jobs"
                      style={{
                        ...container,
                        marginBottom: 24,
                        paddingBottom: 8,
                      }}
                    >
                      <Box className="d-flex-fullwidth" mb="16px">
                        <Heading3 color={Colors.secondary.clear_blue}>
                          Lowongan Kerja Sejenis
                        </Heading3>
                        <Box className="pointer">
                          <Label
                            size="large"
                            value="Lihat semua"
                            color={Colors.primary.mid_blue}
                          />
                        </Box>
                      </Box>

                      <Box mt="16px">
                        <Row style={{ marginBottom: 0 }} gutterWidth={12}>
                          {jobs?.map((job, index) => {
                            return (
                              <Col key={index} sm={6} md={6} lg={6} xl={6}>
                                <JobCard
                                  title={job.title}
                                  company={job.company}
                                  salary={job.salary}
                                  description="Jakarta Selatan • Fulltime • Remote "
                                  profileMatch={job.profileMatch}
                                  timestamp="5 jam lalu"
                                  skeleton={false}
                                  prioritas={false}
                                  variant={`horizontal`}
                                  fullWidth={true}
                                />
                              </Col>
                            );
                          })}
                        </Row>
                      </Box>
                    </div>
                  </Box>
                </Box>
              ) : (
                <Box width="100%" mb="60px" sx={{ zIndex: "-100 !important" }}>
                  <div
                    id="similar-jobs-mobile"
                    style={{
                      ...container,
                      marginBottom: 24,
                      paddingBottom: 8,
                    }}
                  >
                    <Box className="d-flex-fullwidth" mb="16px">
                      <Heading5 color={Colors.secondary.clear_blue}>
                        Lowongan Kerja Sejenis
                      </Heading5>
                      <Box className="pointer">
                        <Label
                          size="small"
                          value="Lihat semua"
                          color={Colors.primary.mid_blue}
                        />
                      </Box>
                    </Box>
                    <div className="d-flex similar-job-mobile">
                      {jobs.map((job, index) => {
                        return (
                          <Box key={index} minWidth="204px">
                            <JobCard
                              title={job.title}
                              company={job.company}
                              salary={job.salary}
                              description="Jakarta Selatan • Fulltime • Remote "
                              profileMatch={job.profileMatch}
                              timestamp="5 jam lalu"
                              skeleton={false}
                              prioritas={false}
                              fullWidth
                            />
                          </Box>
                        );
                      })}
                    </div>
                  </div>
                </Box>
              )}
            </>
          )}
        </Layout>
        {/* <Footer /> */}
      </div>
    </>
  );
}
