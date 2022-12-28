import { Box } from "@mui/system";
import React from "react";
import { Col, Row } from "react-grid-system";
import JobCard from "../../../components/Organism/Card/JobCard";

const JobRecommend = ({ Mobile }) => {
  const jobs = [
    {
      id: 1,
      title: "Product Designer",
      company: "PT. Makmur Sentosa",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote",
      profileMatch: 80,
      timestamp: "5 jam lalu",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "PT. Qerja Manfaat Bangsa",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote",
      profileMatch: 80,
      timestamp: "5 jam lalu",
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Facebook Indonesia",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote",
      profileMatch: 79,
      timestamp: "5 jam lalu",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Google Chrome Indonesia",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote",
      profileMatch: 80,
      timestamp: "5 jam lalu",
    },
    {
      id: 5,
      title: "UI Designer",
      company: "Linkedin ",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote",
      profileMatch: 80,
      timestamp: "5 jam lalu",
    },
    {
      id: 6,
      title: "Mobile Designer",
      company: "Apple",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote",
      profileMatch: 80,
      timestamp: "5 jam lalu",
    },
    {
      id: 7,
      title: "Interaction Designer",
      company: "Twitter",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote",
      profileMatch: 80,
      timestamp: "5 jam lalu",
    },
    {
      id: 8,
      title: "UI/UX Designer",
      company: "PT. Bytdance Indonesia",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote",
      profileMatch: 80,
      timestamp: "5 jam lalu",
    },
    {
      id: 9,
      title: "UI Designer",
      company: "PT. Qerja Manfaat Bangsa",
      salary: "Rp 9,5 juta - 15,6 juta/bulan",
      description: "Jakarta Selatan • Fulltime • Remote",
      profileMatch: 80,
      timestamp: "5 jam lalu",
    },
  ];

  const classes = {
    FormWrapper: {
      display: `flex`,
      alignItems: "flex-start",
      flexDirection: Mobile ? `column-reverse` : `row`,
      width: `100%`,
    },
  };

  return (
    <Box sx={{ ml: Mobile ? 0 : `64px` }} mb={Mobile ? 0 : `40px`}>
      {Mobile && (
        <Box
          className="d-flex"
          sx={{ maxWidth: `100%`, overflowX: `auto`, p: `6px`, gap: `8px` }}
        >
          {jobs.map((job, index) => {
            return (
              <JobCard
                key={index}
                title={job?.title}
                company={job?.company}
                salary={job?.salary}
                description={job?.description}
                profileMatch={job?.profileMatch}
                timestamp={job?.timestamp}
              />
            );
          })}
        </Box>
      )}

      {!Mobile && (
        <Box>
          <Row gutterWidth={32}>
            {jobs.map((job, index) => {
              return (
                <Col key={index} sm={6} lg={4}>
                  <JobCard
                    title={job?.title}
                    company={job?.company}
                    salary={job?.salary}
                    description={job?.description}
                    profileMatch={job?.profileMatch}
                    timestamp={job?.timestamp}
                  />
                </Col>
              );
            })}
          </Row>
        </Box>
      )}
    </Box>
  );
};

export default JobRecommend;
