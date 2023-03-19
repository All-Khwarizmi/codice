import React from 'react'

const FlashCard = () => {
  return (
    <div>FlashCard</div>
  )
}

export default FlashCard

export const getServerSideProps = async ({quer}: any) => {
  console.log(context.query)

}