import { useEffect, useState } from "react";
import { BookmarkContext } from "../context/BookmarlContext";

export function BookmarkProvider({children}){
    const[bookmarks,setBookmarks] = useState(()=>{
        const savedBooksmarks = localStorage.getItem("bookmarks")
        return savedBooksmarks ? JSON.parse(savedBooksmarks):[];
    });

    useEffect(()=>{
        localStorage.setItem(
            "bookmarks",JSON.stringify(bookmarks)
        )
    },[bookmarks]);

    function addBookmark(article) {
  setBookmarks((prev) => {
    const exists = prev.some(
      (item) => item.url === article.url
    );

    if (exists) return prev;

    return [...prev, article];
  });
}
    function removeBookmark(url){
        setBookmarks((prev)=>prev.filter((article)=>article.url !== url))
    }
    function isBookmarked(url){
        return bookmarks.some((article)=>article.url === url)
    }

    return (
        <BookmarkContext.Provider
        value={{bookmarks,addBookmark,removeBookmark,isBookmarked}}
        >
            {children}
        </BookmarkContext.Provider>
    )
}