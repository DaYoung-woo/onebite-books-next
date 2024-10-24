import { BookData } from "@/types";

export default async function fetchOneBooks(id: number) : Promise<BookData | null> {    
  try{
    const res = await fetch(`https://onebite-books-server-delta.vercel.app/book/${id}`);
    if(!res.ok){
      throw new Error('도서 데이터를 가져오지 못했습니다.');
    }
    return await res.json();
  } catch(e) {
    console.error(e);
    return null
  }         
}