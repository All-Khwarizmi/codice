import React from 'react'
import { client } from 'lib/sanity-client'
import { DECKBYNAME } from 'queries/queries'
import { Deck } from 'typings';
const FlashCard = ({ data }: FlashData) => {
  console.log("Data in flash", data);
  console.log("Data in flash", data.map(item => console.log("item", item)));
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <section>
          <h1> {data.map(item => {
            return (
              <h1 key={item._id} className="text-white uppercase font-bold text-3xl">
                {item.name}
              </h1>
            )
          })} </h1>
        </section>
        <section>
          <div className=''>

          </div>
        </section>
      </main>
    </>
  );
};

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