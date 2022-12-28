import { useRouter } from "next/router";
import React, { useState } from "react";
import useMediaQuery from "../../../utils/useMediaQuery";
import {
  Body1,
  Body2,
  Body3,
  Heading4,
  Heading5,
  Heading6,
} from "../../Atom/Typography";

export default function Footer() {
  const maxWidth1 = useMediaQuery("(max-width: 1439px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 400px)");
  const router = useRouter();

  const classes = {
    linkTitle: {
      fontSize: isMobile ? 12 : 16,
      color: `white`,
      marginBottom: `18px`,
      height: isTablet ? 30 : `fit-content`,
    },
    linkItem: {
      cursor: `pointer`,
      fontSize: isMobile ? 10 : 12,
      color: `white`,
    },
  };

  return (
    typeof window !== "undefined" && (
      <>
        <style jsx>
          {`
            .container {
              position: absolute;
              width: 100%;
              background-image: url("/images/Principle/Background/Splashscreen.png");
              background-size: 100% 100%;
              padding-top: 46px;
              padding-left: ${maxWidth1
                ? isTablet
                  ? "16px"
                  : "78px"
                : "120px"};
              padding-right: ${maxWidth1
                ? isTablet
                  ? "16px"
                  : "78px"
                : "120px"};
              padding-bottom: ${maxWidth1
                ? isTablet
                  ? "32px"
                  : "40px"
                : "22px"};

              .wrapper-container {
                display: ${maxWidth1 ? "block" : "flex"};
                justify-content: space-between;

                .left-container {
                  .logo {
                    margin-right: 40px;
                    img {
                      width: ${isMobile ? `122px` : `192px`};
                    }
                  }

                  .menu-wrapper {
                    margin-top: 40px;
                    display: flex;
                    justify-content: space-between;
                    gap: ${isTablet ? "28px" : "78px"};

                    .link-wrapper {
                      display: flex;
                      flex-direction: column;
                      row-gap: 8px;
                    }
                  }
                }

                .right-container {
                  margin-top: ${maxWidth1 ? `50px` : `21px`};
                  margin-bottom: 22px;

                  .illustration-wrapper {
                    text-align: center;
                    width: fit-content;
                    margin: auto;
                  }

                  .illustration {
                    width: ${isMobile ? `80%` : `357px`};
                    margin-bottom: -3px;
                  }

                  .download-wrapper {
                    text-align: left;
                    padding-left: ${isMobile ? `32px` : 0};

                    margin-top: 24px;
                    .download-button {
                      img {
                        width: ${isMobile ? `40%` : `auto`};
                      }
                      margin-top: 12px;
                    }
                  }
                }
              }

              .copyright {
                position: ${isTablet ? "relative" : "absolute"};
                bottom: ${maxWidth1 ? !isTablet && "44px" : "22px"};
                margin-top: 32px;

                .follow-us {
                  width: fit-content;
                  margin-left: auto;
                  margin-right: auto;

                  .social-media {
                    display: flex;
                    align-items: center;
                    margin: 4px 0;
                    img {
                      width: ${isMobile ? `24px` : `auto`};
                    }
                  }
                }

                .copyright-text {
                  display: ${isTablet ? "block" : "none"};
                  margin-top: 60px;
                  text-align: center;
                }
              }

              .copyright-text-2 {
                display: ${maxWidth1 ? "none" : "block"};
                position: absolute;
                width: fit-content;
                bottom: 40px;
                left: 0;
                right: 0;
                margin: 0 auto;
              }
            }
          `}
        </style>
        <div className="container">
          <div className="wrapper-container">
            <div className="left-container">
              <div className="d-flex">
                <div className="logo">
                  <img
                    src="/images/Principle/Logo/Karir/WhiteLogo.png"
                    alt="karir-logo"
                  />
                </div>
                <div className="tagline">
                  <Heading4 color="white">
                    Kami portal lowongan kerja pertama di Indonesia
                  </Heading4>
                </div>
              </div>
              <div className="menu-wrapper">
                <div>
                  <Heading4 sx={classes.linkTitle}>Tentang Karir.com</Heading4>
                  <div className="link-wrapper">
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() => router.push("/company-detail/1")}
                    >
                      Tentang Kami
                    </Heading6>
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() =>
                        (window.location.href =
                          "https://www.karir.com/info/contact-us")
                      }
                    >
                      Kontak Kami
                    </Heading6>
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() =>
                        (window.location.href =
                          "https://blog.karir.com/tag/artikel-pilihan/")
                      }
                    >
                      Inspirasi
                    </Heading6>
                    {/* <Heading6 sx={classes.linkItem} >Topup</Heading6> */}
                    {/* <Heading6 sx={classes.linkItem}>Versi Ponsel</Heading6> */}
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() =>
                        (window.location.href =
                          "https://www.karir.com/employers/registration")
                      }
                    >
                      Bergabung Bersama Kami
                    </Heading6>
                  </div>
                </div>

                <div>
                  <Heading4 sx={classes.linkTitle}>Untuk Jobseeker</Heading4>
                  <div className="link-wrapper">
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() =>
                        router.push("/search-lowongan?tab=lowongan")
                      }
                    >
                      Lowongan
                    </Heading6>
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() =>
                        router.push("/search-lowongan?tab=perusahaan")
                      }
                    >
                      Perusahaan
                    </Heading6>
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() => router.push("/status-lamaran")}
                    >
                      Status Lamaran
                    </Heading6>
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() =>
                        router.push("/lowongan-simpan?tab=lowongan")
                      }
                    >
                      Lowongan disimpan
                    </Heading6>
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() =>
                        router.push("/lowongan-simpan?tab=perusahaan")
                      }
                    >
                      Perusahaan disubscribe
                    </Heading6>
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() => router.push("/search-lowongan")}
                    >
                      Rekomendasi Lowongan
                    </Heading6>
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() => router.push("/search-lowongan")}
                    >
                      Sesuai Preferensi
                    </Heading6>
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() => router.push("/profile")}
                    >
                      Test Kemampuan
                    </Heading6>
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() =>
                        (window.location.href =
                          "https://www.karir.com/info/faq-seeker")
                      }
                    >
                      FAQ untuk Jobseeker
                    </Heading6>
                  </div>
                </div>

                <div>
                  <Heading4 sx={classes.linkTitle}>Untuk Perusahaan</Heading4>
                  <div className="link-wrapper">
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() =>
                        (window.location.href =
                          "https://www.karir.com/employers/registration")
                      }
                    >
                      Beriklan dengan kami
                    </Heading6>
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() =>
                        (window.location.href =
                          "https://www.karir.com/info/faq-employer")
                      }
                    >
                      FAQ untuk Perusahaan
                    </Heading6>
                  </div>
                </div>

                <div>
                  <Heading4 sx={classes.linkTitle}>Bantuan</Heading4>
                  <div className="link-wrapper">
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() =>
                        window.open(
                          "https://api.whatsapp.com/send/?phone=6281314917268&text&type=phone_number&app_absent=0",
                          "_blank"
                        )
                      }
                    >
                      Karir Care
                    </Heading6>
                    <Heading6
                      sx={classes.linkItem}
                      onClick={() =>
                        (window.location.href =
                          "https://www.karir.com/info/terms-conditions")
                      }
                    >
                      Syarat & Ketentuan
                    </Heading6>
                  </div>
                </div>
              </div>
            </div>

            <div className="right-container">
              <div className="illustration-wrapper">
                <img
                  className="illustration"
                  src="/images/Principle/Illustration/Karir App Iphone v2.png"
                  alt="karir-app-iphone"
                />

                <div className="download-wrapper">
                  {isMobile ? (
                    <Body1 color="white">Download Aplikasi</Body1>
                  ) : (
                    <Heading4 color="white">Download Aplikasi</Heading4>
                  )}

                  <div className="download-button d-flex pointer">
                    <img
                      src="/images/Principle/Logo/Button/Playstore-Alternate.png"
                      alt="playstore-download"
                      style={{ marginRight: 12 }}
                      onClick={() =>
                        (window.location.href =
                          "https://play.google.com/store/apps/details?id=com.karirapp.mobile")
                      }
                    />
                    <img
                      src="/images/Principle/Logo/Button/Appstore-Alternate.png"
                      alt="appstore-download"
                      onClick={() =>
                        (window.location.href =
                          "https://apps.apple.com/id/app/karir/id1557390313?l=id")
                      }
                    />
                  </div>
                </div>
                <div
                  className="center"
                  style={{
                    marginTop: 48,
                    display: isTablet ? `none` : maxWidth1 ? `block` : `none`,
                  }}
                >
                  <Heading6 color="white">
                    &copy; 2008 - 2022 | PT Qerja Manfaat Bangsa
                  </Heading6>
                </div>
              </div>
            </div>
          </div>

          <div className="copyright">
            <div className="follow-us">
              {isMobile ? (
                <Body1 color="white">Ikuti Kami</Body1>
              ) : (
                <Heading4 color="white">Ikuti Kami</Heading4>
              )}

              <div className="social-media pointer">
                <img
                  src="/images/Principle/Logo/Button/facebook-white.png"
                  alt="facebook.png"
                  onClick={() =>
                    (window.location.href =
                      "https://www.facebook.com/karirdotcom")
                  }
                />
                <img
                  src="/images/Principle/Logo/Button/Instagram-white.png"
                  alt="instagram.png"
                  onClick={() =>
                    (window.location.href =
                      "https://www.instagram.com/karirdotcom/")
                  }
                />
                <img
                  src="/images/Principle/Logo/Button/linkedin-white.png"
                  alt="linkedin.png"
                  onClick={() =>
                    (window.location.href =
                      "https://www.linkedin.com/company/karirdotcom/")
                  }
                />
                <img
                  src="/images/Principle/Logo/Button/twitter-white.png"
                  alt="twitter.png"
                  onClick={() =>
                    (window.location.href = "https://twitter.com/karirdotcom")
                  }
                />
                <img
                  src="/images/Principle/Logo/Button/tiktok-white.png"
                  alt="tiktok.png"
                  onClick={() =>
                    (window.location.href =
                      "https://www.tiktok.com/@karirdotcom")
                  }
                />
              </div>
              {isMobile ? (
                <Body2 color="white">@karirdotcom</Body2>
              ) : (
                <Heading5 color="white">@karirdotcom</Heading5>
              )}
            </div>

            <div className="copyright-text">
              <Body3 color="white">
                &copy; 2008 - 2022 | PT Qerja Manfaat Bangsa
              </Body3>
            </div>
          </div>

          <div className="copyright-text-2">
            <Heading6 color="white">
              &copy; 2008 - 2022 | PT Qerja Manfaat Bangsa
            </Heading6>
          </div>
        </div>
      </>
    )
  );
}
