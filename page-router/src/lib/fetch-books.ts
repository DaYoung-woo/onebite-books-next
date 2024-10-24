import { BookData } from "@/types";

export const fetchBooks = async (q?: string): Promise<BookData[]> => {
  let url = 'https://onebite-books-server-delta.vercel.app/book'
  if(q){
    url += `/search?q=${q}`
  }

  try{
    const res = await fetch(url);
    
    if(!res.ok){
      throw new Error('도서 데이터를 가져오지 못했습니다.');
    }
    return await res.json();
  }catch(e){
    console.error(e);  
    return [];
  }
};