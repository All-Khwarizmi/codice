import React from 'react'
import { client } from 'lib/sanity-client'
import { DECKBYNAME } from 'queries/queries'
const FlashCard = ({params, data}: any) => {
  console.log(params)
  console.log(
    "Params",
    params.slug.toString()
  );
   console.log("Data in flash", data);
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
}

export default FlashCard

export const getServerSideProps = async ({params}: any) => {
  const data = await client.fetch(DECKBYNAME, {name: params.slug.toString()})
  
  console.log("Params in flash",params.slug)
  console.log("Data in flash", data)

  return {
    props : {
      params,
      data
    }
  }

}