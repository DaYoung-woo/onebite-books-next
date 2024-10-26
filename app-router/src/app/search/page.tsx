import React from 'react'

const page = ({searchParams}: {searchParams: {q?: string}}) => {
  return (
    <div>{searchParams.q} 서치 페이지</div>
  )
}

export default page