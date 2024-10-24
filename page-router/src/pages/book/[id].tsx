import React from 'react'
import style from './[id].module.css'
import {  GetStaticPropsContext, InferGetStaticPropsType } from 'next/types';
import fetchOneBooks from '@/lib/fetch-one-books';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const id = context.params!.id;
//   const book  = await fetchOneBooks(Number(id));

//   return {
//     props: {
//       book
//     }
//   }
// }

// const Page = ({book}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
//   if(!book) return '도서 정보를 가져오지 못했습니다.'
  

//   const { title, subTitle, description, author, publisher, coverImgUrl} = book;

//   return (
//     <div className={style.container}>
//       <div style={{backgroundImage: `url(${coverImgUrl})`}} className={style.cover_img_container}>
//         <Image src={coverImgUrl} alt={title} />
//       </div>
//       <div className={style.title}>{title}</div>
//       <div className={style.subTitle}>{subTitle}</div>
      
//       <div className={style.author}>{author} | {publisher}</div>
//       <div className={style.description}>{description}</div>
//     </div>
//   )
// }

export const getStaticPaths = async () => {
  // const books = await fetchOneBooks(1);
  // const paths = books.map(book => ({
  //   params: { id: book.id.toString() }
  // }));

  // 꼭 문자열로 지정해줘야 함
  return {
    paths: [
      {params: {id: '1'}},
      {params: {id: '2'}},
      {params: {id: '3'}}
    ],
    // fallback : 설정해둔 params와 일치하지 않는 경우
    // false로 설정하면 지정해둔 값과 일치하지 않는 경우 없는페이지(404)로 렌더링
    // blocking으로 설정하면 즉시 생성(SSR처럼 동작) 완성되야 보내줌
    // true로 설정하면 즉시 생성 + 페이지만 미리 반환하고 getStaticPaths안에 내용을 계산해서 따로 보내줌
    fallback: true
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book  = await fetchOneBooks(Number(id));

  if(!book) {
    return {
      notFound: true
    }
  }
  
  return {
    props: {
      book
    }
  }
}

const Page = ({book}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  if(router.isFallback) {
    return <>
      <Head>
        <meta property='og:image' content="/thumbnail.png"></meta>
        <meta property="og:title" content="한입북스"/>
        <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요"/>
      </Head>
      <div>loading...</div>
    </>
  }
  // fallback 상황에도 이 문구가 나옴
  // 로딩중입니다를 사용하면 진짜 정보가 없을 때 곤란함
  // 따라서 위처럼 router.isFallback을 통해 분기 처리
  if(!book) return '도서 정보를 가져오지 못했습니다.'

  const { title, subTitle, description, author, publisher, coverImgUrl} = book;

  return (
    <>
      <Head>
        <meta property='og:image' content={coverImgUrl}></meta>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
      </Head>
      <div className={style.container}>

        <div style={{backgroundImage: `url(${coverImgUrl})`}} className={style.cover_img_container}>
          <Image src={coverImgUrl} alt={title} width={240} height={480}/>
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        
        <div className={style.author}>{author} | {publisher}</div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  )
}


export default Page