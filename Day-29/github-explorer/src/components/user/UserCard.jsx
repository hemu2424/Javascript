function UserCard({user}) {
  return (<>
  {user && (
        <div>
          <img src={user.avatar_url} alt={user.login} width={100} />
          <h2>{user.name}</h2>
          <p>@{user.login}</p>
          <p>{user.bio}</p>
        </div>
      )}
  </>)
}

export default UserCard;