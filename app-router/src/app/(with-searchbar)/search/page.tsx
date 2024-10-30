import React from 'react'

const page = ({searchParams}: {searchParams: {q?: string}}) => {
  return (
    <div>page {searchParams.q}</div>
  )
}

export default page