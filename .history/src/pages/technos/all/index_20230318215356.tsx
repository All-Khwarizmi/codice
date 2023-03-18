import React from 'react'
import { client } from 'lib/sanity-client';
import { AllTechnos, ALLTECHNOS } from 'queries/queries';
import { Technos } from 'typings';

const AllTchnos = ({data}: any) => {
  console.log(data)
  return (
    <>
      <>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
      </>
    </>
  );
};

export default AllTchnos

export const getServerSideProps = async () => {
 const res = await client.fetch(ALLTECHNOS)
 const data = await res.json()
console.log(data)
  return {props : {
    data,
  }};
}