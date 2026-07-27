import { useSelector } from "react-redux";
import SearchBar from "../../components/common/SearchBar";
import { selectError, selectLoading, selectUser } from "../../features/users/userSelectors";

function HomePage() {
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <>
      <h1>GitHub Explorer</h1>

      <SearchBar />

     
    </>
  );
}

export default HomePage;