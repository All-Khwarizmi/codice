import React from 'react'
import { client } from 'lib/sanity-client';
import { AllTechnos, ALLTECHNOS } from 'queries/queries';
import { Technos } from 'typings';

const AllTchnos = ({ technos }: AllTechnos) => {
  console.log(technos);
  return (
    <>
      <>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className='grid gap-3 lg:grid-cols-3'>
            {technos.map(techno => {
              return (
                <div key={techno._id}>
                  <img src={techno.image.asset.url} alt={`${techno.name} image`} />
                </div>
              );
            })}

          </div>
        </main>
      </>
    </>
  );
};

export default AllTchnos

export const getStaticProps = async () => {
 const technos = await client.fetch(ALLTECHNOS)

  return {props : {
    technos,
  }};
}