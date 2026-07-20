
import profiles from './data/profiles'
import ProfileCard from './components/ProfileCard'

function App() {

  return (
    <>
    <h1>Profile Card</h1>

    <div className='card'>
    {profiles.map((person)=>(
      <ProfileCard  key={person.id}
            name={person.name}
            title={person.title}
            bio={person.bio}
            imageUrl={person.imageUrl}
            location={person.location}
            followers={person.followers}
            following={person.following} />
    ))}

    </div>
    </>
  )
}

export default App
