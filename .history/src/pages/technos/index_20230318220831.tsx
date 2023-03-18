import { calendar } from "lib/recallHelpers";
import { client } from "lib/sanity-client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, {  useState } from "react";
import { api } from "~/utils/api";
import { QueryCache } from "@tanstack/react-query";
import { ALLTECHNOS } from "queries/queries";

// Enable NextJS to cache and dedupe queries


const Technos: NextPage = ({}) => {
  
  return (
    <>
      <>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="grid grid-cols-1 gap-3 p-10  md:grid-cols-3">
            {technos.map((techno) => {
              return (
                <div key={techno._id}>
                  <Link href={{ pathname: "./deck", query: techno.name }}>
                    <img
                      className="rounded-lg"
                      src={techno.image.asset.url}
                      alt={`${techno.name} image`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </main>
      </>
    </>
  );
};

export default Technos;

export const getStaticProps = async () => {
  const technos = await client.fetch(ALLTECHNOS);

  return {
    props: {
      technos,
    },
  };
};