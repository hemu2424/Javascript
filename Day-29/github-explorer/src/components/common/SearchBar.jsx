import { useState } from "react";
import {useDispatch} from "react-redux"
import { fetchUser } from "../../features/users/userThunks";
import { useNavigate } from "react-router-dom";

function SearchBar() {

  const navigate = useNavigate();
    const [userName,setUserName] = useState("");
    const dispatch = useDispatch(); 

    const handleSearch = ()=>{
        console.log(userName)
        if(!userName.trim()) return;
        navigate(`/users/${userName}`)
        dispatch(fetchUser(userName))

    }
  return (

    <>
    <input 
    type="text"
    value={userName}
    onChange={(e)=>setUserName(e.target.value)}
    placeholder="enter your search"
    />
    <button onClick={handleSearch}>Search</button>
    </>
  )
}

export default SearchBar;