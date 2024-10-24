import Link from 'next/link'
import React from 'react'
import style from './book-item.module.css'
import Image from 'next/image'
import { BookData } from '@/types'

const BookItem = ({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl
}: BookData) => {
  return (
    <Link href={`/book/${id}`} className={style.container}> 
      <Image src={coverImgUrl} alt={title} width={80} height={120} />
      <div>
        <div>
          <div className={style.title}>{title}</div>
          <div className={style.subTitle}>{subTitle}</div>
        </div>
        <br />
        <div className={style.author}>{author} | {publisher}</div>
      </div>
    </Link>
  )
}

export default BookItem