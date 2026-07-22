import { useContext } from "react";
import { BookmarkContext } from "../context/BookmarlContext";

export function useBookmarks (){
    return useContext(BookmarkContext)
}