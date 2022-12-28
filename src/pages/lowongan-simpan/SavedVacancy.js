import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
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
import Pagination from "../../components/Atom/Pagination";
//
import { DUMMY_DATA } from "../../utils/DummyData";
import EmptyState from "./EmptyState";
import Toaster from "../../components/Molecul/Toaster";

import useMediaQuery from "../../utils/useMediaQuery";

// import backgroundBlue from "../../../public/images/Principle/Background/Light Blue Desktop.png";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import InfiniteScroll from "react-infinite-scroller";

const SavedVacancy = (props) => {
  const { valueSearch, handleData } = props;

  const mediumToSmallScreen = useMediaQuery("(max-width: 1007px)");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [state, setState] = useState();

  const [wordEnteredVacancy, setWordEnteredVacancy] = useState("");
  //TOASTER
  const [openToaster, setOpenToaster] = useState(false);
  const [labelToaster, setLabelToaster] = useState("");
  const [variantToaster, setVariantToaster] = useState("");
  const [id, setId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [tesData, setTesData] = useState([]);

  //infinite scroll
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setState(DUMMY_DATA?.DATA_LOWONGAN_TERSIMPAN);
    handleData(DUMMY_DATA?.DATA_LOWONGAN_TERSIMPAN?.lowongan);
    window?.scrollTo(0, 0);
  }, []);

  //------------ISI DATA---------
  const SAVED_VACANCY = state?.lowongan.map(function (x) {
    return x;
  });

  const loadList = useCallback(async () => {
    if (fetching) {
      console.log("fetching");
      return;
    }

    setFetching(true);

    try {
      setTimeout(() => {
        const tes = SAVED_VACANCY?.slice(
          (currentPage - 1) * limit,
          (currentPage - 1) * limit + limit
        );
        setTesData(tes);

        if (tes !== undefined)
          if (tes?.length >= SAVED_VACANCY?.length) {
            setHasMoreItems(false);
          } else {
            setHasMoreItems(true);
            setLimit(limit + 5);
          }
      }, 1000);
    } finally {
      setFetching(false);
    }
  }, [tesData, fetching, limit]);

  const searchFilteredData = isMobile
    ? tesData?.filter((value) => {
        if (!valueSearch) {
          return value;
        } else {
          return (
            value?.title.toLowerCase().includes(valueSearch?.toLowerCase()) ||
            value?.company.toLowerCase().includes(valueSearch?.toLowerCase())
          );
        }
      })
    : SAVED_VACANCY?.filter((value) => {
        if (!wordEnteredVacancy) {
          return value;
        } else {
          return (
            value?.title
              .toLowerCase()
              .includes(wordEnteredVacancy?.toLowerCase()) ||
            value?.company
              .toLowerCase()
              .includes(wordEnteredVacancy?.toLowerCase())
          );
        }
      });

  //-------------------------------

  //--------------- HANDLE --------
  const handleChangeInputSearchVacancy = (val) => {
    val ? setWordEnteredVacancy(val) : setWordEnteredVacancy("");
  };

  const handleBookmark = (val) => {
    state?.lowongan?.filter((isiData) => {
      if (isiData.id == val) {
        if (isiData.bookmark == true) {
          setState({
            lowongan: state.lowongan.map((x) =>
              x.id === val && x.bookmark !== false
                ? { ...x, bookmark: false }
                : x
            ),
          });
          setLabelToaster("Lowongan Disimpan telah dihapus");
          setVariantToaster("undo");
          setOpenToaster(true);
        }
        if (isiData.bookmark == false) {
          setState({
            lowongan: state.lowongan.map((x) =>
              x.id === val && x.bookmark !== true ? { ...x, bookmark: true } : x
            ),
          });
          setLabelToaster("Lowongan berhasil disimpan");
          setVariantToaster("success");
          setOpenToaster(true);
        }
      }
      return;
    });
    //-------------------
    setId(val);
    //-------------------

    //-------------------------
  };

  //---------- FUNCTION PAGINATION -------------

  let NUM_OF_RECORDS = searchFilteredData?.length;
  // let LIMIT = 5;
  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = searchFilteredData?.slice(
    (currentPage - 1) * limit,
    (currentPage - 1) * limit + limit
  );
  //-------------------------

  return (
    <>
      <style jsx>{`
        .cards {
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-gap: 16px;
          // margin-top: 16px;
          margin-bottom: ${searchFilteredData?.length == 0 ? "8px" : "16px"};
        }

        .body {
          background: url("/images/Principle/Background/Light Blue Desktop.png")
            no-repeat top;
          // background-size: 100%;
          height: ${currentData && searchFilteredData?.length !== 0
            ? "100%"
            : "85vh"};
        }
        .wrapperCountAndInputSearch {
          width: 99.5vw !important;
          background-color: white;
          margin: 0 calc(-50vw + 50%);
          height: 26px;
          padding: 0 18px;
          border-top: 1px solid #eeeeee;
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
          margin: 0px 4px 0 0;
        }
        .strikethough::after {
          content: "";
          flex-grow: 1;
          background: #d2d2d2;
          height: 1px;
          font-size: 0px;
          line-height: 0px;
          margin: 0px 0 0 4px;
        }
      `}</style>
      <div className={isMobile && currentData ? `body` : null}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: isMobile ? "0 16px" : "24px",
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
              className={isMobile ? "wrapperCountAndInputSearch" : null}
              style={{
                width: "250px",
              }}
            >
              {isMobile ? (
                <Body3 style={{ lineHeight: "26px" }}>
                  {SAVED_VACANCY?.length} Lowongan Disimpan
                </Body3>
              ) : mediumToSmallScreen ? (
                <Heading5>{SAVED_VACANCY?.length} Lowongan Disimpan</Heading5>
              ) : (
                <Heading3>{SAVED_VACANCY?.length} Lowongan Disimpan</Heading3>
              )}
            </div>
            {!isMobile && (
              <div style={{ width: "320px" }}>
                <InputSearchField
                  label="Cari di Lowongan Disimpan"
                  placeholder="Cari di Lowongan Disimpan"
                  handleChange={handleChangeInputSearchVacancy}
                  fullWidth
                />
              </div>
            )}
          </div>

          {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: "100%",
          }}
        > */}
          <div style={{ width: "100%" }}>
            {isMobile ? (
              <InfiniteScroll
                threshold={0}
                pageStart={0}
                loadMore={loadList}
                hasMore={hasMoreItems}
                loader={
                  <JobCard
                    skeleton={true}
                    variant={isMobile ? "horizontal" : "vertical"}
                    fullWidth
                  />
                }
              >
                <Row gutterWidth={16}>
                  {/* <div className="cards"> */}
                  {currentData
                    ? currentData?.map((data, index) => {
                        return (
                          <Col lg={3} md={4} sm={4} xs={12} key={data.id}>
                            <JobCard
                              title={data.title}
                              company={data.company}
                              salary={data.salary}
                              description={data.description}
                              profileMatch={data.profileMatch}
                              timestamp={data.timestamp}
                              variant={isMobile ? "horizontal" : "vertical"}
                              bookmark={data.bookmark}
                              prioritas={data.prioritas}
                              fullWidth
                              onBookmark={() => handleBookmark(data.id)}
                              // customHeight="149px"
                              customHeight="auto"
                            />
                          </Col>
                        );
                      })
                    : null}

                  {/* </div> */}
                </Row>
              </InfiniteScroll>
            ) : (
              <Row gutterWidth={16}>
                {/* <div className="cards"> */}
                {currentData?.map((data, index) => {
                  return (
                    <Col lg={3} md={4} sm={4} xs={12} key={data.id}>
                      <JobCard
                        title={data.title}
                        company={data.company}
                        salary={data.salary}
                        description={data.description}
                        profileMatch={data.profileMatch}
                        timestamp={data.timestamp}
                        variant={isMobile ? "horizontal" : "vertical"}
                        bookmark={data.bookmark}
                        prioritas={data.prioritas}
                        fullWidth
                        onBookmark={() => handleBookmark(data.id)}
                      />
                    </Col>
                  );
                })}

                {/* </div> */}
              </Row>
            )}
          </div>
          {isMobile
            ? searchFilteredData?.length == 0 && !hasMoreItems && <EmptyState />
            : searchFilteredData?.length == 0 && <EmptyState />}

          {isMobile
            ? searchFilteredData?.length !== 0 &&
              !hasMoreItems && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    margin: "28px 0 40px 0",
                    textAlign: "center",
                  }}
                >
                  <img
                    src="/images/Principle/Logo/Checklist.png"
                    alt="checklist-image"
                  />
                  <span className="strikethough">Halaman Akhir</span>
                  <Body3 style={{ color: "#888888" }}>
                    Anda sudah melihat semua Lowongan pada halaman ini
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
            : !wordEnteredVacancy && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    width: "100%",
                  }}
                >
                  {/* <Pagination totalData={searchFilteredData.length} /> */}

                  <div style={{ width: "fit-content" }}>
                    <Pagination
                      totalRecords={NUM_OF_RECORDS}
                      pageLimit={limit}
                      pageNeighbours={8}
                      onPageChanged={onPageChanged}
                      currentPage={currentPage}
                    />
                  </div>
                </div>
              )}
          {/* </div> */}
        </div>
      </div>
      <Toaster
        variant={variantToaster}
        open={openToaster}
        label={`${labelToaster}`}
        setOpen={() => setOpenToaster(false)}
        handleClick={() => handleBookmark(id)}
        mobile={true}
      />
    </>
  );
};

export default SavedVacancy;
