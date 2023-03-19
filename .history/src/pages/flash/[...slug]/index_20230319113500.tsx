import React from 'react'
import { client } from 'lib/sanity-client'
import { DECKBYNAME } from 'queries/queries'
import { Deck } from 'typings';
const FlashCard = ({ data}: any) => {
 
   console.log("Data in flash", data);
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
}

export default FlashCard


export type FlashData = {
  data : Deck[]
}
export const getServerSideProps = async ({params}: any) => {
  const data: FlashData = await client.fetch(DECKBYNAME, {name: params.slug.toString()})
  
 

  return {
    props : {
      params,
      data
    }
  }

}