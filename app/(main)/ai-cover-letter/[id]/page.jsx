import React from 'react'

const CoverLetter = async ({params}) => {

const id = await params.id;    

 console.log(params.id);   

  return (
    <div> CoverLetter: {id}</div>
  )
}

export default CoverLetter