import NewsCard from './NewsCard'

const NewsGrid = ({articles}) => {
  return (
  <div className="grid grid-cols-1 gap-6 transition-colors duration-300 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  
  {
    articles.map((article,index)=>{
       return (

          <NewsCard
    key={index}
    article={article}
  />
        )

    })
  }
  
  </div>


  )
}

export default NewsGrid
