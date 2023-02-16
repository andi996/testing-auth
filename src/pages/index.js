import Head from "next/head";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      console.log(router.query.error);
      console.log(typeof router.query.error);
    }
  }, [router]);

  if (status == "loading") {
    return <p>Loading...</p>;
  }

  console.log(session);

  const datas = {
    id: 1,
    name: "andri",
    age: 26,
    redirect: false,
  };

  const handleLogin = async (e, provider) => {
    e.preventDefault();
    window.history.pushState({}, document.title, window.location.pathname);
    signIn(provider, { redirect: false });
  };

  return (
    <div>
      <Head>
        <title>NextAuth Authentication</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Google or Facebook Authentication with NextAuth </h1>

      {!session && (
        <>
          {/* <button
            onClick={() =>
              signIn("credentials", {
                data: JSON.stringify(datas),
                callbackUrl: "/profile-two",
              })
            }
          >
            Sign In Credentials
          </button> */}
          <button onClick={(e) => handleLogin(e, "google")}>
            Sign In Google
          </button>
          <button onClick={(e) => handleLogin(e, "facebook")}>
            Sign In Facebook
          </button>
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
