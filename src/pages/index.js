import Head from "next/head";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Index() {
  const { data: session, status } = useSession();

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

  const loginFacebook = () => {
    signIn("facebook", { redirect: false }).then(({ ok, error, status }) => {
      if (ok) {
        console.log("ISI STATUS", status);
        console.log("ISI OK", ok);
      } else {
        console.log("ISI ERROR", status);
        console.log("ISI STATUS", error);
      }
    });
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
          <button
            onClick={() =>
              signIn("credentials", {
                data: JSON.stringify(datas),
                callbackUrl: "/profile-two",
              })
            }
          >
            Sign In Credentials
          </button>
          <button onClick={() => signIn("google")}>Sign In Google</button>

          <button onClick={() => loginFacebook()}>
            Sign In Facebook Normally
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
