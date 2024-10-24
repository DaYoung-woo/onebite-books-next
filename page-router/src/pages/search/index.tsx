import { ReactNode, useEffect, useState } from 'react';
import SearchableLayout from '../../components/searchable-layout';
import BookItem from '@/components/book-item';
import { fetchBooks } from '@/lib/fetch-books';
import { useRouter } from 'next/router';
import { BookData } from '@/types';
import Head from 'next/head';


// 빌드 타임에 딱 한번만 실행되기 때문에 query를 사용할 수 없다.
// 만약 ssg를 사용하고 싶다면 client side에서 추가 구현을 해야 한다.
// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string); 


//   return {
//     props: {
//       books
//     }
//   }
// }



// const Search = ({books}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
//   return (
//     <div>
//       {books.map(book => <BookItem key={book.id} {...book} />)}
//     </div>
//   )
// }

const Search = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter()
  const q = router.query.q as string;
  
  const fetchSearchResult = async () => {
    const books = await fetchBooks(q) ;
    setBooks(books);
  }

  useEffect(() => {
    if(q) fetchSearchResult()
  }, [q]);
  

  return (
    <div>
      <Head>
        <title>한입북스 - 검색 결과</title>
        <meta property='og:image' content="/thumbnail.png"></meta>
        <meta property="og:title" content="한입북스 - 검색 결과"/>
        <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요"/>
      </Head>
      {books.map(book => <BookItem key={book.id} {...book} />)}
    </div>
  )
}


Search.getLayout = function getLayout(page: ReactNode ) {
  return <SearchableLayout>{page}</SearchableLayout>;
}

export default Search