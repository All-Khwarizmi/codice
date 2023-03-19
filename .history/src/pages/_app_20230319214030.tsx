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
        
 {/*  <!-- HTML Meta Tags --> */}
  <title>Codice</title>
  <meta name="description" content="Neuroscience based application to ice your code interview"/>

  {/* <!-- Facebook Meta Tags --> */}
  <meta property="og:url" content="https://codice-it.vercel.app/"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="Codice"/>
  <meta property="og:description" content="Neuroscience based application to ice your code interview"/>
  <meta property="og:image" content="https://codice-it.vercel.appfavicon.ico"/>

  {/* <!-- Twitter Meta Tags --> */}
  <meta name="twitter:card" content="summary_large_image"/>
  <meta property="twitter:domain" content="codice-it.vercel.app"/>
  <meta property="twitter:url" content="https://codice-it.vercel.app/"/>
  <meta name="twitter:title" content="Codice"/>
  <meta name="twitter:description" content="Neuroscience based application to ice your code interview"/>
  <meta name="twitter:image" content="https://codice-it.vercel.appfavicon.ico"/>

  <!-- Meta Tags Generated via https://www.opengraph.xyz -->
        
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
