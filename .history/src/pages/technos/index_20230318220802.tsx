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


const Technos: NextPage = () => {
  
  return (
   
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