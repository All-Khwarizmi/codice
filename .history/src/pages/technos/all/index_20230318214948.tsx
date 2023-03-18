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
 const technos = await fetch(
   "https://q9zxjw08.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22technos%22%5D%7B%0A%20%20_id%2C%0A%20%20name%2C%20%0A%20%20image%20%7B%20asset-%3E%20%7B%0A%20%20%20%20url%0A%20%20%7D%0A%20%20%20%20%7D%0A%7D%0A%0A"
 );
console.log(technos)
  return {props : {
    technos,
  }};
}