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

export const getServerSideProps = async ({params}: any) => {
  const 
  console.log("Params in flash",params.slug)

  return {
    props : {
      params
    }
  }

}