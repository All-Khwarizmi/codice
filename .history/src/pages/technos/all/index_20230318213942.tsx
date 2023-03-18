import React from 'react'
import { client } from 'lib/sanity-client';
import { ALLTECHNOS } from 'queries/queries';
import { Technos } from 'typings';

const AllTchnos = ({ technos }: Technos[]) => {
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
 const technos = await client.fetch(ALLTECHNOS);
 const props = {
  technos
 }
  return props
}