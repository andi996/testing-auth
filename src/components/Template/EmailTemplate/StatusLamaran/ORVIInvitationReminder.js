import React from "react";

function ORVIInvitationReminder() {
  return (
    <>
      <style jsx>
        {`
          table {
            border: 0;
            width: 100%;
          }
        `}
      </style>
      <table
        role="presentation"
        cellPadding={0}
        cellSpacing={0}
        style={{ margin: `auto`, maxWidth: `295px` }}
      >
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid #d2d2d2",
                borderBottom: "none",
                padding: "15px",
                paddingBottom: 0,
                verticalAlign: "top",
                textAlign: "center",
                backgroundImage:
                  "url(/images/Principle/Background/backgroundemail.jpeg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <img
                style={{
                  width: "60px",
                  height: "18.34px",
                  marginBottom: `9px`,
                }}
                src="/images/Principle/Logo/Karir/default.png"
                alt="karir.png"
              />
              <br />
              <table
                cellPadding={0}
                cellSpacing={0}
                style={{ minHeight: "65.75px", maxHeight: "65.75px" }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "100%",
                        height: "inherit",
                        maxHeight: "inherit",
                        backgroundImage:
                          "url(/images/Principle/Background/EmailPlaceholder.png)",
                      }}
                    />
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              style={{
                backgroundColor: "#1d62ae",
                paddingBottom: "4px",
                verticalAlign: "top",
              }}
            >
              <table
                cellPadding={0}
                cellSpacing={12}
                style={{ borderSpacing: `16px 0px` }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "none",
                        marginTop: 100,
                        borderBottomLeftRadius: "4px",
                        borderBottomRightRadius: "4px",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <table
                        cellPadding={0}
                        cellSpacing={12}
                        style={{ padding: 4 }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                margin: "auto",
                                width: "fit-content",
                                fontSize: "12px",
                                lineHeight: "16px",
                                fontWeight: 600,
                                color: "#4c4c4c",
                              }}
                            >
                              ORVI Invitation Reminder : <br />
                              [nama perusahaan] - [job title]
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                fontWeight: 400,
                                fontSize: "10px",
                                lineHeight: "14px",
                                color: "#4c4c4c",
                              }}
                            >
                              Hi, [kandidat]
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                fontWeight: 400,
                                fontSize: "10px",
                                lineHeight: "14px",
                                color: "#4c4c4c",
                              }}
                            >
                              Mengingatkan kembali kepada Anda untuk melakukan
                              proses selanjutnya yaitu Online Interview yang
                              berakhir pada tanggal <b>12 Juli 2022</b> melalui
                              rekaman video Karir.com untuk:
                              <br />
                              <br />
                              Posisi : Backend Developer (Do not Apply)
                              <br />
                              Perusahaan : karir.com
                              <br />
                              Deadline : 26-09-2022
                              <br />
                              <br />
                              Wawancara Rekaman video dapat diakses melalui
                              Desktop atau Laptop browser, pastikan untuk
                              mengizinkan akses kamera dan mikrofon.
                              <br />
                              <br />
                              Agar Wawancara Rekaman Video bisa berjalan lancar,
                              Anda diharapkan untuk mengikuti langkah berikut
                              ini:
                              <br />
                              <br />
                              Melalui Web browser :<br />
                              Gunakan web browser Google Chrome
                              <br />
                              Login di website{" "}
                              <a
                                href="https://www.karir.com/"
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  color: `#1D62AE`,
                                  textDecoration: "none",
                                }}
                              >
                                https://karir.com
                              </a>
                              <br />
                              Ikuti petunjuk selanjutnya yang muncul dari pop up
                              message atau
                              <br />
                              Klik pilihan “Undangan Wawancara”
                              <br />
                              Ikuti petunjuk dan tips dari kami.
                              <br />
                              <br />
                              Dengan mengikuti Wawancara Rekaman Video, Anda
                              selangkah lagi mendapatkan pekerjaan impian .
                              Akses ORVi dengan cara klik button dibawah.
                              <br />
                              <br />
                              Selamat berjuang, semoga beruntung!
                              <br />
                              <br />
                              Have a nice day,
                              <br />
                              Tim Karir.com
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <button
                                onClick={() =>
                                  window.open("https://www.karir.com")
                                }
                                style={{
                                  border: 0,
                                  width: "100%",
                                  padding: "8px",
                                  backgroundColor: "#1D62AE",
                                  borderRadius: "4px",
                                  color: "#FFFFFF",
                                  fontWeight: 700,
                                  fontSize: "12px",
                                  lineHeight: "16px",
                                  cursor: `pointer`,
                                }}
                              >
                                Mulai Video Interview
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <table cellSpacing={12}>
                    <tr>
                      <td
                        style={{
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "14px",
                          color: "#FFFFFF",
                          textAlign: "center",
                        }}
                      >
                        Keep in touch with us
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          display: "flex",
                          gap: "12px",
                          justifyContent: "center",
                          height: `fit-content`,
                        }}
                      >
                        <a
                          href="https://www.facebook.com/karirdotcom"
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: `flex`, alignItems: `center` }}
                        >
                          <img
                            width="24px"
                            height="24px"
                            src="https://qareercom-kunkka.nos.jkt-1.neo.id/ATTACHMENT/3c48c664-436b-4a2b-9150-93f8d8005f73-facebook-png.png"
                            alt="facebook.png"
                          />
                        </a>
                        <a
                          href="https://www.instagram.com/karirdotcom/"
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: `flex`, alignItems: `center` }}
                        >
                          <img
                            width="24px"
                            height="24px"
                            src="https://qareercom-kunkka.nos.jkt-1.neo.id/ATTACHMENT/439d8307-1bd5-49c2-8006-9be35a6e0954-instagram-png.png"
                            alt="instagram.png"
                          />
                        </a>
                        <a
                          href="https://twitter.com/karirdotcom"
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: `flex`, alignItems: `center` }}
                        >
                          <img
                            width="24px"
                            height="24px"
                            src="https://qareercom-kunkka.nos.jkt-1.neo.id/ATTACHMENT/b881d5af-da42-4568-9192-3bc1bad0e773-twitter-png.png"
                            alt="twitter.png"
                          />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "18px",
                          color: "#FFFFFF",
                          textAlign: "center",
                        }}
                      >
                        cs@karir.com | 6221 - 5020 - 2010
                        <br />
                        Copyright 2021 PT Qerja Manfaat Bangsa
                        <br />
                        Hak cipta dilindungi undang-undang
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "18px",
                          color: "#FFFFFF",
                          textAlign: "center",
                          padding: 0,
                        }}
                      >
                        Gedung Mangkuluhur City Tower One Lantai 7, Suite 11
                        <br />
                        Jalan Jendral Gatot Subroto Kavling 1,
                        <br />
                        Kota Jakarta Selatan, 12930
                        <br />
                        Kebijakan Privasi | Syarat dan Ketentuan
                      </td>
                    </tr>
                  </table>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ORVIInvitationReminder;
