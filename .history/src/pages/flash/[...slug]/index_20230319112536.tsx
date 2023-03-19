import React from 'react'
import { client } from 'lib/sanity-client'
import { DECKBYNAME } from 'queries/queries'
const FlashCard = ({params}: any) => {
  console.log(params)
  return (
    <div>FlashCard</div>
  )
}

export default FlashCard

export const getServerSideProps = async ({params, data}: any) => {
  const data = await client.fetch(DECKBYNAME, {name: params.slug})
  
  console.log("Params in flash",params.slug)
  console.log("Data in flash", data)

  return {
    props : {
      params,
      data
    }
  }

}