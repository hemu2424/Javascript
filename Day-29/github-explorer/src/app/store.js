import { configureStore } from "@reduxjs/toolkit"
import  userReducer from "../features/users/userSlice"
import repositoryReducer from "../features/repositories/repositorySlice"
import repositoryFilterReducer from "../features/repositories/repositoryFilterSlice"    
import bookMarkReducer from "../features/bookmarks/bookmarkSlice"
export const store = configureStore({
    reducer:{
    users:userReducer,
    repositories:repositoryReducer,
    repositoryFilter: repositoryFilterReducer,
    bookmark:bookMarkReducer,
    },
})