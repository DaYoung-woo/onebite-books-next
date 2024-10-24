import { BookData } from "@/types";

export default async function fetchRandomBooks() : Promise<BookData[]> {
  const url = 'https://onebite-books-server-delta.vercel.app/book/random'
  try{
    const res = await fetch(url);
    if(!res.ok){     
      throw new Error('도서 데이터를 가져오지 못했습니다.');
    } 
    return await res.json();
  }catch(errors)  {
    console.error(errors);
    return []
  }
}