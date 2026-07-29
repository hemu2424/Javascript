import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchRepository } from "../../features/repositories/repositoryThunks";



import RepositoryDetails from "../../components/repository/RepositoryDetails";
import { selectRepository, selectRepositoryError, selectRepositoryLoading } from "../../features/repositories/repositorySelector";

function RepositoryPage() {
  const { username, repoName } = useParams();

  const dispatch = useDispatch();

  const repository = useSelector(selectRepository);
  const loading = useSelector(selectRepositoryLoading);
  const error = useSelector(selectRepositoryError);

  useEffect(() => {
    dispatch(
      fetchRepository({
        owner: username,
        repo: repoName,
      })
    );
  }, [dispatch, username, repoName]);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return <RepositoryDetails repository={repository} />;
}

export default RepositoryPage;