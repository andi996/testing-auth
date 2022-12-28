import React, { useEffect, useState } from "react";
import { Colors, Elevation, Radius } from "../../themes";
import {
  Body1,
  Body2,
  Body3,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "../../components/Atom/Typography";
import { Col, Row } from "react-grid-system";
import JobCard from "../../components/Organism/Card/JobCard";
import InputSearchField from "../../components/Atom/Input Field/SearchField";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
//
import { DUMMY_DATA } from "../../utils/DummyData";
import EmptyState from "./EmptyState";
import Toaster from "../../components/Molecul/Toaster";

import Pagination from "../../components/Atom/Pagination";
import useMediaQuery from "../../utils/useMediaQuery";
import { useRouter } from "next/router";

// import backgroundBlue from "../../../public/images/Principle/Background/Light Blue Desktop.png";

const SavedCompany = (props) => {
  const {
    handleOpenCompanyName,
    openAllJobsCompany,
    valueSearch,
    handleData,
  } = props;

  const maxWidth1 = useMediaQuery("(max-width: 1007px)");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [wordEnteredCompany, setWordEnteredCompany] = useState("");
  //TOASTER
  const [openToaster, setOpenToaster] = useState(false);
  const [openToaster2, setOpenToaster2] = useState(false);
  const [labelToaster, setLabelToaster] = useState("");
  const [variantToaster, setVariantToaster] = useState("");
  const [id, setId] = useState();
  const [company, setCompany] = useState();
  const [allJobs, setAllJobs] = useState();
  const [openAllJobs, setOpenAllJobs] = useState(false);

  const router = useRouter();

  const [state, setState] = useState([
    {
      id: 1,
      company: "microsoft",
      subscribe: true,
      lowongan: [
        {
          id: 1,
          title: "UI Designer",
          company: "Microsoft",
          salary: "Rp 9,5 juta - 15,6 juta/bulan",
          description: "Jakarta Selatan • Full-time • Hybrid",
          profileMatch: 80,
          timestamp: "5 jam lalu",
          bookmark: true,
          prioritas: true,
        },
        {
          id: 2,
          title: "Finance manager",
          company: "Microsoft",
          salary: "Rp 9,5 juta - 15,6 juta/bulan",
          description: "Jakarta Selatan • Full-time • Hybrid",
          profileMatch: 39,
          timestamp: "5 jam lalu",
          bookmark: false,
          prioritas: true,
        },
        {
          id: 3,
          title: "UI Designer",
          company: "Microsoft",
          salary: "Rp 9,5 juta - 15,6 juta/bulan",
          description: "Jakarta Selatan • Full-time • Hybrid",
          profileMatch: 79,
          timestamp: "5 jam lalu",
          bookmark: false,
          prioritas: false,
        },
        {
          id: 4,
          title: "UI Designer",
          company: "Microsoft",
          salary: "Rp 9,5 juta - 15,6 juta/bulan",
          description: "Jakarta Selatan • Full-time • Hybrid",
          profileMatch: 79,
          timestamp: "5 jam lalu",
          bookmark: false,
          prioritas: false,
        },
        {
          id: 5,
          title: "UI Designer",
          company: "Microsoft",
          salary: "Rp 9,5 juta - 15,6 juta/bulan",
          description: "Jakarta Selatan • Full-time • Hybrid",
          profileMatch: 79,
          timestamp: "5 jam lalu",
          bookmark: false,
          prioritas: false,
        },
      ],
    },
    {
      id: 2,
      company: "facebook",
      subscribe: true,
      lowongan: [
        {
          id: 1,
          title: "UI Designer",
          company: "Facebook",
          salary: "Rp 9,5 juta - 15,6 juta/bulan",
          description: "Jakarta Selatan • Full-time • Hybrid",
          profileMatch: 80,
          timestamp: "5 jam lalu",
          bookmark: true,
          prioritas: false,
        },
        {
          id: 2,
          title: "Finance manager",
          company: "Facebook",
          salary: "Rp 9,5 juta - 15,6 juta/bulan",
          description: "Jakarta Selatan • Full-time • Hybrid",
          profileMatch: 39,
          timestamp: "5 jam lalu",
          bookmark: false,
          prioritas: true,
        },
        {
          id: 3,
          title: "UI Designer",
          company: "Facebook",
          salary: "Rp 9,5 juta - 15,6 juta/bulan",
          description: "Jakarta Selatan • Full-time • Hybrid",
          profileMatch: 79,
          timestamp: "5 jam lalu",
          bookmark: true,
          prioritas: false,
        },
        {
          id: 4,
          title: "UI Designer",
          company: "Facebook",
          salary: "Rp 9,5 juta - 15,6 juta/bulan",
          description: "Jakarta Selatan • Full-time • Hybrid",
          profileMatch: 79,
          timestamp: "5 jam lalu",
          bookmark: false,
          prioritas: true,
        },
        {
          id: 5,
          title: "UI Designer",
          company: "Facebook",
          salary: "Rp 9,5 juta - 15,6 juta/bulan",
          description: "Jakarta Selatan • Full-time • Hybrid",
          profileMatch: 79,
          timestamp: "5 jam lalu",
          bookmark: false,
          prioritas: false,
        },
        {
          id: 6,
          title: "UI Designer",
          company: "Facebook",
          salary: "Rp 9,5 juta - 15,6 juta/bulan",
          description: "Jakarta Selatan • Full-time • Hybrid",
          profileMatch: 79,
          timestamp: "5 jam lalu",
          bookmark: false,
          prioritas: false,
        },
      ],
    },
  ]);

  //-------------------------------
  // const SAVED_COMPANY = DUMMY_DATA.DATA_PERUSAHAAN_TERSIMPAN.map(function (x) {
  //   return x;
  // });

  useEffect(() => {
    setOpenAllJobs(openAllJobsCompany);
  }, [openAllJobsCompany]);

  const SAVED_COMPANY = state?.map(function (x) {
    return x;
  });

  useEffect(() => {
    handleData(state);
  }, []);

  const searchFilteredDataCompany = SAVED_COMPANY?.filter((value) => {
    if (isMobile) {
      if (!valueSearch) {
        return value;
      } else {
        return value?.company
          .toLowerCase()
          .includes(valueSearch?.toLowerCase());
      }
    } else {
      if (!wordEnteredCompany) {
        return value;
      } else {
        return value?.company
          .toLowerCase()
          .includes(wordEnteredCompany?.toLowerCase());
      }
    }
  });
  //-------------------------------

  const handleClickAllJobs = (companyName) => {
    if (isMobile) {
      const AllJobsFiltered = SAVED_COMPANY?.filter((value) => {
        return value?.company
          .toLowerCase()
          .includes(companyName?.toLowerCase());
      });
      setAllJobs(AllJobsFiltered[0]);
      setOpenAllJobs(true);
      window?.scrollTo(0, 0);
      handleOpenCompanyName(companyName);
    } else {
      router.push(`/search-lowongan/company/${companyName}`);
    }
  };
  //-------------------------------

  const handleChangeInputSearchCompany = (val) => {
    val ? setWordEnteredCompany(val) : setWordEnteredCompany("");
  };

  //-------------------------------
  const handleBookmark = (company, job) => {
    setId(job);
    setCompany(company);
    let idxCompany = state.findIndex((x) => x.id === company);
    let idxJob = state[idxCompany].lowongan.findIndex((x) => x.id === job);

    let temporaryarray = state[idxCompany].lowongan.slice();

    if (temporaryarray[idxJob].bookmark == false) {
      temporaryarray[idxJob].bookmark = true;
      setState([...state]);
      setLabelToaster("Lowongan berhasil disimpan");
      setVariantToaster("success");
      setOpenToaster2(true);
    } else {
      temporaryarray[idxJob].bookmark = false;
      setState([...state]);
      setLabelToaster("Lowongan Disimpan telah dihapus");
      setVariantToaster("undo");
      setOpenToaster2(true);
    }
  };

  const handleSubscribe = (val) => {
    setId(val);
    let index = state.findIndex((x) => x.id === val);

    if (index !== -1) {
      let temporaryarray = state.slice();
      if (temporaryarray[index].subscribe == true) {
        temporaryarray[index].subscribe = false;
        setState(temporaryarray);
        setLabelToaster("Perusahaan Disubscribe telah dihapus");
        setVariantToaster("undo");
        setOpenToaster(true);
      } else {
        temporaryarray[index].subscribe = true;
        setState(temporaryarray);
        setLabelToaster("Perusahaan berhasil Disubscribe");
        setVariantToaster("success");
        setOpenToaster(true);
      }
    } else {
      console.log("no match!");
    }
  };

  return (
    <>
      <style jsx>{`
        .cards {
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-gap: 16px;
          // margin-top: 16px;
          margin-bottom: ${searchFilteredDataCompany.length == 0
            ? "8px"
            : "16px"};
        }

        .btn-lihat-semua {
          // margin-bottom: 24px;
        }

        .body {
          background: url("/images/Principle/Background/Light Blue Desktop.png")
            no-repeat top;
          // background-size: 100%;
        }

        .wrapperCountTitleMobile {
          width: 99.5vw !important;
          background-color: white;
          margin: 0 calc(-50vw + 50%);
          height: ${openAllJobs ? "48px" : "26px"};
          padding: 0 18px;
          border-top: 1px solid #eeeeee;
        }
        .slider-mobile {
          width: 98.5vw;
          overflow-x: auto;
          display: flex;
          gap: 12px;
          padding: 0 16px;
          ::-webkit-scrollbar-thumb {
            display: none;
          }
        }

        .strikethough {
          display: flex;
          width: 100%;
          flex-basis: 100%;
          align-items: center;
          color: #888888;
          font-size: 12px;
          font-weight: 400;
          margin: 8px 0px;
        }
        .strikethough::before {
          content: "";
          flex-grow: 1;
          background: #d2d2d2;
          height: 1px;
          font-size: 0px;
          line-height: 0px;
          margin: 0px 4px 0 16px;
        }
        .strikethough::after {
          content: "";
          flex-grow: 1;
          background: #d2d2d2;
          height: 1px;
          font-size: 0px;
          line-height: 0px;
          margin: 0px 16px 0 4px;
        }
      `}</style>
      <div className="body">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: isMobile ? "0" : "24px",
            position: "static",
            // width: "100%",
            // maxWidth: "1200px",
            height: "100%",
            backgroundColor: !isMobile && "white",
            borderRadius: "8px",
            boxShadow: Elevation.card,
            marginBottom: !isMobile && "24px",
            paddingBottom: isMobile && "140px",
          }}
        >
          <div
            style={{
              display: "flex",
              // margin: "24px 0",
              marginBottom: isMobile ? "8px" : "16px",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              position: isMobile && "sticky",
              top: isMobile && "56px",
              zIndex: isMobile && 5,
            }}
          >
            <div
              className={
                isMobile
                  ? "wrapperCountTitleMobile text-perusahaan-subscribe"
                  : "text-perusahaan-subscribe"
              }
              style={{ width: openAllJobs && "100%" }}
            >
              {openAllJobs && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {isMobile ? (
                    <Body3 style={{ lineHeight: "48px" }}>
                      {allJobs?.lowongan?.length} Lowongan Terbuka
                    </Body3>
                  ) : maxWidth1 ? (
                    <Heading5>
                      {allJobs?.lowongan?.length} Lowongan Terbuka
                    </Heading5>
                  ) : (
                    <Heading3>
                      {allJobs?.lowongan?.length} Lowongan Terbuka
                    </Heading3>
                  )}

                  <div
                    style={{
                      width: isMobile ? "120px" : "160px",
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    <RectangleButton
                      variant="ghost"
                      subscribe={allJobs?.subscribe}
                      fullWidth
                      onClick={() => handleSubscribe(allJobs?.id)}
                      customStyle={{ borderRadius: "4px" }}
                    >
                      {allJobs?.subscribe ? `Disubscribe` : `Subscribe`}
                    </RectangleButton>
                  </div>
                </div>
              )}

              {!openAllJobs &&
                (isMobile ? (
                  <Body3 style={{ lineHeight: "26px" }}>
                    {searchFilteredDataCompany?.length} Perusahaan yang
                    Disubscribe
                  </Body3>
                ) : maxWidth1 ? (
                  <Heading5>
                    {searchFilteredDataCompany?.length} Perusahaan yang
                    Disubscribe
                  </Heading5>
                ) : (
                  <Heading3>
                    {searchFilteredDataCompany?.length} Perusahaan yang
                    Disubscribe
                  </Heading3>
                ))}
            </div>

            {!isMobile && !openAllJobs && (
              <div style={{ width: "320px" }}>
                <InputSearchField
                  label="Cari di Perusahaan Disubscribe"
                  placeholder="Cari di Perusahaan Disubscribe"
                  handleChange={handleChangeInputSearchCompany}
                  fullWidth
                />
              </div>
            )}
          </div>

          <div
            className={isMobile && "body"}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            {!openAllJobs ? (
              searchFilteredDataCompany?.map((company) => {
                return (
                  <div
                    key={company.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      backgroundColor: isMobile && "white",
                      padding: isMobile && "8px 16px",
                    }}
                  >
                    <div
                      className={maxWidth1 ? "d-flex-fullwidth" : "d-flex"}
                      style={{
                        marginBottom: isMobile ? "8px" : "16px",
                        flexDirection: isMobile && "column",
                        gap: isMobile && "8px",
                        alignItems: isMobile && "flex-start",
                      }}
                    >
                      <div className="d-flex" style={{ width: `fit-content` }}>
                        <img
                          alt=""
                          src="/images/Principle/Logo/Karir/Avatar/Karir=Blue.png"
                          style={{ width: 44, height: 44 }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: 12,
                            marginRight: 24,
                          }}
                        >
                          <Heading4
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              width: "100%",
                              textTransform: "capitalize",
                              fontSize: isMobile ? "14px" : "16px",
                            }}
                          >
                            {company?.company}
                          </Heading4>
                          <Heading5
                            style={{
                              color: Colors.secondary.highlight_green,
                              fontSize: isMobile ? "12px" : "14px",
                            }}
                          >
                            3 lowongan baru
                          </Heading5>
                        </div>
                      </div>

                      <div style={{ width: isMobile ? "100%" : "160px" }}>
                        <RectangleButton
                          variant="ghost"
                          // selected={isSubscribe}
                          subscribe={company?.subscribe}
                          fullWidth
                          onClick={() => handleSubscribe(company?.id)}
                          customStyle={{
                            margin: "0",
                            borderRadius: isMobile ? "4px" : "8px",
                            height: isMobile && "32px",
                          }}
                        >
                          <span
                            style={{ fontSize: isMobile ? "12px" : "14px" }}
                          >
                            {company?.subscribe ? `Disubscribe` : `Subscribe`}
                          </span>
                        </RectangleButton>
                      </div>
                    </div>
                    {isMobile ? (
                      <div className="slider-mobile">
                        {company?.lowongan
                          ?.slice(0, maxWidth1 ? 3 : 4)
                          .map((job) => {
                            return (
                              <Col lg={3} md={4} sm={4} xs={4} key={job.id}>
                                <JobCard
                                  title={job.title}
                                  company={job.company}
                                  salary={job.salary}
                                  description={job.description}
                                  profileMatch={job.profileMatch}
                                  timestamp={job.timestamp}
                                  variant="vertical"
                                  bookmark={job.bookmark}
                                  prioritas={job.prioritas}
                                  fullWidth
                                  onBookmark={() =>
                                    handleBookmark(company.id, job.id)
                                  }
                                  margin="0 0 8px 0"
                                />
                              </Col>
                            );
                          })}
                      </div>
                    ) : (
                      <div style={{ width: "100%" }}>
                        <Row
                          gutterWidth={16}
                          style={{
                            flexFlow: "unset",
                            WebkitFlexFlow: "unset",
                            overflowY: "hidden",
                          }}
                        >
                          {company?.lowongan
                            ?.slice(0, maxWidth1 ? 3 : 4)
                            .map((job) => {
                              return (
                                <Col lg={3} md={4} sm={4} xs={4} key={job.id}>
                                  <JobCard
                                    title={job.title}
                                    company={job.company}
                                    salary={job.salary}
                                    description={job.description}
                                    profileMatch={job.profileMatch}
                                    timestamp={job.timestamp}
                                    variant="vertical"
                                    bookmark={job.bookmark}
                                    prioritas={job.prioritas}
                                    fullWidth
                                    onBookmark={() =>
                                      handleBookmark(company.id, job.id)
                                    }
                                    margin="0 0 8px 0"
                                  />
                                </Col>
                              );
                            })}
                        </Row>
                      </div>
                    )}

                    <div className="btn-lihat-semua">
                      <RectangleButton
                        variant="text"
                        fullWidth
                        customStyle={{ margin: "12px 0", height: "22px" }}
                        onClick={() => handleClickAllJobs(company?.company)}
                      >
                        Lihat Semua ({company?.lowongan?.length})
                      </RectangleButton>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ width: "100%", padding: isMobile && "0 16px" }}>
                    <Row gutterWidth={16}>
                      {allJobs?.lowongan?.map((job) => {
                        return (
                          <Col lg={3} md={4} sm={4} xs={12} key={job.id}>
                            <JobCard
                              title={job.title}
                              company={job.company}
                              salary={job.salary}
                              description={job.description}
                              profileMatch={job.profileMatch}
                              timestamp={job.timestamp}
                              variant={isMobile ? "horizontal" : "vertical"}
                              bookmark={job.bookmark}
                              prioritas={job.prioritas}
                              fullWidth
                              onBookmark={() =>
                                handleBookmark(allJobs?.id, job?.id)
                              }
                              margin="0 0 8px 0"
                              // customHeight={isMobile && "149px"}
                              customHeight={isMobile && "auto"}
                            />
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            {searchFilteredDataCompany?.length == 0 && <EmptyState />}

            {isMobile
              ? searchFilteredDataCompany?.length !== 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      margin: "28px 0 50px 0",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src="/images/Principle/Logo/Checklist.png"
                      alt="checklist-image"
                    />
                    <span className="strikethough">Halaman Akhir</span>
                    <Body3 style={{ color: "#888888" }}>
                      Anda sudah melihat semua
                      {openAllJobs ? " Lowongan " : " Perusahaan "}
                      pada halaman ini
                    </Body3>
                    <RectangleButton
                      variant="text"
                      fullWidth
                      customStyle={{
                        margin: "4px 0",
                        height: "22px",
                        width: "max-content",
                      }}
                      onClick={() => (window.location.href = "/")}
                    >
                      Kembali ke Halaman Utama
                    </RectangleButton>
                  </div>
                )
              : !wordEnteredCompany && (
                  <div style={{ width: "fit-content" }}>
                    <Pagination />
                  </div>
                )}
          </div>
        </div>
      </div>
      <Toaster
        fullWidth
        variant={variantToaster}
        open={openToaster}
        label={`${labelToaster}`}
        setOpen={() => setOpenToaster(false)}
        handleClick={() => handleSubscribe(id)}
        mobile={true}
      />
      <Toaster
        // fullWidth
        variant={variantToaster}
        open={openToaster2}
        label={`${labelToaster}`}
        setOpen={() => setOpenToaster2(false)}
        handleClick={() => handleBookmark(company, id)}
        mobile={true}
      />
    </>
  );
};

export default SavedCompany;
