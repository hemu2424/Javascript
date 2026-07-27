import { useParams } from "react-router-dom";
import { selectError, selectLoading, selectUser } from "../../features/users/userSelectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/users/userThunks";
import UserCard from "../../components/user/UserCard";

function UserPage() {
  const {userName} = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const loading =useSelector (selectLoading)
  const Error =useSelector (selectError)

  useEffect(() => {
    dispatch(fetchUser(userName));
  }, [dispatch, userName]);


  return (<> {loading && <p>Loading...</p>}

      {Error && <p>{Error}</p>}
      <UserCard user={user}/>

      </>)
}

export default UserPage;