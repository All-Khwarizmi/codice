import Head from 'next/head';
import React from 'react'

const Header = () => {
  return (
    <Head>
      {/*  <!-- HTML Meta Tags --> */}
      <title>Codice</title>
      <meta
        name="description"
        content="Neuroscience based application to ice your code interview"
      />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content="https://codice-it.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Codice" />
      <meta
        property="og:description"
        content="Neuroscience based application to ice your code interview"
      />
      <meta property="og:image" content="logo.png" />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="logo.png" />
      <meta property="twitter:domain" content="codice-it.vercel.app" />
      <meta property="twitter:url" content="https://codice-it.vercel.app/" />
      <meta name="twitter:title" content="Codice" />
      <meta
        name="twitter:description"
        content="Neuroscience based application to ice your code interview"
      />
      <meta name="twitter:image" content="logo.png" />

      <link rel="icon" href="/logo.png" />
    </Head>
  );
}

export default Header