import React from 'react'
import { client } from 'lib/sanity-client';
import { AllTechnos, ALLTECHNOS } from 'queries/queries';
import { Technos } from 'typings';

const AllTchnos = ({ technos }: AllTechnos) => {
  console.log(technos)
  return (
    <>
      <>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
      </>
    </>
  );
};

export default AllTchnos

const getStaticProps = async () => {
 const technos: Technos[] = await client.fetch(ALLTECHNOS);

  return {props = {
    technos,
  }};
}