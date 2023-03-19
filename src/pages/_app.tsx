import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Codice</title>
        <meta
          name="description"
          content="Neuroscience based application to ice your code interview "
        />
        <meta property="og:url" content="https://codice-it.vercel.app/" />

        <meta property="og:site_name" content="Codice" />
        <meta
          property="og:description"
          content="Neuroscience based application to ice your code interview"
        />
        <meta property="og:image" content="favicon.ico"></meta>
        {/* Twiter */}
        <meta
          name="twitter:card"
          content="Neuroscience based application to ice your code interview "
        />

        <meta
          name="twitter:title"
          content="Title of this page, same as title tag"
        />
        <meta name="twitter:url" content="https://codice-it.vercel.app//" />
        <meta
          name="twitter:description"
          content="Neuroscience based application to ice your code interview "
        />
        <meta name="twitter:image" content="favicon.ico"></meta>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
