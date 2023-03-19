import { calendar } from "lib/recallHelpers";
import { client } from "lib/sanity-client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, {  useState } from "react";
import { api } from "~/utils/api";
import { QueryCache } from "@tanstack/react-query";
import { AllTechnos, ALLTECHNOS } from "queries/queries";

// Enable NextJS to cache and dedupe queries


const Technos = ({technos}: AllTechnos) => {
  
  return (
   
      <>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="grid grid-cols-1 gap-3 p-10 md:  md:grid-cols-2">
            {technos.map((techno) => {
              return (
                <div
                  className=""
                  key={techno._id}
                >
                  <Link
                    className=""
                    href={`./decks/${techno.name}`}
                  >
                    <img
                      className="max-w-xs rounded-lg text-white lg:max-w-sm"
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