import SearchableLayout from '@/components/searchable-layout';
import style from './index.module.css'
import { ReactNode } from 'react';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';
import { fetchBooks } from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';
import Head from 'next/head'

// 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
// export const  getStaticProps = async () => {
//   const [allBooks, recoBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);
//   return {
//     props: {
//       allBooks,
//       recoBooks
//     },
//     // isr 유통기한   
//     revalidate: 3,
//   }
// }

export const  getStaticProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);
  return {
    props: {
      allBooks,
      recoBooks
    },
  }
}

// On-Demend ISR  
// 요청 받을 때마다 페이지를 다시 생성
export default function Home({allBooks, recoBooks}: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property='og:image' content="/thumbnail.png"></meta>
        <meta property="og:title" content="한입북스"/>
        <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요"/>
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천히는 도서</h3>
          {recoBooks.map(book => <BookItem key={book.id} {...book} />)}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map(book => <BookItem key={book.id} {...book} />)}
        </section>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactNode ) {
  return <SearchableLayout>{page}</SearchableLayout>;
};