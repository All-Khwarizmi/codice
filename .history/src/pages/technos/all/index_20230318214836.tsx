import React from 'react'
import { client } from 'lib/sanity-client';
import { AllTechnos, ALLTECHNOS } from 'queries/queries';
import { Technos } from 'typings';

const AllTchnos = (technos: any) => {
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

const getServerSideProps = async () => {
 const technos: Technos[] = await client.fetch(ALLTECHNOS);
console.log(technos)
  return {props : {
    technos,
  }};
}