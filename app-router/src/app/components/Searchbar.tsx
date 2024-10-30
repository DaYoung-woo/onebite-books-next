'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation'
const Searchbar = () => {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const onChnageSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onClickSearch = () => {
    router.push(`/search?q=${search}`)
  }

  return (
    <div>
      <input type="text" placeholder="검색어를 입력하세요" onChange={onChnageSearch} value={search}/>
      <button onClick={onClickSearch}>검색</button>
    </div>
  )
}

export default Searchbar