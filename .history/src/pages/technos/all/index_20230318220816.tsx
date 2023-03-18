import React from 'react'
import { client } from 'lib/sanity-client';
import { AllTechnos, ALLTECHNOS } from 'queries/queries';
import { Technos } from 'typings';
import Link from 'next/link';

const AllTchnos = ({ technos }: AllTechnos) => {
  console.log(technos);
  return (
   
  );
};

export default AllTchnos

export const getStaticProps = async () => {
 const technos = await client.fetch(ALLTECHNOS)

  return {props : {
    technos,
  }};
}