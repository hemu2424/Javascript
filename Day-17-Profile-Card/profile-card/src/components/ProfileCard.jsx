import React from 'react'
import profiles from '../data/profiles'

const ProfileCard = () => {
  return (
    <div>
        {profiles.map((map)=>(

        
     <div className="card profile-card" key={map.id}>
  <img
    src={map.imageUrl}
    className="card-img-top profile-img"
    alt={map.name}
  />

  <div className="card-body text-center">
    <h4 className="card-title">{map.name}</h4>
    <h6 className="text-primary">{map.title}</h6>
    <p className="card-text text-muted">{map.bio}</p>

    <p className="location">
       {map.location}
    </p>

    <div className="stats">
      <div>
        <h5>{map.followers}</h5>
        <span>Followers</span>
      </div>

      <div>
        <h5>{map.following}</h5>
        <span>Following</span>
      </div>
    </div>

    <button className="btn btn-primary mt-3 w-100">
      Follow
    </button>
  </div>
</div>
)
        )}

    </div>
  )
}

export default ProfileCard
