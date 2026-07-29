import { createSlice } from "@reduxjs/toolkit"
const loadBookmarks = () => {
  try {
    const bookmarks = localStorage.getItem("bookmarks");

    if (!bookmarks) {
      return [];
    }

    return JSON.parse(bookmarks);
  } catch (error) {
    console.error("Failed to load bookmarks:", error);
    return [];
  }
};
const saveBookmarks = (bookmarks) => {
  try {
    localStorage.setItem(
      "bookmarks",
      JSON.stringify(bookmarks)
    );
  } catch (error) {
    console.error("Failed to save bookmarks:", error);
  }
};
const initialState = {
    Bookmarks:loadBookmarks()
}

 const bookmarkSlice = createSlice({
    name:"bookmark",
    initialState,
    reducers:{
        addBookmark(state,action){
            const repository = action.payload;

            const isAlreadyBookmarked = state.Bookmarks.some(
                (bookmark)=> bookmark.id === repository.id
            )
            if(!isAlreadyBookmarked){
            state.Bookmarks.push(repository)
                saveBookmarks(state.Bookmarks);
        
        }
        },
        removeBookmark(state,action){
            const repositoryId = action.payload;
            
             state.Bookmarks = state.Bookmarks.filter((bookmark)=>bookmark.id !== repositoryId)
            saveBookmarks(state.Bookmarks);
        }
    }
})

export const {addBookmark,removeBookmark} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;