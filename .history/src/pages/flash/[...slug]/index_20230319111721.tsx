import React from 'react'

const FlashCard = ({params}: any) => {
  console.log(params)
  return (
    <div>FlashCard</div>
  )
}

export default FlashCard

export const getServerSideProps = async ({params}: any) => {
  console.log("Params in flash",params.slug)

  return {
    props : {
      params
    }
  }

}