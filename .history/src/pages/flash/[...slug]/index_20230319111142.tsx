import React from 'react'

const FlashCard = ({query}) => {
  return (
    <div>FlashCard</div>
  )
}

export default FlashCard

export const getServerSideProps = async ({query}: any) => {
  console.log(query)

  return {
    props : {
      query
    }
  }

}