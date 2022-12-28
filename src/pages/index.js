import Head from "next/head";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Index() {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return <p>Loading...</p>;
  }

  console.log(session);

  return (
    <div>
      <Head>
        <title>NextAuth Google Authentication</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Google Authentication with NextAuth </h1>

      {!session && (
        <>
          <button onClick={() => signIn("google")}>Sign In</button>
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
