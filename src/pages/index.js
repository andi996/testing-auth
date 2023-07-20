import Head from "next/head";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  const { data: session, status, update: sessionUpdate } = useSession();

  const updateSession = async () => {
    // if(session)
    await sessionUpdate({
      newLevel: "SANGAT JAGO",
    });
  };

  useEffect(() => {
    if (router.query.error) {
      alert(router.query.error);
    }
  }, [router]);

  if (status == "loading") {
    return <p>Loading...</p>;
  }

  // console.log(session);

  const datas = {
    id: 10115623,
    name: "andri",
    email: "tes@gmail.com",
    age: 26,
    redirect: false,
  };

  const handleLogin = async (e, provider) => {
    e.preventDefault();
    window.history.pushState({}, document.title, window.location.pathname);
    signIn(provider, { redirect: false });
  };

  const handleCredential = async (e) => {
    e.preventDefault();
    window.history.pushState({}, document.title, window.location.pathname);

    let response = await signIn("credentials", {
      data: JSON.stringify(datas),
      redirect: false,
      // callbackUrl: redirect,
    });
    let result = await response;

    // console.log(result);

    if (!result.ok) {
      console.log("gagal login");
    }

    // if (result?.status == 200) {
    //   window.location.replace("/profile");
    // }
  };

  return (
    <div>
      <Head>
        <title>NextAuth Authentication</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Google or Facebook Authentication with NextAuth </h1>

      <button
        onClick={() => console.log({ session })}
        style={{ marginBottom: 20 }}
      >
        console SESSION
      </button>

      <button onClick={updateSession} style={{ marginBottom: 20 }}>
        UPDATE SESSION
      </button>

      <br></br>

      {!session && (
        <>
          <button
            onClick={() => window.location.replace("/login")}
            style={{ marginBottom: 20 }}
          >
            go to login page
          </button>
          <div style={{ display: "flex" }}>
            <button
              onClick={(e) => {
                // console.log(window.location.href);
                window.history.pushState(
                  {},
                  document.title,
                  window.location.pathname
                );
                // console.log(window.location.pathname);
                // console.log(window.location.href);
              }}
            >
              Tes Clear Params
            </button>
            <button onClick={(e) => handleCredential(e)}>
              Sign In Credentials
            </button>
            <button onClick={(e) => handleLogin(e, "google")}>
              Sign In Google
            </button>
            <button onClick={(e) => handleLogin(e, "facebook")}>
              Sign In Facebook
            </button>
          </div>
        </>
      )}

      {session && (
        <>
          <h4>You are logged as: {session.user.name}</h4>
          <div>
            <h4>Email: {session.user.email}</h4>
            <br />
            {session.user.image && (
              <span>
                <img src={session.user.image} alt={session.user.name} />
              </span>
            )}
          </div>
          <br />
          <br />
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      )}
    </div>
  );
}
