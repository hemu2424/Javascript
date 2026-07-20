// Sample data — this is what "flows down" into ProfileCard as props.
// Later, you can .map() over this array to render a whole grid of cards.

const profiles = [
  {
    id: 1,
    name: "Aarav Shah",
    title: "Frontend Developer",
    bio: "I love building clean, fast interfaces with React.",
    imageUrl: "https://i.pravatar.cc/300?img=12",
    location: "Ahmedabad, India",
    followers: 128,
    following: 84,
  },
  {
    id: 2,
    name: "Priya Mehta",
    title: "UI/UX Designer",
    bio: "Design systems nerd. Coffee-powered.",
    imageUrl: "https://i.pravatar.cc/300?img=47",
    location: "Bengaluru, India",
    followers: 340,
    following: 112,
  },
  {
    id: 3,
    name: "Rohit Verma",
    title: "Backend Engineer",
    bio: "APIs, databases, and the occasional bug hunt.",
    imageUrl: "https://i.pravatar.cc/300?img=33",
    location: "Pune, India",
    followers: 76,
    following: 60,
  },
];

export default profiles;