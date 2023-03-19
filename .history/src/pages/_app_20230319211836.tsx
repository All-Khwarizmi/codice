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
        <meta property="og:image" content="favicon.ico"></meta>
        <meta name="twitter:image" content="favicon.ico""></meta>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
